import { useCharacterFilters } from './useCharacterFilters'
import { useCharacterGrouping } from './useCharacterGrouping'
import { useCharacterSelection } from './useCharacterSelection'
import { useSearch } from './useSearch'
import { type ComputedRef } from 'vue'
import type { Character } from '@hsr-team-builder/shared'

export function useHomeView(characters: ComputedRef<Character[]>) {
  const {
    selectedElements,
    selectedPaths,
    selectedRarities,
    selectedArchetypes,
    filteredCharacters,
    toggleFilter,
    clearFilters,
  } = useCharacterFilters(characters)

  const { charactersByRole } = useCharacterGrouping(filteredCharacters, selectedArchetypes)

  const { selectedCharacter, selectCharacter, isCharacterRecommended, getRecommendationTier } =
    useCharacterSelection()

  const {
    searchQuery: searchQueryRef,
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
    MIN_SEARCH_LENGTH,
  } = useSearch()

  const handleSelectFromSearch = (character: Character) => {
    selectCharacterFromSearch(character, (char) => selectCharacter(char, false))
  }

  const handleClearFilters = () => {
    clearFilters()
    searchQueryRef.value = ''
    selectedCharacter.value = null
  }

  const getActiveTab = () => {
    // If a character is selected, switch to their role's tab
    if (selectedCharacter.value) {
      const char = selectedCharacter.value
      if (char.roles.includes('DPS') && hasCharactersInRole('dps')) return 'dps'
      if (char.roles.includes('SUPPORT') && hasCharactersInRole('support')) return 'support'
      if (char.roles.includes('SUSTAIN') && hasCharactersInRole('sustain')) return 'sustain'
    }

    // Default behavior: return first available tab
    const hasDps = Object.values(charactersByRole.value.dps).some((chars) => chars.length > 0)
    const hasSupport = Object.values(charactersByRole.value.support).some(
      (chars) => chars.length > 0,
    )
    const hasSustain = Object.values(charactersByRole.value.sustain).some(
      (chars) => chars.length > 0,
    )

    if (hasDps) return 'dps'
    if (hasSupport) return 'support'
    if (hasSustain) return 'sustain'
    return 'dps'
  }

  const hasCharactersInRole = (role: 'dps' | 'support' | 'sustain') => {
    return Object.values(charactersByRole.value[role]).some((chars) => chars.length > 0)
  }

  return {
    // Filter state
    selectedElements,
    selectedPaths,
    selectedRarities,
    selectedArchetypes,

    // Character data
    charactersByRole,
    selectedCharacter,

    // Search state
    searchQueryRef,
    showSearchSuggestions,
    searchSuggestions,
    selectedIndex,
    searchError,
    isSearching,
    isRateLimited,
    MIN_SEARCH_LENGTH,

    // Actions
    toggleFilter,
    selectCharacter,
    handleSelectFromSearch,
    handleClearFilters,
    triggerSearch,
    onSearchFocus,
    onSearchBlur,
    onKeyDown,

    // Computed helpers
    isCharacterRecommended,
    getRecommendationTier,
    getActiveTab,
    hasCharactersInRole,
  }
}
