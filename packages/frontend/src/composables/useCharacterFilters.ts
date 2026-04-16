import { ref, computed, type ComputedRef } from 'vue'
import type { Character, Archetype } from '@hsr-team-builder/shared'
import { canonicalizeArchetypes, canonicalizeArchetype } from '@/utils/archetypes'

export function useCharacterFilters(characters: ComputedRef<Character[]>) {
  const selectedElements = ref<string[]>([])
  const selectedPaths = ref<string[]>([])
  const selectedRarities = ref<number[]>([])
  const selectedArchetypes = ref<string[]>([])
  const searchQuery = ref<string>('')

  const filteredCharacters = computed(() => {
    return characters.value.filter((character) => {
      const searchMatch =
        searchQuery.value === '' ||
        character.name.toLowerCase().includes(searchQuery.value.toLowerCase())

      const elementMatch =
        selectedElements.value.length === 0 || selectedElements.value.includes(character.element)

      const pathMatch =
        selectedPaths.value.length === 0 || selectedPaths.value.includes(character.path)

      const rarityMatch =
        selectedRarities.value.length === 0 || selectedRarities.value.includes(character.rarity)

      const archetypeMatch =
        selectedArchetypes.value.length === 0 ||
        canonicalizeArchetypes(character.archetype).some((archetype) =>
          selectedArchetypes.value.some(
            (selectedArchetype) =>
              archetype === canonicalizeArchetype(selectedArchetype as Archetype),
          ),
        )

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
    clearFilters,
  }
}
