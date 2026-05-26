export type CharacterRole = 'DPS' | 'SUB_DPS' | 'SUPPORT' | 'SUSTAIN' | 'AMPLIFIER'

export type CharacterSummary = {
  id: string
  name: string
  element: string
  path: string
  rarity: number
  roles: CharacterRole[]
  labels: string[]
  archetype?: string[]
}

export type TeamRecommendation = {
  name?: string
  description?: string
  characters?: unknown[]
  [key: string]: unknown
}

export type VersionInfo = {
  version: string
  description?: string
  features?: string[]
  bugFixes?: string[]
  releaseDate?: string
  [key: string]: unknown
}

export type Lightcone = {
  id: string
  name: string
  path: string
  rarity: number
  [key: string]: unknown
}
