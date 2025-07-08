import type { Element, Path, Rarity, MainArchetype } from './CharacterEnums'

export interface Character {
  id: string
  name: string
  element: Element
  path: Path
  rarity: Rarity
  labels: string[]
  mainArchetype: MainArchetype
  teamRecommendations?: TeamRecommendations
  synergies?: string[]
}

// Simplified - labels are now just strings for flexibility

export interface TeamSuggestion {
  characters: Character[]
  synergy: string
  reasoning: string
}

export interface CoreTeamSuggestion {
  premium: TeamVariant
  f2p: TeamVariant
}

export interface TeamVariant {
  characters: string[] // Character IDs
  reasoning: string
  coreRole: string // e.g., "Main DPS", "Sub-DPS", "Support", "Sustain"
}

export interface TeamRecommendations {
  mainDPS?: TeamRole
  subDPS?: TeamRole
  bufferDebuffer: TeamRole
  sustain: TeamRole
  requiresSubDPS: boolean // false for characters like Phainon, break DPS
  anySustainAvailable?: boolean // false when no F2P sustain options exist
}

export interface TeamRole {
  bis: string[] // Character IDs
  generalist: string[] // Character IDs
  f2p: string[] // Character IDs
}

export interface EnhancedCharacter extends Character {
  teamSuggestions?: CoreTeamSuggestion
  teamRecommendations?: TeamRecommendations
}
