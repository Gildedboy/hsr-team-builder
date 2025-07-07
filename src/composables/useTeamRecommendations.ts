import { ref, computed, watch, toRef } from 'vue'
import { characters } from '@/data/characters'
import type { Character } from '@/types/Character'

export function useTeamRecommendations(character: Character) {
  const characterRef = toRef(() => character)
  
  const activeTab = ref<'subDPS' | 'bufferDebuffer' | 'sustain'>(
    character.teamRecommendations?.requiresSubDPS ? 'subDPS' : 'bufferDebuffer'
  )

  // Reset tab when character changes
  watch(characterRef, (newCharacter) => {
    activeTab.value = newCharacter.teamRecommendations?.requiresSubDPS ? 'subDPS' : 'bufferDebuffer'
  })

  const currentRecommendations = computed(() => {
    if (!characterRef.value.teamRecommendations) return null
    
    switch (activeTab.value) {
      case 'subDPS':
        return characterRef.value.teamRecommendations.subDPS
      case 'bufferDebuffer':
        return characterRef.value.teamRecommendations.bufferDebuffer
      case 'sustain':
        return characterRef.value.teamRecommendations.sustain
      default:
        return null
    }
  })

  const getCharacterName = (characterId: string): string => {
    const char = characters.find(c => c.id === characterId)
    return char?.name || characterId
  }

  const getGridColumns = () => {
    if (!currentRecommendations.value) return '1fr'
    
    const visibleSections = []
    if (currentRecommendations.value.bis.length > 0) visibleSections.push('1fr')
    if (currentRecommendations.value.generalist.length > 0) visibleSections.push('1fr')
    if (currentRecommendations.value.f2p.length > 0 || (activeTab.value === 'sustain' && character.teamRecommendations?.anySustainAvailable === false)) {
      visibleSections.push('1fr')
    }
    
    return visibleSections.join(' ') || '1fr'
  }

  return {
    activeTab,
    currentRecommendations,
    getCharacterName,
    getGridColumns
  }
}