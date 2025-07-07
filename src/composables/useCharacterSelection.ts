import { ref } from 'vue'
import type { Character } from '@/types/Character'

export function useCharacterSelection() {
  const selectedCharacter = ref<Character | null>(null)

  const selectCharacter = (character: Character) => {
    selectedCharacter.value = character
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
    
    rec.bufferDebuffer.bis.forEach(id => allRecommended.add(id))
    rec.bufferDebuffer.generalist.forEach(id => allRecommended.add(id))
    rec.bufferDebuffer.f2p.forEach(id => allRecommended.add(id))
    
    rec.sustain.bis.forEach(id => allRecommended.add(id))
    rec.sustain.generalist.forEach(id => allRecommended.add(id))
    rec.sustain.f2p.forEach(id => allRecommended.add(id))
    
    return allRecommended.has(charId)
  }

  return {
    selectedCharacter,
    selectCharacter,
    isCharacterRecommended
  }
}