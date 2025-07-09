
import { characters } from '@/data/characters'
import { useCharacterFilters } from './useCharacterFilters'
import { useCharacterGrouping } from './useCharacterGrouping'
import { useCharacterSelection } from './useCharacterSelection'
import { useSearch } from './useSearch'
import type { Character } from '@/types/Character'

export function useHomeView() {
  const {
    selectedElements,
    selectedPaths,
    selectedRarities,
    selectedArchetypes,
    filteredCharacters,
    toggleFilter,
    clearFilters,
  } = useCharacterFilters(characters)

  const { charactersByRole } = useCharacterGrouping(filteredCharacters)

  const { selectedCharacter, selectCharacter, isCharacterRecommended, getRecommendationTier } =
    useCharacterSelection()

  const {
    searchQuery: searchQueryRef,
    showSearchSuggestions,
    searchSuggestions,
    selectCharacterFromSearch,
    onSearchFocus,
    onSearchBlur,
  } = useSearch()

  const handleSelectFromSearch = (character: Character) => {
    selectCharacterFromSearch(character, selectCharacter)
  }

  const handleClearFilters = () => {
    clearFilters()
    searchQueryRef.value = ''
    selectedCharacter.value = null
  }

  const getActiveTab = () => {
    const hasDps = Object.values(charactersByRole.value.dps).some(chars => chars.length > 0)
    const hasSupport = Object.values(charactersByRole.value.support).some(chars => chars.length > 0)
    const hasSustain = Object.values(charactersByRole.value.sustain).some(chars => chars.length > 0)
    
    if (hasDps) return 'dps'
    if (hasSupport) return 'support'
    if (hasSustain) return 'sustain'
    return 'dps'
  }

  const hasCharactersInRole = (role: 'dps' | 'support' | 'sustain') => {
    return Object.values(charactersByRole.value[role]).some(chars => chars.length > 0)
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
    
    // Actions
    toggleFilter,
    selectCharacter,
    handleSelectFromSearch,
    handleClearFilters,
    onSearchFocus,
    onSearchBlur,
    
    // Computed helpers
    isCharacterRecommended,
    getRecommendationTier,
    getActiveTab,
    hasCharactersInRole,
  }
}