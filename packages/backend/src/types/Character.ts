import type { Element, Path, Rarity } from './CharacterEnums'
import type { Lightcone } from './Lightcone'

// New flexible character system
export interface Character {
  id: string
  name: string
  element: Element
  path: Path
  rarity: Rarity
  roles: Role[] // Multiple roles: ['DPS', 'SUB_DPS']
  archetype: Archetype[] // How they play: ['Hypercarry'], ['Follow-up', 'Summon'], etc.
  labels: string[] // Descriptive tags

  // Flexible teammate recommendations
  teammateRecommendations?: TeammateSection[]

  // Flexible team compositions
  teamCompositions?: TeamComposition[]

  // Character lightcones
  lightcones?: Lightcone[]
}

export type Role = 'DPS' | 'SUB_DPS' | 'SUPPORT' | 'SUSTAIN' | 'AMPLIFIER'

export type Archetype =
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

// Flexible teammate section - you can name it whatever you want
export interface TeammateSection {
  name: string // Custom name: "Amplifiers", "Debuffers", "Sustain", etc.
  bis: string[] // Character IDs (required)
  generalist?: string[] // Character IDs (optional)
  f2p?: string[] // Character IDs (optional)
}

// Flexible team composition
export interface TeamComposition {
  name: string // Custom name: "Hypercarry Team", "FUA Team", etc.
  role: string // "Main DPS", "Sub-DPS", etc.
  bis: TeamVariant
  f2p?: TeamVariant
}

export interface TeamVariant {
  characters: string[] // 4 character IDs
  description?: string // Optional description
}

// Helper class for easy character creation
export class CharacterBuilder {
  private readonly character: Partial<Character> = {}

  constructor(id: string, name: string) {
    this.character.id = id
    this.character.name = name
  }

  element(element: Element) {
    this.character.element = element
    return this
  }

  path(path: Path) {
    this.character.path = path
    return this
  }

  rarity(rarity: Rarity) {
    this.character.rarity = rarity
    return this
  }

  roles(roles: Role[]) {
    this.character.roles = roles
    return this
  }

  archetype(...archetypes: Archetype[]) {
    this.character.archetype = archetypes
    return this
  }

  labels(labels: string[]) {
    this.character.labels = labels
    return this
  }

  // Add a custom teammate section
  addTeammateSection(name: string, bis: string[], generalist: string[] = [], f2p: string[] = []) {
    if (!this.character.teammateRecommendations) {
      this.character.teammateRecommendations = []
    }
    this.character.teammateRecommendations.push({ name, bis, generalist, f2p })
    return this
  }

  // Add a custom team composition
  addTeamComposition(
    name: string,
    role: string,
    bisTeam: string[],
    f2pTeam?: string[],
    bisDesc?: string,
    f2pDesc?: string,
  ) {
    if (!this.character.teamCompositions) {
      this.character.teamCompositions = []
    }
    const composition: TeamComposition = {
      name,
      role,
      bis: { characters: bisTeam, description: bisDesc },
    }
    if (f2pTeam) {
      composition.f2p = { characters: f2pTeam, description: f2pDesc }
    }
    this.character.teamCompositions.push(composition)
    return this
  }

  build(): Character {
    return this.character as Character
  }
}
