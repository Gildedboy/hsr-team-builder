import { ref } from 'vue'

export type TrailblazerAvatarVariant = 'caelus' | 'stelle'

const TRAILBLAZER_AVATAR_VARIANT_STORAGE_KEY = 'hsr-team-builder:trailblazer-avatar-variant:v1'
const LEGACY_TRAILBLAZER_AVATAR_STORAGE_KEY = 'hsr-team-builder:trailblazer-avatar-gender:v1'
const trailblazerAvatarVariant = ref<TrailblazerAvatarVariant>('stelle')

let hasLoadedPreference = false

const isValidAvatarVariant = (value: unknown): value is TrailblazerAvatarVariant =>
  value === 'caelus' || value === 'stelle'

const migrateLegacyVariant = (value: string | null): TrailblazerAvatarVariant | null => {
  if (value === 'male') {
    return 'caelus'
  }

  if (value === 'female') {
    return 'stelle'
  }

  return null
}

const ensurePreferenceLoaded = () => {
  if (hasLoadedPreference || typeof window === 'undefined') {
    return
  }

  const storedVariant = window.localStorage.getItem(TRAILBLAZER_AVATAR_VARIANT_STORAGE_KEY)
  if (isValidAvatarVariant(storedVariant)) {
    trailblazerAvatarVariant.value = storedVariant
    hasLoadedPreference = true
    return
  }

  const legacyVariant = migrateLegacyVariant(
    window.localStorage.getItem(LEGACY_TRAILBLAZER_AVATAR_STORAGE_KEY),
  )

  if (legacyVariant) {
    trailblazerAvatarVariant.value = legacyVariant
    window.localStorage.setItem(TRAILBLAZER_AVATAR_VARIANT_STORAGE_KEY, legacyVariant)
    window.localStorage.removeItem(LEGACY_TRAILBLAZER_AVATAR_STORAGE_KEY)
  }

  hasLoadedPreference = true
}

export function useAvatarPreference() {
  ensurePreferenceLoaded()

  const setTrailblazerAvatarVariant = (variant: TrailblazerAvatarVariant) => {
    trailblazerAvatarVariant.value = variant

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TRAILBLAZER_AVATAR_VARIANT_STORAGE_KEY, variant)
      window.localStorage.removeItem(LEGACY_TRAILBLAZER_AVATAR_STORAGE_KEY)
    }
  }

  return {
    trailblazerAvatarVariant,
    setTrailblazerAvatarVariant,
  }
}
