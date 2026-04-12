export const ROSTER_STORAGE_KEY = 'hsr-team-builder:roster:v1'

export const FREE_CHARACTER_IDS = [
  'destruction-trailblazer',
  'fire-trailblazer',
  'harmony-trailblazer',
  'remembrance-trailblazer',
  'elation-trailblazer',
  'march-7th',
  'dan-heng',
  'asta',
  'herta',
  'natasha',
  'serval',
  'qingque',
  'yukong',
  'lynx',
  'xueyi',
  'hunt-march-7th',
  'march-7th-the-hunt',
] as const

export type ReplacementMap = Partial<Record<string, readonly string[]>>

export const CHARACTER_REPLACEMENT_MAP: ReplacementMap = {
  aventurine: ['gallagher', 'lynx', 'natasha', 'march-7th', 'fire-trailblazer'],
  bailu: ['lynx', 'natasha', 'gallagher', 'march-7th', 'fire-trailblazer'],
  'fu-xuan': ['lynx', 'natasha', 'gallagher', 'march-7th', 'fire-trailblazer'],
  gallagher: ['lynx', 'natasha', 'march-7th', 'fire-trailblazer'],
  gepard: ['march-7th', 'fire-trailblazer', 'gallagher', 'lynx', 'natasha'],
  guinaifen: ['remembrance-trailblazer', 'asta'],
  huohuo: ['lynx', 'natasha', 'gallagher', 'march-7th', 'fire-trailblazer'],
  lingsha: ['gallagher', 'lynx', 'natasha', 'march-7th', 'fire-trailblazer'],
  luocha: ['lynx', 'natasha', 'gallagher', 'march-7th', 'fire-trailblazer'],
  pela: ['remembrance-trailblazer', 'asta'],
  robin: ['remembrance-trailblazer','harmony-trailblazer', 'asta', 'yukong', ],
  'ruan-mei': ['harmony-trailblazer', 'remembrance-trailblazer', 'asta', 'yukong'],
  sparkle: ['remembrance-trailblazer', 'asta', 'yukong', ],
  sunday: ['remembrance-trailblazer','asta', 'yukong'],
  tingyun: ['remembrance-trailblazer', 'asta','yukong'],
  tribbie: ['remembrance-trailblazer', 'asta', 'yukong'],
}

const CHARACTER_IDENTITY_MAP: Record<string, string> = {
  'destruction-trailblazer': 'trailblazer',
  'fire-trailblazer': 'trailblazer',
  'preservation-trailblazer': 'trailblazer',
  'harmony-trailblazer': 'trailblazer',
  'remembrance-trailblazer': 'trailblazer',
  'elation-trailblazer': 'trailblazer',
  'march-7th': 'march-7th-core',
  'hunt-march-7th': 'march-7th-core',
  'march-7th-the-hunt': 'march-7th-core',
}

const freeCharacterIdSet = new Set<string>(FREE_CHARACTER_IDS)

export const isFreeCharacterId = (characterId: string) => freeCharacterIdSet.has(characterId)

export const getCharacterIdentityKey = (characterId: string) =>
  CHARACTER_IDENTITY_MAP[characterId] || characterId
