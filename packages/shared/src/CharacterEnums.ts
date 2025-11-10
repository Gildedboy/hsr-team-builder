export const ELEMENTS = [
  'Physical',
  'Fire',
  'Ice',
  'Lightning',
  'Wind',
  'Quantum',
  'Imaginary',
] as const

export const PATHS = [
  'Destruction',
  'Hunt',
  'Erudition',
  'Harmony',
  'Nihility',
  'Preservation',
  'Abundance',
  'Remembrance',
] as const

export const RARITIES = [4, 5] as const

export const LIGHTCONE_RARITIES = [3, 4, 5] as const

export const LIGHTCONE_PATHS = [
  'Destruction',
  'Hunt',
  'Erudition',
  'Harmony',
  'Nihility',
  'Preservation',
  'Abundance',
  'Remembrance',
] as const

export type Element = (typeof ELEMENTS)[number]
export type Path = (typeof PATHS)[number]
export type Rarity = (typeof RARITIES)[number]
export type LightconeRarity = (typeof LIGHTCONE_RARITIES)[number]
export type LightconePath = (typeof LIGHTCONE_PATHS)[number]

export const MAIN_ARCHETYPES = [
  'DPS',
  'Support',
  'Sustain',
  'Break DPS',
  'Buffer',
  'Debuff',
  'Healer',
  'Shielder',
] as const

export const COMMON_LABELS = [
  'DPS',
  'Sub-DPS',
  'Support',
  'Sustain',
  'Buffer',
  'Debuff',
  'Healer',
  'Shielder',
  'Break DPS',
  'Follow-up Attack',
  'AoE',
  'Single Target',
  'Ultimate Based',
  'HP Scaling',
  'ATK Scaling',
  'Crit Support',
  'Energy Support',
  'F2P',
  'Generalist',
] as const

export type MainArchetype = (typeof MAIN_ARCHETYPES)[number]
export type CommonLabel = (typeof COMMON_LABELS)[number]
