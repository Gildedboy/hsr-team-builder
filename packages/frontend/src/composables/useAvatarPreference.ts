import { ref } from 'vue'

export type TrailblazerAvatarGender = 'male' | 'female'

const TRAILBLAZER_AVATAR_STORAGE_KEY = 'hsr-team-builder:trailblazer-avatar-gender:v1'
const trailblazerAvatarGender = ref<TrailblazerAvatarGender>('female')

let hasLoadedPreference = false

const isValidGender = (value: unknown): value is TrailblazerAvatarGender =>
  value === 'male' || value === 'female'

const ensurePreferenceLoaded = () => {
  if (hasLoadedPreference || typeof window === 'undefined') {
    return
  }

  const storedValue = window.localStorage.getItem(TRAILBLAZER_AVATAR_STORAGE_KEY)
  if (isValidGender(storedValue)) {
    trailblazerAvatarGender.value = storedValue
  }

  hasLoadedPreference = true
}

export function useAvatarPreference() {
  ensurePreferenceLoaded()

  const setTrailblazerAvatarGender = (gender: TrailblazerAvatarGender) => {
    trailblazerAvatarGender.value = gender

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TRAILBLAZER_AVATAR_STORAGE_KEY, gender)
    }
  }

  return {
    trailblazerAvatarGender,
    setTrailblazerAvatarGender,
  }
}
