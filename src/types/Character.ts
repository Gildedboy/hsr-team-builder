export interface Character {
  id: string
  name: string
  element: 'Physical' | 'Fire' | 'Ice' | 'Lightning' | 'Wind' | 'Quantum' | 'Imaginary'
  path:
    | 'Destruction'
    | 'Hunt'
    | 'Erudition'
    | 'Harmony'
    | 'Nihility'
    | 'Preservation'
    | 'Abundance'
    | 'Remembrance'
  rarity: 4 | 5
  labels: CharacterLabel[]
  mainArchetype: MainArchetype
  teamRecommendations?: TeamRecommendations
  synergies?: string[]
}

export type CharacterLabel =
  | 'Hypercarry'
  | 'Sub-DPS'
  | 'Support'
  | 'Sustain'
  | 'HP Scaling'
  | 'ATK Scaling'
  | 'DEF Scaling'
  | 'Break DPS'
  | 'Physical'
  | 'Single Target'
  | 'Super Break'
  | 'AoE'
  | 'Buffer'
  | 'Crit Support'
  | 'Generalist'
  | 'Break Support'
  | 'Summon Support'
  | 'Energy Support'
  | 'DPS'
  | 'Debuff'
  | 'Ultimate Based'
  | 'DoT'
  | 'Slow'
  | 'Follow-up Attack'
  | 'Pet'
  | 'Healer'
  | 'Cleanse'
  | 'Field Support'
  | 'Aggro Support'
  | 'Basic'
  | 'Burn'
  | 'Follow-up Support'
  | 'Shifu'
  | 'Applies Freeze'
  | 'Applies Slow'
  | 'Applies Burn'
  | 'Applies Imprision'
  | 'Ultimate'
  | 'Speed'
  | 'Burden'
  | 'Counter'
  | 'Shielder'
  | 'F2P'
  | 'Amplifier'
  | 'Summon'
  | 'Implant Weakness'
  | 'Action Advance'
  | 'Blast'
  | 'Fire'
  | 'Wind'
  | 'Lightning'
  | 'Imaginary'
  | 'Destruction'
  | 'Debuff Synergy'
  | 'Follow Up Attack'
  | 'Taunt'
  | 'HP Share'
  | 'Freeze'
  | 'Ice'
  | 'Quantum'
  | 'Basic Attack'
  | 'Break'

export type MainArchetype =
  | 'DPS'
  | 'Support'
  | 'Sustain'
  | 'Hypercarry Support'
  | 'Follow Up DPS'
  | 'Break DPS'
  | 'HP Scaling DPS'
  | 'Debuff'
  | 'Buffer'
  | 'Healer'
  | 'Shielder'
  | 'Works with Everyone'
  | 'Crit Support'
  | 'Energy Support'
  | 'DoT'
  | 'Follow-up Attack'
  | 'Break Effect'

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
