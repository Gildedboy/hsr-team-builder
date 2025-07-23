import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Character } from '../types/Character'
import { CharacterEntity } from '../entities/character.entity'
import { characterSeedData } from '../data/characterSeedData'

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async findAll(): Promise<Character[]> {
    const cacheKey = 'all-characters'

    // Try to get from cache first
    const cachedCharacters = await this.cacheManager.get<Character[]>(cacheKey)
    if (cachedCharacters) {
      console.log('🚀 Characters served from cache')
      return cachedCharacters
    }

    // If not in cache, get from database and cache it
    const entities = await this.characterRepository.find()
    const characters = entities.map(this.entityToCharacter)

    console.log('💾 Characters loaded from database and cached')
    await this.cacheManager.set(cacheKey, characters, 600) // Cache for 10 minutes
    return characters
  }

  async findById(id: string): Promise<Character | undefined> {
    const cacheKey = `character-${id}`

    // Try cache first
    const cachedCharacter = await this.cacheManager.get<Character>(cacheKey)
    if (cachedCharacter) {
      console.log(`🚀 Character ${id} served from cache`)
      return cachedCharacter
    }

    // Get from database
    const entity = await this.characterRepository.findOne({ where: { id } })
    if (entity) {
      const character = this.entityToCharacter(entity)
      await this.cacheManager.set(cacheKey, character, 600)
      console.log(`💾 Character ${id} cached`)
      return character
    }

    return undefined
  }

  async findByRole(role: string): Promise<Character[]> {
    const cacheKey = `characters-role-${role}`

    const cached = await this.cacheManager.get<Character[]>(cacheKey)
    if (cached) {
      console.log(`🚀 Characters with role ${role} served from cache`)
      return cached
    }

    // Query database for characters with specific role
    const entities = await this.characterRepository
      .createQueryBuilder('character')
      .where(':role = ANY(character.roles)', { role })
      .getMany()

    const characters = entities.map(this.entityToCharacter)

    await this.cacheManager.set(cacheKey, characters, 300) // Cache for 5 minutes
    console.log(`💾 Characters with role ${role} cached`)
    return characters
  }

  async findByElement(element: string): Promise<Character[]> {
    const entities = await this.characterRepository.find({ where: { element } })
    return entities.map(this.entityToCharacter)
  }

  async findByPath(path: string): Promise<Character[]> {
    const entities = await this.characterRepository.find({ where: { path } })
    return entities.map(this.entityToCharacter)
  }

  async search(query: string): Promise<Character[]> {
    const lowercaseQuery = query.toLowerCase()

    const entities = await this.characterRepository
      .createQueryBuilder('character')
      .where('LOWER(character.name) LIKE :query', { query: `%${lowercaseQuery}%` })
      .orWhere(
        'EXISTS (SELECT 1 FROM unnest(character.labels) AS label WHERE LOWER(label) LIKE :query)',
        { query: `%${lowercaseQuery}%` },
      )
      .getMany()

    return entities.map(this.entityToCharacter)
  }

  async updateCharacter(id: string, updateData: Partial<Character>): Promise<Character | null> {
    const entity = await this.characterRepository.findOne({ where: { id } })
    if (!entity) {
      return null
    }

    // Update the entity with new data
    Object.assign(entity, updateData)
    await this.characterRepository.save(entity)

    // Clear cache for this character and all characters
    await this.cacheManager.del(`character-${id}`)
    await this.cacheManager.del('all-characters')

    console.log(`✅ Updated character ${id} and cleared cache`)
    return this.entityToCharacter(entity)
  }

  async deleteCharacter(id: string): Promise<boolean> {
    const result = await this.characterRepository.delete(id)
    if (result.affected && result.affected > 0) {
      // Clear cache
      await this.cacheManager.del(`character-${id}`)
      await this.cacheManager.del('all-characters')

      console.log(`✅ Deleted character ${id} and cleared cache`)
      return true
    }
    return false
  }

  async createCharacter(characterData: Character): Promise<Character> {
    const entity = new CharacterEntity()
    Object.assign(entity, characterData)

    const savedEntity = await this.characterRepository.save(entity)

    // Clear cache to include new character
    await this.cacheManager.del('all-characters')

    console.log(`✅ Created character ${characterData.id} and cleared cache`)
    return this.entityToCharacter(savedEntity)
  }

  private entityToCharacter(entity: CharacterEntity): Character {
    return {
      id: entity.id,
      name: entity.name,
      element: entity.element as any,
      path: entity.path as any,
      rarity: entity.rarity as any,
      roles: entity.roles as any,
      archetype: entity.archetype as any,
      labels: entity.labels,
      teammateRecommendations: entity.teammateRecommendations || [],
      teamCompositions: entity.teamCompositions || [],
    }
  }

  async seedCharacters(): Promise<Character[]> {
    // Check if characters already exist
    const existingCount = await this.characterRepository.count()
    if (existingCount > 0) {
      console.log('Database already seeded, skipping...')
      return this.findAll()
    }

    console.log('🌱 Seeding database with character data...')
    
    // Use the comprehensive character seed data
    const entities = characterSeedData.map(char => this.characterRepository.create(char))
    const savedEntities = await this.characterRepository.save(entities)
    
    console.log(`🌱 Seeded ${savedEntities.length} characters`)
    
    // Clear cache and return seeded characters
    await this.cacheManager.del('all-characters')
    return savedEntities.map(this.entityToCharacter)
  }
}
