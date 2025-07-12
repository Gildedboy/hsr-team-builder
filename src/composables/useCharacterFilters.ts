import { ref, computed } from 'vue'
import type { Character } from '@/types/Character'

export function useCharacterFilters(characters: Character[]) {
  const selectedElements = ref<string[]>([])
  const selectedPaths = ref<string[]>([])
  const selectedRarities = ref<number[]>([])
  const selectedArchetypes = ref<string[]>([])
  const searchQuery = ref<string>('')

  const filteredCharacters = computed(() => {
    return characters.filter(character => {
      const searchMatch = searchQuery.value === '' || 
        character.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      const elementMatch = selectedElements.value.length === 0 || 
        selectedElements.value.includes(character.element)
      
      const pathMatch = selectedPaths.value.length === 0 || 
        selectedPaths.value.includes(character.path)
      
      const rarityMatch = selectedRarities.value.length === 0 || 
        selectedRarities.value.includes(character.rarity)
      
      const archetypeMatch = selectedArchetypes.value.length === 0 || 
        selectedArchetypes.value.some(archetype => character.archetype.includes(archetype as any))
      
      return searchMatch && elementMatch && pathMatch && rarityMatch && archetypeMatch
    })
  })

  const toggleFilter = <T>(filterArray: T[], value: T) => {
    const index = filterArray.indexOf(value)
    if (index > -1) {
      filterArray.splice(index, 1)
    } else {
      filterArray.push(value)
    }
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedElements.value = []
    selectedPaths.value = []
    selectedRarities.value = []
    selectedArchetypes.value = []
  }

  return {
    selectedElements,
    selectedPaths,
    selectedRarities,
    selectedArchetypes,
    searchQuery,
    filteredCharacters,
    toggleFilter,
    clearFilters
  }
}