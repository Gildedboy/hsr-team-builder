import { ref, computed } from 'vue'
import { CharacterService } from '../services/characterService'
import type { Character } from '@hsr-team-builder/shared'
import { staticCharacterList } from '../data/staticCharacters'

// Initialize with static characters for immediate display
const characters = ref<Character[]>(staticCharacterList)
const loading = ref(false)
const error = ref<string | null>(null)

// Load characters from API
export const useCharactersApi = () => {
  const loadCharacters = async () => {
    // Check if we already have API data (not just static data)
    if (characters.value.length > 0 && characters.value[0]?.teammateRecommendations?.length > 0) {
      return // Already loaded API data
    }

    loading.value = true
    error.value = null

    try {
      const apiCharacters = await CharacterService.getAllCharacters()
      characters.value = apiCharacters // Replace static data with API data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load characters'
      console.error('Failed to load characters:', err)
      // Keep static characters if API fails
    } finally {
      loading.value = false
    }
  }

  const searchCharacters = async (query: string): Promise<Character[]> => {
    try {
      return await CharacterService.searchCharacters(query)
    } catch (err) {
      console.error('Failed to search characters:', err)
      return []
    }
  }

  const getCharactersByRole = async (role: string): Promise<Character[]> => {
    try {
      return await CharacterService.getCharactersByRole(role)
    } catch (err) {
      console.error('Failed to get characters by role:', err)
      return []
    }
  }

  const getCharactersByElement = async (element: string): Promise<Character[]> => {
    try {
      return await CharacterService.getCharactersByElement(element)
    } catch (err) {
      console.error('Failed to get characters by element:', err)
      return []
    }
  }

  const getCharactersByPath = async (path: string): Promise<Character[]> => {
    try {
      return await CharacterService.getCharactersByPath(path)
    } catch (err) {
      console.error('Failed to get characters by path:', err)
      return []
    }
  }

  const getCharacterById = (id: string): Character | undefined => {
    return characters.value.find((char) => char.id === id)
  }

  // Computed properties for filtering
  const dpsCharacters = computed(() =>
    characters.value.filter((char) => char.roles.includes('DPS')),
  )

  const supportCharacters = computed(() =>
    characters.value.filter((char) => char.roles.includes('SUPPORT')),
  )

  const sustainCharacters = computed(() =>
    characters.value.filter((char) => char.roles.includes('SUSTAIN')),
  )

  return {
    characters: computed(() => characters.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    dpsCharacters,
    supportCharacters,
    sustainCharacters,
    loadCharacters,
    searchCharacters,
    getCharactersByRole,
    getCharactersByElement,
    getCharactersByPath,
    getCharacterById,
  }
}
