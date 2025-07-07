import { ref } from 'vue'
import { characters } from '@/data/characters'
import type { Character } from '@/types/Character'

export function useTooltip() {
  const hoveredCharacter = ref<Character | null>(null)
  const tooltipPosition = ref({ x: 0, y: 0 })

  const showTooltip = (characterId: string, event: MouseEvent) => {
    const character = characters.find(c => c.id === characterId)
    if (character) {
      hoveredCharacter.value = character
      const rect = (event.target as HTMLElement).getBoundingClientRect()
      tooltipPosition.value = { x: rect.left + rect.width / 2, y: rect.top }
    }
  }

  const hideTooltip = () => {
    hoveredCharacter.value = null
  }

  return {
    hoveredCharacter,
    tooltipPosition,
    showTooltip,
    hideTooltip
  }
}