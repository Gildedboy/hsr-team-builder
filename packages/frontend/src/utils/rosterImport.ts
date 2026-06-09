import type { Character } from '@hsr-team-builder/shared'
import { characterAvatarMap, getCharacterAvatarAssetIds, trailblazerAssetPairs } from '@/data/avatars'

export interface ImportedRosterCharacter {
  archiveId: string
  archiveName: string
  characterId: string
  characterName: string
}

export interface UnmatchedRosterCharacter {
  archiveId: string
  archiveName: string
}

export interface RosterImportPreview {
  source: 'reliquary-archiver'
  matchedCharacters: ImportedRosterCharacter[]
  unmatchedCharacters: UnmatchedRosterCharacter[]
  ownedCharacterIds: string[]
}

export const MAX_ROSTER_IMPORT_BYTES = 5 * 1024 * 1024
const MAX_ARCHIVE_CHARACTERS = 300

interface ReliquaryArchiveCharacter {
  id?: unknown
  name?: unknown
}

interface ReliquaryArchive {
  characters?: unknown
}

const normalizeArchiveId = (value: unknown) =>
  typeof value === 'number' || typeof value === 'string' ? String(value).trim() : ''

const getBaseAvatarId = (avatarId: string) => avatarId.replace(/[^\d].*$/, '')

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isSafeArchiveId = (value: string) => /^\d{4}$/.test(value)

const buildCharacterIdByArchiveId = (characters: Character[]) => {
  const characterIdByArchiveId = new Map<string, string>()

  for (const [characterId, avatarId] of Object.entries(characterAvatarMap)) {
    characterIdByArchiveId.set(avatarId, characterId)

    const baseAvatarId = getBaseAvatarId(avatarId)
    if (baseAvatarId) {
      characterIdByArchiveId.set(baseAvatarId, characterId)
    }
  }

  for (const [characterId, assetPair] of Object.entries(trailblazerAssetPairs)) {
    characterIdByArchiveId.set(assetPair.caelus, characterId)
    characterIdByArchiveId.set(assetPair.stelle, characterId)
  }

  for (const character of characters) {
    for (const avatarId of getCharacterAvatarAssetIds(character.id)) {
      characterIdByArchiveId.set(avatarId, character.id)

      const baseAvatarId = getBaseAvatarId(avatarId)
      if (baseAvatarId) {
        characterIdByArchiveId.set(baseAvatarId, character.id)
      }
    }
  }

  return characterIdByArchiveId
}

export const parseReliquaryRosterArchive = (
  archive: unknown,
  characters: Character[],
): RosterImportPreview => {
  if (!isRecord(archive)) {
    throw new Error('Import file must be a JSON object.')
  }

  const reliquaryArchive = archive as ReliquaryArchive
  if (!Array.isArray(reliquaryArchive.characters)) {
    throw new Error('Import file does not include a characters array.')
  }

  if (reliquaryArchive.characters.length > MAX_ARCHIVE_CHARACTERS) {
    throw new Error('Import file includes too many character entries.')
  }

  const characterIdByArchiveId = buildCharacterIdByArchiveId(characters)
  const characterById = new Map(characters.map((character) => [character.id, character]))
  const matchedCharacters: ImportedRosterCharacter[] = []
  const unmatchedCharacters: UnmatchedRosterCharacter[] = []
  const matchedCharacterIds = new Set<string>()

  for (const entry of reliquaryArchive.characters as ReliquaryArchiveCharacter[]) {
    if (!isRecord(entry)) {
      continue
    }

    const archiveId = normalizeArchiveId(entry.id)
    const archiveName = typeof entry.name === 'string' ? entry.name : archiveId
    if (!isSafeArchiveId(archiveId)) {
      continue
    }

    const characterId = characterIdByArchiveId.get(archiveId)
    const character = characterId ? characterById.get(characterId) : undefined

    if (!characterId) {
      unmatchedCharacters.push({ archiveId, archiveName })
      continue
    }

    if (matchedCharacterIds.has(characterId)) {
      continue
    }

    matchedCharacterIds.add(characterId)
    matchedCharacters.push({
      archiveId,
      archiveName,
      characterId,
      characterName: character?.name || archiveName || characterId,
    })
  }

  matchedCharacters.sort((left, right) => left.characterName.localeCompare(right.characterName))
  unmatchedCharacters.sort((left, right) => left.archiveName.localeCompare(right.archiveName))

  return {
    source: 'reliquary-archiver',
    matchedCharacters,
    unmatchedCharacters,
    ownedCharacterIds: matchedCharacters.map((character) => character.characterId).sort(),
  }
}
