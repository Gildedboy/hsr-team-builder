import { ref, computed, watch } from 'vue'
import { characters } from '@/data/characters'
import type { Character } from '@/types/Character'

export function useSearch() {
  const searchQuery = ref<string>('')
  const showSearchSuggestions = ref<boolean>(false)

  const searchSuggestions = computed(() => {
    if (searchQuery.value.length < 3) return []
    return characters.filter(char => 
      char.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    ).slice(0, 5)
  })

  const selectCharacterFromSearch = (character: Character, onSelect: (char: Character) => void) => {
    onSelect(character)
    searchQuery.value = ''
    showSearchSuggestions.value = false
  }

  const onSearchFocus = () => {
    if (searchQuery.value.length >= 3) {
      showSearchSuggestions.value = true
    }
  }

  const onSearchBlur = () => {
    setTimeout(() => {
      showSearchSuggestions.value = false
    }, 200)
  }

  watch(searchQuery, (newValue) => {
    if (newValue.length >= 3) {
      showSearchSuggestions.value = true
    } else {
      showSearchSuggestions.value = false
    }
  })

  return {
    searchQuery,
    showSearchSuggestions,
    searchSuggestions,
    selectCharacterFromSearch,
    onSearchFocus,
    onSearchBlur
  }
}