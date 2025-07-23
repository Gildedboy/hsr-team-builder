import { Injectable, Inject, Logger, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Character } from '../types/Character'
import { CharacterEntity } from '../entities/character.entity'

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

  async seedCharacters(): Promise<{ message: string; count: number }> {
    try {
      // Check if characters already exist
      const existingCount = await this.characterRepository.count()
      if (existingCount > 0) {
        this.logger.log(`Database already has ${existingCount} characters, skipping seed`)
        return { message: 'Database already seeded', count: existingCount }
      }

      // Complete character dataset converted from main branch data
      const seedData = [
        // DPS Characters
        {
          id: 'seele',
          name: 'Seele',
          element: 'Quantum',
          path: 'Hunt',
          rarity: 5,
          roles: ['DPS'],
          archetype: ['Hypercarry'],
          labels: ['Single Target', 'Extra Turn', 'Enhanced State', 'SP Unfriendly'],
          teammateRecommendations: [
            {
              name: 'Amplifiers',
              bis: ['sparkle', 'silver-wolf'],
              generalist: ['sunday', 'robin', 'cipher'],
              f2p: ['remembrance-trailblazer', 'bronya', 'tingyun', 'hanya', 'pela']
            },
            {
              name: 'Sustain',
              bis: ['fu-xuan'],
              generalist: ['huohuo'],
              f2p: ['gallagher']
            }
          ],
          teamCompositions: [
            {
              name: 'Main DPS Team',
              role: 'Main DPS',
              bis: { characters: ['seele', 'sparkle', 'silver-wolf', 'fu-xuan'] },
              f2p: { characters: ['seele', 'tingyun', 'hanya', 'gallagher'] }
            }
          ]
        },
        {
          id: 'jing-yuan',
          name: 'Jing Yuan',
          element: 'Lightning',
          path: 'Erudition',
          rarity: 5,
          roles: ['DPS'],
          archetype: ['Follow-up', 'Summon', 'Hypercarry'],
          labels: ['AoE', 'Summon', 'Follow-up Attack'],
          teammateRecommendations: [
            {
              name: 'Amplifiers',
              bis: ['robin', 'sunday'],
              generalist: ['tribbie', 'cipher', 'sparkle', 'ruan-mei'],
              f2p: ['bronya', 'tingyun', 'pela']
            },
            {
              name: 'Sustain',
              bis: ['aventurine', 'huohuo'],
              generalist: ['hyacine'],
              f2p: ['gallagher']
            }
          ],
          teamCompositions: [
            {
              name: 'Main DPS Team',
              role: 'Main DPS',
              bis: { characters: ['jing-yuan', 'robin', 'sunday', 'aventurine'] },
              f2p: { characters: ['jing-yuan', 'tingyun', 'pela', 'gallagher'] }
            }
          ]
        },
        {
          id: 'clara',
          name: 'Clara',
          element: 'Physical',
          path: 'Destruction',
          rarity: 5,
          roles: ['DPS'],
          archetype: ['Counter'],
          labels: ['Counter Attack', 'Blast', 'AoE', 'F2P'],
          teammateRecommendations: [
            {
              name: 'Dual DPS',
              bis: ['yunli'],
              generalist: ['topaz'],
              f2p: []
            },
            {
              name: 'Amplifiers',
              bis: ['robin'],
              generalist: ['cipher', 'tribbie', 'silver-wolf', 'sunday', 'sparkle'],
              f2p: ['remembrance-trailblazer', 'pela']
            },
            {
              name: 'Sustain',
              bis: ['huohuo'],
              generalist: ['aventurine', 'luocha', 'fu-xuan'],
              f2p: ['gallagher', 'lynx']
            }
          ],
          teamCompositions: [
            {
              name: 'Main DPS Team',
              role: 'Main DPS',
              bis: { characters: ['clara', 'robin', 'sunday', 'huohuo'] },
              f2p: { characters: ['clara', 'tingyun', 'remembrance-trailblazer', 'gallagher'] }
            },
            {
              name: 'Counter Duo',
              role: 'Sub DPS',
              bis: { characters: ['yunli', 'clara', 'robin', 'aventurine'] },
              f2p: { characters: ['yunli', 'clara', 'pela', 'gallagher'] }
            }
          ]
        },
        {
          id: 'acheron',
          name: 'Acheron',
          element: 'Lightning',
          path: 'Nihility',
          rarity: 5,
          roles: ['DPS'],
          archetype: ['Ultimate-Based', 'Debuff DPS'],
          labels: ['Ultimate DMG', 'AoE', 'Debuff Stacking', 'Premium'],
          teammateRecommendations: [
            {
              name: 'Debuffers',
              bis: ['jiaoqiu', 'cipher'],
              generalist: ['pela', 'silver-wolf'],
              f2p: ['pela', 'welt']
            },
            {
              name: 'Sustain',
              bis: ['aventurine', 'fu-xuan'],
              generalist: ['gepard'],
              f2p: ['gallagher']
            }
          ],
          teamCompositions: [
            {
              name: 'Main DPS Team',
              role: 'Main DPS',
              bis: { characters: ['acheron', 'jiaoqiu', 'cipher', 'aventurine'] },
              f2p: { characters: ['acheron', 'pela', 'welt', 'gallagher'] }
            }
          ]
        },
        {
          id: 'feixiao',
          name: 'Feixiao',
          element: 'Wind',
          path: 'Hunt',
          rarity: 5,
          roles: ['DPS'],
          archetype: ['Follow-up', 'Ultimate-Based'],
          labels: ['Follow-up Attack', 'Ultimate DMG', 'AoE', 'Premium'],
          teammateRecommendations: [
            {
              name: 'Follow-up Partners',
              bis: ['robin', 'topaz'],
              generalist: ['moze', 'cipher'],
              f2p: ['harmony-trailblazer']
            },
            {
              name: 'Sustain',
              bis: ['aventurine'],
              generalist: ['huohuo'],
              f2p: ['gallagher']
            }
          ],
          teamCompositions: [
            {
              name: 'Follow-up Team',
              role: 'Main DPS',
              bis: { characters: ['feixiao', 'robin', 'topaz', 'aventurine'] },
              f2p: { characters: ['feixiao', 'harmony-trailblazer', 'moze', 'gallagher'] }
            }
          ]
        },
        // Support Characters
        {
          id: 'sparkle',
          name: 'Sparkle',
          element: 'Quantum',
          path: 'Harmony',
          rarity: 5,
          roles: ['SUPPORT'],
          archetype: ['Buffer'],
          labels: ['SP Positive', 'CRIT DMG', 'Action Advance', 'Premium'],
          teammateRecommendations: [
            {
              name: 'DPS Partners',
              bis: ['seele', 'imbibitor-lunae', 'blade'],
              generalist: ['Any single-target DPS'],
              f2p: ['dan-heng']
            }
          ],
          teamCompositions: []
        },
        {
          id: 'robin',
          name: 'Robin',
          element: 'Physical',
          path: 'Harmony',
          rarity: 5,
          roles: ['SUPPORT'],
          archetype: ['Buffer'],
          labels: ['FUA', 'ATK Buff', 'Energy Support', 'Premium'],
          teammateRecommendations: [
            {
              name: 'Follow-up DPS',
              bis: ['feixiao', 'topaz', 'jing-yuan'],
              generalist: ['clara', 'yunli'],
              f2p: ['himeko']
            }
          ],
          teamCompositions: []
        },
        {
          id: 'sunday',
          name: 'Sunday',
          element: 'Imaginary',
          path: 'Harmony',
          rarity: 5,
          roles: ['SUPPORT'],
          archetype: ['Buffer'],
          labels: ['Summon Support', 'Action Advance', 'Energy Regen', 'Premium'],
          teammateRecommendations: [
            {
              name: 'Summon DPS',
              bis: ['jing-yuan', 'lingsha'],
              generalist: ['Any summon character'],
              f2p: []
            }
          ],
          teamCompositions: []
        },
        {
          id: 'ruan-mei',
          name: 'Ruan Mei',
          element: 'Ice',
          path: 'Harmony',
          rarity: 5,
          roles: ['SUPPORT'],
          archetype: ['Buffer'],
          labels: ['Break Support', 'SPD Buff', 'Weakness Break Efficiency', 'Premium'],
          teammateRecommendations: [
            {
              name: 'Break DPS',
              bis: ['boothill', 'firefly'],
              generalist: ['Any DPS'],
              f2p: ['sushang']
            }
          ],
          teamCompositions: []
        },
        {
          id: 'pela',
          name: 'Pela',
          element: 'Ice',
          path: 'Nihility',
          rarity: 4,
          roles: ['SUPPORT'],
          archetype: ['Debuffer'],
          labels: ['Exposed', 'Defense Reduction', 'F2P', 'Remove Enemy Buffs on Skill'],
          teammateRecommendations: [
            {
              name: 'DPS',
              bis: ['acheron'],
              generalist: ['Any DPS as long as they can benefit from Enemy Reduced DEF and constant Debuffs Applications'],
              f2p: []
            }
          ],
          teamCompositions: [
            {
              name: 'Acheron Team',
              role: 'Debuffer',
              bis: { characters: ['acheron', 'pela', 'cipher', 'aventurine'] }
            }
          ]
        },
        // Sustain Characters
        {
          id: 'fu-xuan',
          name: 'Fu Xuan',
          element: 'Quantum',
          path: 'Preservation',
          rarity: 5,
          roles: ['SUSTAIN'],
          archetype: ['HP-Scaling'],
          labels: ['Heal Allies on Ultimate', 'Damage Distribution', 'HP Scaling', 'Crit Rate Amplifier', 'Self Heal', 'Crowd Control Immunity on Skill', 'Allies DMG Reduction'],
          teammateRecommendations: [
            {
              name: 'DPS',
              bis: ['acheron', 'archer', 'yunli'],
              generalist: ['Any DPS as long as they can benefit from Crit Rate Buffs,DMG Reduction and constant Debuffs Application'],
              f2p: []
            }
          ],
          teamCompositions: [
            {
              name: 'Acheron Team',
              role: 'Sustain',
              bis: { characters: ['acheron', 'jiaoqiu', 'cipher', 'fu-xuan'] }
            }
          ]
        },
        {
          id: 'aventurine',
          name: 'Aventurine',
          element: 'Imaginary',
          path: 'Preservation',
          rarity: 5,
          roles: ['SUSTAIN'],
          archetype: ['Follow-up', 'Shielder'],
          labels: ['Shield', 'Follow-up Attack', 'Debuff RES', 'Premium'],
          teammateRecommendations: [
            {
              name: 'DPS',
              bis: ['feixiao', 'topaz'],
              generalist: ['Any DPS that benefits from shields'],
              f2p: []
            }
          ],
          teamCompositions: []
        },
        {
          id: 'huohuo',
          name: 'Huohuo',
          element: 'Wind',
          path: 'Abundance',
          rarity: 5,
          roles: ['SUSTAIN'],
          archetype: ['Healer'],
          labels: ['Heal', 'Energy Regen', 'Cleanse', 'ATK Buff'],
          teammateRecommendations: [
            {
              name: 'Energy Hungry DPS',
              bis: ['blade', 'jingliu'],
              generalist: ['Any DPS needing energy'],
              f2p: []
            }
          ],
          teamCompositions: []
        },
        {
          id: 'gallagher',
          name: 'Gallagher',
          element: 'Fire',
          path: 'Abundance',
          rarity: 4,
          roles: ['SUSTAIN'],
          archetype: ['Healer'],
          labels: ['Heal', 'Break Support', 'F2P'],
          teammateRecommendations: [
            {
              name: 'Break DPS',
              bis: ['boothill', 'firefly'],
              generalist: ['Any DPS'],
              f2p: []
            }
          ],
          teamCompositions: []
        },
        {
          id: 'march-7th',
          name: 'March 7th',
          element: 'Ice',
          path: 'Preservation',
          rarity: 4,
          roles: ['SUSTAIN'],
          archetype: ['Shielder'],
          labels: ['Shield', 'Freeze', 'Counter', 'F2P'],
          teammateRecommendations: [
            {
              name: 'DPS',
              bis: [],
              generalist: ['Any DPS needing protection'],
              f2p: ['Any F2P DPS']
            }
          ],
          teamCompositions: []
        }
      ]

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
