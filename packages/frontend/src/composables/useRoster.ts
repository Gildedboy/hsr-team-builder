import { computed, ref } from 'vue'
import type { Character } from '@hsr-team-builder/shared'
import {
  CHARACTER_REPLACEMENT_MAP,
  FREE_CHARACTER_IDS,
  ROSTER_STORAGE_KEY,
  getCharacterIdentityKey,
  isFreeCharacterId,
} from '@/constants/roster'

interface StoredRosterConfig {
  disabledCharacterIds: string[]
}

export type ResolvedCharacterKind = 'owned' | 'free' | 'fallback' | 'unavailable' | 'custom'

export interface ResolvedCharacterEntry {
  id: string
  originalId: string
  name: string
  originalName: string
  kind: ResolvedCharacterKind
  isFree: boolean
}

export interface ResolvedTeammateSection {
  name: string
  bis: ResolvedCharacterEntry[]
  generalist: ResolvedCharacterEntry[]
  f2p: ResolvedCharacterEntry[]
}

export interface ResolvedTeamVariant {
  characters: ResolvedCharacterEntry[]
  description?: string
}

export interface ResolvedTeamComposition {
  name: string
  role: string
  bis: ResolvedTeamVariant
  f2p?: ResolvedTeamVariant
}

const savedDisabledCharacterIds = ref<Set<string>>(new Set())
const stagedDisabledCharacterIds = ref<Set<string>>(new Set())
const isRosterEditMode = ref(false)

let hasLoadedRosterState = false

const cloneIdSet = (ids: Iterable<string>) => new Set<string>(ids)

const sanitizeDisabledCharacterIds = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0)
    .map((entry) => entry.trim())
    .filter((entry) => !isFreeCharacterId(entry))
}

const loadStoredRosterConfig = (): StoredRosterConfig => {
  if (typeof window === 'undefined') {
    return { disabledCharacterIds: [] }
  }

  try {
    const rawValue = window.localStorage.getItem(ROSTER_STORAGE_KEY)
    if (!rawValue) {
      return { disabledCharacterIds: [] }
    }

    const parsed = JSON.parse(rawValue) as Partial<StoredRosterConfig> | null
    return {
      disabledCharacterIds: sanitizeDisabledCharacterIds(parsed?.disabledCharacterIds),
    }
  } catch {
    return { disabledCharacterIds: [] }
  }
}

const persistRosterConfig = (disabledIds: Set<string>) => {
  if (typeof window === 'undefined') {
    return
  }

  const config: StoredRosterConfig = {
    disabledCharacterIds: [...disabledIds].sort(),
  }

  window.localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(config))
}

const ensureRosterState = () => {
  if (hasLoadedRosterState) {
    return
  }

  const storedConfig = loadStoredRosterConfig()
  savedDisabledCharacterIds.value = cloneIdSet(storedConfig.disabledCharacterIds)
  stagedDisabledCharacterIds.value = cloneIdSet(storedConfig.disabledCharacterIds)
  hasLoadedRosterState = true
}

const getCharacterMap = (characters: Character[]) =>
  new Map<string, Character>(characters.map((character) => [character.id, character]))

const areSetsEqual = (left: Set<string>, right: Set<string>) => {
  if (left.size !== right.size) {
    return false
  }

  for (const value of left) {
    if (!right.has(value)) {
      return false
    }
  }

  return true
}

const buildResolvedEntry = (
  displayedId: string,
  originalId: string,
  kind: ResolvedCharacterKind,
  characterMap: Map<string, Character>,
): ResolvedCharacterEntry => {
  const displayedCharacter = characterMap.get(displayedId)
  const originalCharacter = characterMap.get(originalId)

  return {
    id: displayedId,
    originalId,
    name: displayedCharacter?.name || displayedId,
    originalName: originalCharacter?.name || originalId,
    kind,
    isFree: kind !== 'custom' && isFreeCharacterId(displayedId),
  }
}

const resolveCharacterEntries = (
  characterIds: string[],
  characters: Character[],
  isCharacterAvailable: (characterId: string, useStaged?: boolean) => boolean,
  options?: {
    preserveUnavailable?: boolean
    useStaged?: boolean
  },
): ResolvedCharacterEntry[] => {
  const characterMap = getCharacterMap(characters)
  const usedCharacterIds = new Set<string>()
  const preserveUnavailable = options?.preserveUnavailable ?? false
  const useStaged = options?.useStaged
  const remainingIdentityCounts = new Map<string, number>()

  for (const characterId of characterIds) {
    if (!characterMap.has(characterId)) {
      continue
    }

    const identityKey = getCharacterIdentityKey(characterId)
    remainingIdentityCounts.set(identityKey, (remainingIdentityCounts.get(identityKey) || 0) + 1)
  }

  return characterIds.flatMap((characterId) => {
    const originalIdentityKey = getCharacterIdentityKey(characterId)
    if (remainingIdentityCounts.has(originalIdentityKey)) {
      remainingIdentityCounts.set(
        originalIdentityKey,
        Math.max((remainingIdentityCounts.get(originalIdentityKey) || 1) - 1, 0),
      )
    }

    if (!characterMap.has(characterId)) {
      return [buildResolvedEntry(characterId, characterId, 'custom', characterMap)]
    }

    if (isCharacterAvailable(characterId, useStaged) && !usedCharacterIds.has(originalIdentityKey)) {
      usedCharacterIds.add(originalIdentityKey)
      const kind = isFreeCharacterId(characterId) ? 'free' : 'owned'
      return [buildResolvedEntry(characterId, characterId, kind, characterMap)]
    }

    const replacementCandidates = CHARACTER_REPLACEMENT_MAP[characterId] || []
    for (const candidateId of replacementCandidates) {
      const candidateIdentityKey = getCharacterIdentityKey(candidateId)

      if (!characterMap.has(candidateId) || usedCharacterIds.has(candidateIdentityKey)) {
        continue
      }

      if (!isCharacterAvailable(candidateId, useStaged)) {
        continue
      }

      if ((remainingIdentityCounts.get(candidateIdentityKey) || 0) > 0) {
        continue
      }

      usedCharacterIds.add(candidateIdentityKey)
      return [buildResolvedEntry(candidateId, characterId, 'fallback', characterMap)]
    }

    if (!preserveUnavailable || usedCharacterIds.has(originalIdentityKey)) {
      return []
    }

    usedCharacterIds.add(originalIdentityKey)
    return [buildResolvedEntry(characterId, characterId, 'unavailable', characterMap)]
  })
}

export function useRoster() {
  ensureRosterState()

  const effectiveDisabledCharacterIds = computed(() =>
    isRosterEditMode.value ? stagedDisabledCharacterIds.value : savedDisabledCharacterIds.value,
  )

  const disabledCharacterIds = computed(() => [...effectiveDisabledCharacterIds.value].sort())
  const freeCharacterIds = computed(() => [...FREE_CHARACTER_IDS])
  const hasStagedChanges = computed(
    () => !areSetsEqual(savedDisabledCharacterIds.value, stagedDisabledCharacterIds.value),
  )

  const isCharacterDisabled = (characterId: string, useStaged = isRosterEditMode.value) => {
    if (isFreeCharacterId(characterId)) {
      return false
    }

    const sourceIds = useStaged ? stagedDisabledCharacterIds.value : savedDisabledCharacterIds.value
    return sourceIds.has(characterId)
  }

  const isCharacterAvailable = (characterId: string, useStaged = isRosterEditMode.value) =>
    isFreeCharacterId(characterId) || !isCharacterDisabled(characterId, useStaged)

  const enterRosterEditMode = () => {
    stagedDisabledCharacterIds.value = cloneIdSet(savedDisabledCharacterIds.value)
    isRosterEditMode.value = true
  }

  const cancelRosterEditMode = () => {
    stagedDisabledCharacterIds.value = cloneIdSet(savedDisabledCharacterIds.value)
    isRosterEditMode.value = false
  }

  const saveRosterEditMode = () => {
    savedDisabledCharacterIds.value = cloneIdSet(stagedDisabledCharacterIds.value)
    persistRosterConfig(savedDisabledCharacterIds.value)
    isRosterEditMode.value = false
  }

  const selectAllNonFreeCharacters = () => {
    if (!isRosterEditMode.value) {
      return
    }

    stagedDisabledCharacterIds.value = new Set()
  }

  const hideAllNonFreeCharacters = (characters: Character[]) => {
    if (!isRosterEditMode.value) {
      return
    }

    stagedDisabledCharacterIds.value = new Set(
      characters
        .map((character) => character.id)
        .filter((characterId) => !isFreeCharacterId(characterId)),
    )
  }

  const toggleCharacterAvailability = (characterId: string) => {
    if (!isRosterEditMode.value || isFreeCharacterId(characterId)) {
      return
    }

    const nextDisabledIds = cloneIdSet(stagedDisabledCharacterIds.value)
    if (nextDisabledIds.has(characterId)) {
      nextDisabledIds.delete(characterId)
    } else {
      nextDisabledIds.add(characterId)
    }

    stagedDisabledCharacterIds.value = nextDisabledIds
  }

  const getResolvedTeammateSections = (
    character: Character | null | undefined,
    characters: Character[],
    options?: { useStaged?: boolean },
  ): ResolvedTeammateSection[] => {
    if (!character?.teammateRecommendations?.length) {
      return []
    }

    return character.teammateRecommendations.map((section) => ({
      name: section.name,
      bis: resolveCharacterEntries(section.bis, characters, isCharacterAvailable, {
        useStaged: options?.useStaged,
      }),
      generalist: resolveCharacterEntries(section.generalist, characters, isCharacterAvailable, {
        useStaged: options?.useStaged,
      }),
      f2p: resolveCharacterEntries(section.f2p, characters, isCharacterAvailable, {
        useStaged: options?.useStaged,
      }),
    }))
  }

  const getResolvedTeamCompositions = (
    character: Character | null | undefined,
    characters: Character[],
    options?: { useStaged?: boolean },
  ): ResolvedTeamComposition[] => {
    if (!character?.teamCompositions?.length) {
      return []
    }

    return character.teamCompositions.map((team) => ({
      name: team.name,
      role: team.role,
      bis: {
        description: team.bis.description,
        characters: resolveCharacterEntries(team.bis.characters, characters, isCharacterAvailable, {
          preserveUnavailable: true,
          useStaged: options?.useStaged,
        }),
      },
      f2p: team.f2p
        ? {
            description: team.f2p.description,
            characters: resolveCharacterEntries(
              team.f2p.characters,
              characters,
              isCharacterAvailable,
              {
                preserveUnavailable: true,
                useStaged: options?.useStaged,
              },
            ),
          }
        : undefined,
    }))
  }

  const isCharacterRecommended = (
    selectedCharacter: Character,
    characterId: string,
    characters: Character[],
    options?: { useStaged?: boolean },
  ) =>
    getResolvedTeammateSections(selectedCharacter, characters, options).some((section) =>
      [section.bis, section.generalist, section.f2p].some((entries) =>
        entries.some((entry) => entry.id === characterId),
      ),
    )

  const getRecommendationTier = (
    selectedCharacter: Character,
    characterId: string,
    characters: Character[],
    options?: { useStaged?: boolean },
  ): 'bis' | 'generalist' | 'f2p' | null => {
    const sections = getResolvedTeammateSections(selectedCharacter, characters, options)

    for (const section of sections) {
      if (section.bis.some((entry) => entry.id === characterId)) {
        return 'bis'
      }
    }

    for (const section of sections) {
      if (section.generalist.some((entry) => entry.id === characterId)) {
        return 'generalist'
      }
    }

    for (const section of sections) {
      if (section.f2p.some((entry) => entry.id === characterId)) {
        return 'f2p'
      }
    }

    return null
  }

  return {
    disabledCharacterIds,
    freeCharacterIds,
    hasStagedChanges,
    isRosterEditMode,
    isCharacterAvailable,
    isCharacterDisabled,
    enterRosterEditMode,
    cancelRosterEditMode,
    saveRosterEditMode,
    selectAllNonFreeCharacters,
    hideAllNonFreeCharacters,
    toggleCharacterAvailability,
    getResolvedTeammateSections,
    getResolvedTeamCompositions,
    isCharacterRecommended,
    getRecommendationTier,
    isFreeCharacterId,
  }
}
