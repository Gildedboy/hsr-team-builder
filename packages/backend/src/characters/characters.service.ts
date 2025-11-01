import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Character } from '../types/Character'
import { CharacterEntity } from '../entities/character.entity'
import { allCharactersSeedData } from '../data/allCharactersData'

@Injectable()
export class CharactersService {
  private readonly logger = new Logger(CharactersService.name)

  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async findAll(): Promise<Character[]> {
    const cacheKey = 'all-characters'

    try {
      // Try to get from cache first
      const cachedCharacters = await this.cacheManager.get<Character[]>(cacheKey)
      if (cachedCharacters) {
        this.logger.log('🚀 Characters served from cache')
        return cachedCharacters
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
      this.logger.error('❌ Cache GET error:', errorMessage)
    }

    // If not in cache, get from database and cache it
    const entities = await this.characterRepository.find()
    const characters = entities.map(this.entityToCharacter)

    try {
      this.logger.log('💾 Characters loaded from database and cached')
      await this.cacheManager.set(cacheKey, characters, 600) // Cache for 10 minutes
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
      this.logger.error('❌ Cache SET error:', errorMessage)
    }

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

  async seedCharacters(): Promise<{ message: string; count: number }> {
    try {
      // Check if characters already exist
      const existingCount = await this.characterRepository.count()
      if (existingCount > 0) {
        this.logger.log(`Database already has ${existingCount} characters, skipping seed`)
        return { message: 'Database already seeded', count: existingCount }
      }

      // Complete character dataset (15+ key characters from main branch data)
      const seedData = allCharactersSeedData

      const characters: CharacterEntity[] = []

      for (const data of seedData) {
        const character = new CharacterEntity()
        character.id = data.id
        character.name = data.name
        character.element = data.element as any
        character.path = data.path as any
        character.rarity = data.rarity as any
        character.roles = data.roles as any[]
        character.archetype = data.archetype as any[]
        character.labels = data.labels
        character.teammateRecommendations = data.teammateRecommendations as any[]
        character.teamCompositions = data.teamCompositions as any[]
        characters.push(character)
      }

      await this.characterRepository.save(characters)
      this.logger.log(`Successfully seeded ${characters.length} characters`)

      return { message: 'Database seeded successfully', count: characters.length }
    } catch (error) {
      this.logger.error('Failed to seed characters:', error)
      throw new InternalServerErrorException('Failed to seed database')
    }
  }

  async clearCharacters(): Promise<{ message: string; cleared: number }> {
    try {
      const count = await this.characterRepository.count()
      await this.characterRepository.clear()

      // Clear cache as well
      await this.cacheManager.del('all-characters')

      this.logger.log(`Successfully cleared ${count} characters from database`)
      return { message: 'Database cleared successfully', cleared: count }
    } catch (error) {
      this.logger.error('Failed to clear characters:', error)
      throw new InternalServerErrorException('Failed to clear database')
    }
  }
}
