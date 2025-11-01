import { ref, watch, onUnmounted } from 'vue'
import type { Character } from '@hsr-team-builder/shared'
import { CharacterService } from '../services/characterService'

// Constants
const MIN_SEARCH_LENGTH = 3
const MIN_SEARCH_INTERVAL = 300 // Minimum time between API calls in milliseconds
const AUTO_SEARCH_DELAY = 400 // Delay before auto-search triggers in milliseconds

export function useSearch() {
  const searchQuery = ref<string>('')
  const showSearchSuggestions = ref<boolean>(false)
  const selectedIndex = ref<number>(-1)
  const searchSuggestions = ref<Character[]>([])
  const searchError = ref<string>('')
  const isSearching = ref<boolean>(false)
  const isRateLimited = ref<boolean>(false)
  let blurTimeout: ReturnType<typeof setTimeout> | null = null
  let autoSearchTimeout: ReturnType<typeof setTimeout> | null = null
  let lastSearchTime = 0

  // Helper function to check rate limiting
  const checkRateLimit = (lastTime: number, interval: number): boolean => {
    const now = Date.now()
    return now - lastTime < interval
  }

  // Helper function to sanitize search input
  const sanitizeSearchInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"]/g, '') // Remove quotes that could break attributes
      .trim()
      .substring(0, 100) // Limit length to prevent abuse
  }

  // Function to perform API search
  const performSearch = async (query: string) => {
    if (!query || query.length < MIN_SEARCH_LENGTH) {
      searchSuggestions.value = []
      showSearchSuggestions.value = false
      return
    }

    // Rate limiting check with user feedback
    if (checkRateLimit(lastSearchTime, MIN_SEARCH_INTERVAL)) {
      console.log('🚦 Search rate limited, please wait...')
      isRateLimited.value = true
      searchError.value = 'Please wait a moment before searching again.'

      // Clear rate limit feedback after interval
      setTimeout(() => {
        isRateLimited.value = false
        searchError.value = ''
      }, MIN_SEARCH_INTERVAL)
      return
    }

    try {
      console.log('🔍 Searching for:', query)
      isSearching.value = true
      isRateLimited.value = false
      searchError.value = '' // Clear any previous errors

      // Update lastSearchTime when API call actually happens
      lastSearchTime = Date.now()

      const results = await CharacterService.searchCharacters(query)
      console.log('✅ Search results:', results)

      // Ensure results is an array
      if (Array.isArray(results)) {
        searchSuggestions.value = results.slice(0, 8) // Limit to 8 suggestions
        showSearchSuggestions.value = results.length > 0
      } else {
        console.warn('⚠️ Search results is not an array:', results)
        searchSuggestions.value = []
        showSearchSuggestions.value = false
      }
    } catch (error) {
      console.error('❌ Search error:', error)
      searchSuggestions.value = []
      showSearchSuggestions.value = false

      // Set user-friendly error message
      searchError.value = 'Search temporarily unavailable. Please try again.'
    } finally {
      isSearching.value = false
    }
  }

  // Manual search trigger function
  const triggerSearch = () => {
    const sanitizedQuery = sanitizeSearchInput(searchQuery.value)
    performSearch(sanitizedQuery)
  }

  // Handle input changes with auto-search
  watch(searchQuery, (newQuery) => {
    const sanitizedQuery = sanitizeSearchInput(newQuery)

    // Clear any existing auto-search timeout
    if (autoSearchTimeout) {
      clearTimeout(autoSearchTimeout)
      autoSearchTimeout = null
    }

    // Reset selected index when query changes
    selectedIndex.value = -1

    if (sanitizedQuery.length < MIN_SEARCH_LENGTH) {
      showSearchSuggestions.value = false
      searchSuggestions.value = []
      return
    }

    // Auto-search after delay
    autoSearchTimeout = setTimeout(() => {
      performSearch(sanitizedQuery)
      autoSearchTimeout = null
    }, AUTO_SEARCH_DELAY)
  })

  const selectCharacterFromSearch = (character: Character, onSelect: (char: Character) => void) => {
    onSelect(character)
    searchQuery.value = ''
    showSearchSuggestions.value = false
    searchSuggestions.value = []
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

    // Show suggestions if we have them and query is long enough
    if (searchQuery.value.length >= MIN_SEARCH_LENGTH && searchSuggestions.value.length > 0) {
      showSearchSuggestions.value = true
    }

    // Trigger search if we have enough characters but no suggestions yet
    if (searchQuery.value.length >= MIN_SEARCH_LENGTH && searchSuggestions.value.length === 0) {
      // Clear any existing timeout and trigger search immediately
      if (autoSearchTimeout) {
        clearTimeout(autoSearchTimeout)
        autoSearchTimeout = null
      }
      triggerSearch()
    }
  }

  const onKeyDown = (event: KeyboardEvent, onSelect: (char: Character) => void) => {
    // Handle Enter key when no suggestions are visible but we have results
    if (
      !showSearchSuggestions.value &&
      searchSuggestions.value.length > 0 &&
      event.key === 'Enter'
    ) {
      event.preventDefault()
      selectCharacterFromSearch(searchSuggestions.value[0], onSelect)
      return
    }

    // Handle Enter key for general search when no suggestions
    if (!showSearchSuggestions.value && event.key === 'Enter') {
      event.preventDefault()
      triggerSearch()
      return
    }

    // Return early if no suggestions are visible
    if (!showSearchSuggestions.value || searchSuggestions.value.length === 0) {
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (selectedIndex.value < searchSuggestions.value.length - 1) {
          selectedIndex.value++
        } else {
          selectedIndex.value = 0 // Wrap to first item
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (selectedIndex.value > 0) {
          selectedIndex.value--
        } else if (selectedIndex.value === 0) {
          selectedIndex.value = searchSuggestions.value.length - 1 // Wrap to last item
        } else {
          selectedIndex.value = searchSuggestions.value.length - 1 // Set to last item if -1
        }
        break
      case 'Enter':
        event.preventDefault()
        if (selectedIndex.value >= 0 && selectedIndex.value < searchSuggestions.value.length) {
          // Select highlighted suggestion
          selectCharacterFromSearch(searchSuggestions.value[selectedIndex.value], onSelect)
        } else if (searchSuggestions.value.length === 1) {
          // Auto-select if only one option
          selectCharacterFromSearch(searchSuggestions.value[0], onSelect)
        } else if (searchSuggestions.value.length > 0) {
          // Select first suggestion as default
          selectCharacterFromSearch(searchSuggestions.value[0], onSelect)
        }
        break
      case 'Escape':
        event.preventDefault()
        showSearchSuggestions.value = false
        searchSuggestions.value = []
        selectedIndex.value = -1
        searchQuery.value = ''
        break
      case 'Tab':
        if (showSearchSuggestions.value) {
          event.preventDefault()
          // Tab selects first suggestion or highlighted one
          if (selectedIndex.value >= 0 && selectedIndex.value < searchSuggestions.value.length) {
            selectCharacterFromSearch(searchSuggestions.value[selectedIndex.value], onSelect)
          } else if (searchSuggestions.value.length > 0) {
            selectCharacterFromSearch(searchSuggestions.value[0], onSelect)
          }
        }
        break
    }
  }

  // Cleanup timeouts on component unmount
  onUnmounted(() => {
    if (blurTimeout) {
      clearTimeout(blurTimeout)
    }
    if (autoSearchTimeout) {
      clearTimeout(autoSearchTimeout)
    }
  })

  return {
    searchQuery,
    showSearchSuggestions,
    searchSuggestions,
    selectedIndex,
    searchError,
    isSearching,
    isRateLimited,
    triggerSearch,
    selectCharacterFromSearch,
    onSearchFocus,
    onSearchBlur,
    onKeyDown,
    setSearchQuery,
    MIN_SEARCH_LENGTH,
  }
}
