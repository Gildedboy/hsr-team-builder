import { ref, computed } from 'vue'
import { characters } from '@/data/characters'
import type { Character } from '@/types/Character'

export function useTeamRecommendations(character: Character) {
  const activeTab = ref<'subDPS' | 'bufferDebuffer' | 'sustain'>(
    character.teamRecommendations?.requiresSubDPS ? 'subDPS' : 'bufferDebuffer'
  )

  const currentRecommendations = computed(() => {
    if (!character.teamRecommendations) return null
    
    switch (activeTab.value) {
      case 'subDPS':
        return character.teamRecommendations.subDPS
      case 'bufferDebuffer':
        return character.teamRecommendations.bufferDebuffer
      case 'sustain':
        return character.teamRecommendations.sustain
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