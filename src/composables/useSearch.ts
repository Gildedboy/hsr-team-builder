import { ref, computed, watch } from 'vue'
import { characters } from '@/data/characters'
import type { Character } from '@/types/Character'

export function useSearch() {
  const searchQuery = ref<string>('')
  const showSearchSuggestions = ref<boolean>(false)
  const selectedIndex = ref<number>(-1)

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
    selectedIndex.value = -1
  }

  const onSearchFocus = () => {
    if (searchQuery.value.length >= 3) {
      showSearchSuggestions.value = true
    }
  }

  const onSearchBlur = () => {
    setTimeout(() => {
      showSearchSuggestions.value = false
      selectedIndex.value = -1
    }, 200)
  }

  const onKeyDown = (event: KeyboardEvent, onSelect: (char: Character) => void) => {
    if (!showSearchSuggestions.value || searchSuggestions.value.length === 0) {
      if (event.key === 'Enter' && searchSuggestions.value.length === 1) {
        selectCharacterFromSearch(searchSuggestions.value[0], onSelect)
      }
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        selectedIndex.value = Math.min(selectedIndex.value + 1, searchSuggestions.value.length - 1)
        break
      case 'ArrowUp':
        event.preventDefault()
        selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
        break
      case 'Enter':
        event.preventDefault()
        if (selectedIndex.value >= 0) {
          selectCharacterFromSearch(searchSuggestions.value[selectedIndex.value], onSelect)
        } else if (searchSuggestions.value.length > 0) {
          selectCharacterFromSearch(searchSuggestions.value[0], onSelect)
        }
        break
      case 'Escape':
        showSearchSuggestions.value = false
        selectedIndex.value = -1
        break
    }
  }

  watch(searchQuery, (newValue) => {
    selectedIndex.value = -1
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
    selectedIndex,
    selectCharacterFromSearch,
    onSearchFocus,
    onSearchBlur,
    onKeyDown
  }
}