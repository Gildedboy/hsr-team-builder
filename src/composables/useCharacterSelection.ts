import { ref, computed } from 'vue'
import { characters } from '@/data/characters'
import type { Character } from '@/types/Character'

export function useCharacterSelection() {
  const selectedCharacter = ref<Character | null>(null)
  const hoveredCharacter = ref<Character | null>(null)
  const tooltipPosition = ref({ x: 0, y: 0 })

  const selectCharacter = (character: Character) => {
    selectedCharacter.value = character
  }

  const showTooltip = (character: Character, event: MouseEvent) => {
    hoveredCharacter.value = character
    tooltipPosition.value = { x: event.clientX, y: event.clientY }
  }

  const hideTooltip = () => {
    hoveredCharacter.value = null
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
    hoveredCharacter,
    tooltipPosition,
    selectCharacter,
    showTooltip,
    hideTooltip,
    isCharacterRecommended
  }
}