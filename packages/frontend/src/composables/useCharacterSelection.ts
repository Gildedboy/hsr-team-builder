import { ref } from 'vue'
import type { Character } from '@hsr-team-builder/shared'

export function useCharacterSelection() {
  const selectedCharacter = ref<Character | null>(null)

  const selectCharacter = (character: Character, shouldToggle: boolean = true) => {
    if (shouldToggle && selectedCharacter.value?.id === character.id) {
      selectedCharacter.value = null
    } else {
      selectedCharacter.value = character
    }
  }

  const clearSelection = () => {
    selectedCharacter.value = null
  }

  const isCharacterRecommended = (selectedChar: Character, charId: string): boolean => {
    if (!selectedChar.teammateRecommendations) return false
    
    const allRecommended = new Set<string>()
    
    selectedChar.teammateRecommendations.forEach(section => {
      section.bis.forEach(id => allRecommended.add(id))
      section.generalist.forEach(id => allRecommended.add(id))
      section.f2p.forEach(id => allRecommended.add(id))
    })
    
    return allRecommended.has(charId)
  }

  const getRecommendationTier = (selectedChar: Character, charId: string): 'bis' | 'generalist' | 'f2p' | null => {
    if (!selectedChar.teammateRecommendations) return null
    
    // Check BiS first (highest priority)
    for (const section of selectedChar.teammateRecommendations) {
      if (section.bis.includes(charId)) return 'bis'
    }
    
    // Check Generalist
    for (const section of selectedChar.teammateRecommendations) {
      if (section.generalist.includes(charId)) return 'generalist'
    }
    
    // Check F2P
    for (const section of selectedChar.teammateRecommendations) {
      if (section.f2p.includes(charId)) return 'f2p'
    }
    
    return null
  }

  return {
    selectedCharacter,
    selectCharacter,
    clearSelection,
    isCharacterRecommended,
    getRecommendationTier
  }
}