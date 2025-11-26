import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Character } from '../types/Character'
import { CharacterEntity } from '../entities/character.entity'
import { LightconeEntity } from '../entities/lightcone.entity'
import { CharacterLightconeEntity } from '../entities/character-lightcone.entity'
import { allCharactersSeedData } from '../data/allCharactersData'

@Injectable()
export class CharactersService {
  private readonly logger = new Logger(CharactersService.name)

  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
    @InjectRepository(LightconeEntity)
    private readonly lightconeRepository: Repository<LightconeEntity>,
    @InjectRepository(CharacterLightconeEntity)
    private readonly characterLightconeRepository: Repository<CharacterLightconeEntity>,
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
    const entities = await this.characterRepository.find({
      relations: ['lightconeRelations', 'lightconeRelations.lightcone'],
    })
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
    const entity = await this.characterRepository.findOne({
      where: { id },
      relations: ['lightconeRelations', 'lightconeRelations.lightcone'],
    })
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
      .leftJoinAndSelect('character.lightconeRelations', 'relation')
      .leftJoinAndSelect('relation.lightcone', 'lightcone')
      .where(':role = ANY(character.roles)', { role })
      .getMany()

    const characters = entities.map(this.entityToCharacter)

    await this.cacheManager.set(cacheKey, characters, 300) // Cache for 5 minutes
    console.log(`💾 Characters with role ${role} cached`)
    return characters
  }

  async findByElement(element: string): Promise<Character[]> {
    const entities = await this.characterRepository.find({
      where: { element },
      relations: ['lightconeRelations', 'lightconeRelations.lightcone'],
    })
    return entities.map(this.entityToCharacter)
  }

  async findByPath(path: string): Promise<Character[]> {
    const entities = await this.characterRepository.find({
      where: { path },
      relations: ['lightconeRelations', 'lightconeRelations.lightcone'],
    })
    return entities.map(this.entityToCharacter)
  }

  async search(query: string): Promise<Character[]> {
    const lowercaseQuery = query.toLowerCase()

    const entities = await this.characterRepository
      .createQueryBuilder('character')
      .leftJoinAndSelect('character.lightconeRelations', 'relation')
      .leftJoinAndSelect('relation.lightcone', 'lightcone')
      .where('LOWER(character.name) LIKE :query', { query: `%${lowercaseQuery}%` })
      .orWhere(
        'EXISTS (SELECT 1 FROM unnest(character.labels) AS label WHERE LOWER(label) LIKE :query)',
        { query: `%${lowercaseQuery}%` },
      )
      .getMany()

    return entities.map(this.entityToCharacter)
  }

  async updateCharacter(
    id: string,
    updateData: Partial<Character> & { lightcones?: { id: string; note?: string }[] },
  ): Promise<Character | null> {
    const entity = await this.characterRepository.findOne({ 
      where: { id },
      relations: ['lightconeRelations', 'lightconeRelations.lightcone']
    })
    if (!entity) {
      return null
    }

    // Handle lightcone relationships if provided
    if (updateData.lightcones) {
      const requestedLightconeIds = updateData.lightcones.map((lc) => lc.id)
      const lightcones = await this.lightconeRepository.findByIds(requestedLightconeIds)
      const idToLightcone = new Map(lightcones.map((lc) => [lc.id, lc]))

      // Reset existing relations so updates replace notes/assignments cleanly
      await this.characterLightconeRepository.delete({ characterId: entity.id })

      // Replace existing relations with new set
      const relations: CharacterLightconeEntity[] = []
      for (const item of updateData.lightcones) {
        const lc = idToLightcone.get(item.id)
        if (!lc) continue
        const relation = new CharacterLightconeEntity()
        relation.character = entity
        relation.characterId = entity.id
        relation.lightcone = lc
        relation.lightconeId = lc.id
        relation.note = item.note ?? null
        relations.push(relation)
      }
      entity.lightconeRelations = relations
      const { lightcones: _lightcones, ...restUpdateData } = updateData
      Object.assign(entity, restUpdateData)
    } else {
      // Update the entity with new data (excluding lightconeIds)
      const { lightcones, ...restUpdateData } = updateData
      Object.assign(entity, restUpdateData)
    }

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
    // Check if character already exists
    const existingCharacter = await this.characterRepository.findOne({
      where: { id: characterData.id },
    })

    if (existingCharacter) {
      throw new Error(`Character with ID ${characterData.id} already exists`)
    }

    const entity = new CharacterEntity()
    const { lightcones, ...rest } = characterData
    Object.assign(entity, rest)

    if (lightcones?.length) {
      const lightconeIds = lightcones.map((lc) => lc.id)
      const foundLightcones = await this.lightconeRepository.findByIds(lightconeIds)
      const idToLightcone = new Map(foundLightcones.map((lc) => [lc.id, lc]))
      entity.lightconeRelations = lightcones
        .map((item) => {
          const lc = idToLightcone.get(item.id)
          if (!lc) return null
          const relation = new CharacterLightconeEntity()
          relation.character = entity
          relation.characterId = entity.id
          relation.lightcone = lc
          relation.lightconeId = lc.id
          relation.note = item.note ?? null
          return relation
        })
        .filter((relation): relation is CharacterLightconeEntity => Boolean(relation))
    }

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
      element: entity.element as
        | 'Physical'
        | 'Fire'
        | 'Ice'
        | 'Lightning'
        | 'Wind'
        | 'Quantum'
        | 'Imaginary',
      path: entity.path as
        | 'Destruction'
        | 'Hunt'
        | 'Erudition'
        | 'Harmony'
        | 'Nihility'
        | 'Preservation'
        | 'Abundance'
        | 'Remembrance',
      rarity: entity.rarity as 4 | 5,
      roles: entity.roles as ('DPS' | 'SUB_DPS' | 'SUPPORT' | 'SUSTAIN' | 'AMPLIFIER')[],
      archetype: entity.archetype as (
        | 'Hypercarry'
        | 'HP-Scaling'
        | 'Follow-up'
        | 'Break-DPS'
        | 'Debuffer'
        | 'Buffer'
        | 'Healer'
        | 'Shielder'
        | 'Counter'
        | 'Ultimate-Based'
        | 'Energy-Hungry'
        | 'Summon'
        | 'Debuff DPS'
        | 'DoT'
      )[],
      labels: entity.labels,
      prydwenLink: entity.prydwenLink || undefined,
      guobaLink: entity.guobaLink || undefined,
      teammateRecommendations: entity.teammateRecommendations || [],
      teamCompositions: entity.teamCompositions || [],
      lightcones:
        (entity.lightconeRelations
          ? [...entity.lightconeRelations].sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
          : []
        ).map((relation) => ({
          id: relation.lightcone.id,
          name: relation.lightcone.name,
          rarity: relation.lightcone.rarity as 3 | 4 | 5,
          path: relation.lightcone.path as
            | 'Destruction'
            | 'Hunt'
            | 'Erudition'
            | 'Harmony'
            | 'Nihility'
            | 'Preservation'
            | 'Abundance'
            | 'Remembrance',
          note: relation.note || undefined,
        })),
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
