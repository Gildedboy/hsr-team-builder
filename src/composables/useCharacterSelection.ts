import { ref } from 'vue'
import type { Character } from '@/types/Character'

export function useCharacterSelection() {
  const selectedCharacter = ref<Character | null>(null)

  const selectCharacter = (character: Character, shouldToggle: boolean = true) => {
    if (shouldToggle) {
      selectedCharacter.value = selectedCharacter.value?.id === character.id ? null : character
    } else {
      selectedCharacter.value = character
    }
  }

  const isCharacterRecommended = (selectedChar: Character, charId: string): boolean => {
    if (!selectedChar.teamRecommendations) return false
    
    const rec = selectedChar.teamRecommendations
    const allRecommended = new Set<string>()
    
    if (rec.subDPS) {
      rec.subDPS.bis.forEach(id => allRecommended.add(id))
      rec.subDPS.generalist.forEach(id => allRecommended.add(id))
      rec.subDPS.f2p.forEach(id => allRecommended.add(id))
    }
    
    rec.amplifier.bis.forEach(id => allRecommended.add(id))
    rec.amplifier.generalist.forEach(id => allRecommended.add(id))
    rec.amplifier.f2p.forEach(id => allRecommended.add(id))
    
    rec.sustain.bis.forEach(id => allRecommended.add(id))
    rec.sustain.generalist.forEach(id => allRecommended.add(id))
    rec.sustain.f2p.forEach(id => allRecommended.add(id))
    
    return allRecommended.has(charId)
  }

  const getRecommendationTier = (selectedChar: Character, charId: string): 'bis' | 'generalist' | 'f2p' | null => {
    if (!selectedChar.teamRecommendations) return null
    
    const rec = selectedChar.teamRecommendations
    
    // Check BiS first (highest priority)
    if (rec.subDPS?.bis.includes(charId) || rec.amplifier.bis.includes(charId) || rec.sustain.bis.includes(charId)) {
      return 'bis'
    }
    
    // Check Generalist
    if (rec.subDPS?.generalist.includes(charId) || rec.amplifier.generalist.includes(charId) || rec.sustain.generalist.includes(charId)) {
      return 'generalist'
    }
    
    // Check F2P
    if (rec.subDPS?.f2p.includes(charId) || rec.amplifier.f2p.includes(charId) || rec.sustain.f2p.includes(charId)) {
      return 'f2p'
    }
    
    return null
  }

  return {
    selectedCharacter,
    selectCharacter,
    isCharacterRecommended,
    getRecommendationTier
  }
}