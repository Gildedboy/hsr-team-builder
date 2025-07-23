import { ref, watch, computed, onUnmounted } from 'vue'
import type { Character } from '@hsr-team-builder/shared'

export function useSearch(characters?: () => Character[]) {
  const searchQuery = ref<string>('')
  const showSearchSuggestions = ref<boolean>(false)
  const selectedIndex = ref<number>(-1)
  let searchTimeout: ReturnType<typeof setTimeout> | null = null
  let blurTimeout: ReturnType<typeof setTimeout> | null = null
  let lastSearchTime = 0
  const MIN_SEARCH_INTERVAL = 50 // Minimum time between searches in milliseconds

  // Helper function to sanitize search input
  const sanitizeSearchInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"]/g, '') // Remove quotes that could break attributes
      .trim()
      .substring(0, 100) // Limit length to prevent abuse
  }

  // Compute search suggestions based on the search query
  const searchSuggestions = computed(() => {
    // Rate limiting check
    const now = Date.now()
    if (now - lastSearchTime < MIN_SEARCH_INTERVAL) {
      return []
    }
    lastSearchTime = now

    if (!searchQuery.value || searchQuery.value.length < 2 || !characters) {
      return []
    }

    const sanitizedQuery = sanitizeSearchInput(searchQuery.value.toLowerCase())
    if (!sanitizedQuery) {
      return []
    }

    const allCharacters = characters()

    if (!allCharacters || allCharacters.length === 0) {
      return []
    }

    return allCharacters
      .filter((character) => {
        try {
          // Search by name
          if (character.name && character.name.toLowerCase().includes(sanitizedQuery)) {
            return true
          }

          // Search by element
          if (character.element && character.element.toLowerCase().includes(sanitizedQuery)) {
            return true
          }

          // Search by path
          if (character.path && character.path.toLowerCase().includes(sanitizedQuery)) {
            return true
          }

          // Search by labels/tags
          if (character.labels && Array.isArray(character.labels)) {
            const hasMatchingLabel = character.labels.some((label: string) => 
              label && label.toLowerCase().includes(sanitizedQuery)
            )
            if (hasMatchingLabel) return true
          }

          // Search by archetype
          if (character.archetype && Array.isArray(character.archetype)) {
            const hasMatchingArchetype = character.archetype.some((arch: string) => 
              arch && arch.toLowerCase().includes(sanitizedQuery)
            )
            if (hasMatchingArchetype) return true
          }

          // Search by roles
          if (character.roles && Array.isArray(character.roles)) {
            const hasMatchingRole = character.roles.some((role: string) => 
              role && role.toLowerCase().includes(sanitizedQuery)
            )
            if (hasMatchingRole) return true
          }

          return false
        } catch (error) {
          console.warn('Error filtering character:', character, error)
          return false
        }
      })
      .slice(0, 8) // Limit to 8 suggestions
  })

  // Watch search query changes with debouncing
  watch(searchQuery, (newQuery) => {
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    const sanitizedQuery = sanitizeSearchInput(newQuery)
    
    if (sanitizedQuery.length >= 2) {
      // Debounce search to avoid excessive computations
      searchTimeout = setTimeout(() => {
        showSearchSuggestions.value = true
        selectedIndex.value = -1
      }, 150) // 150ms debounce
    } else {
      showSearchSuggestions.value = false
      selectedIndex.value = -1
    }
  })

  const selectCharacterFromSearch = (character: Character, onSelect: (char: Character) => void) => {
    onSelect(character)
    searchQuery.value = ''
    showSearchSuggestions.value = false
    selectedIndex.value = -1
  }

  const setSearchQuery = (value: string) => {
    searchQuery.value = sanitizeSearchInput(value)
  }

  const onSearchBlur = () => {
    // Clear any existing blur timeout
    if (blurTimeout) {
      clearTimeout(blurTimeout)
    }
    
    blurTimeout = setTimeout(() => {
      showSearchSuggestions.value = false
      selectedIndex.value = -1
    }, 200)
  }

  const onSearchFocus = () => {
    // Clear blur timeout if user focuses back quickly
    if (blurTimeout) {
      clearTimeout(blurTimeout)
      blurTimeout = null
    }
    
    if (searchQuery.value.length >= 2) {
      showSearchSuggestions.value = true
    }
  }

  const onKeyDown = (event: KeyboardEvent, onSelect: (char: Character) => void) => {
    if (!showSearchSuggestions.value || searchSuggestions.value.length === 0) {
      if (event.key === 'Enter' && searchSuggestions.value.length === 1) {
        event.preventDefault()
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
        if (selectedIndex.value >= 0 && selectedIndex.value < searchSuggestions.value.length) {
          selectCharacterFromSearch(searchSuggestions.value[selectedIndex.value], onSelect)
        } else if (searchSuggestions.value.length > 0) {
          selectCharacterFromSearch(searchSuggestions.value[0], onSelect)
        }
        break
      case 'Escape':
        event.preventDefault()
        showSearchSuggestions.value = false
        selectedIndex.value = -1
        searchQuery.value = ''
        break
      case 'Tab':
        if (showSearchSuggestions.value) {
          event.preventDefault()
          showSearchSuggestions.value = false
          selectedIndex.value = -1
        }
        break
    }
  }

  // Cleanup timeouts on component unmount
  onUnmounted(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    if (blurTimeout) {
      clearTimeout(blurTimeout)
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
    onKeyDown,
    setSearchQuery,
  }
}
