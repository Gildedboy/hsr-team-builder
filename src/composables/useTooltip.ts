import { ref } from 'vue'
import { characters } from '@/data/characters'
import type { Character } from '@/types/Character'

export function useTooltip() {
  const hoveredCharacter = ref<Character | null>(null)
  const tooltipPosition = ref({ x: 0, y: 0 })

  // Detect if device supports touch (mobile/tablet)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  const showTooltip = (characterId: string, event: MouseEvent) => {
    // Don't show tooltips on touch devices
    if (isTouchDevice) return
    const character = characters.find(c => c.id === characterId)
    if (character) {
      hoveredCharacter.value = character
      
      // Use requestAnimationFrame to batch DOM reads
      requestAnimationFrame(() => {
        const rect = (event.target as HTMLElement).getBoundingClientRect()
        
        const tooltipWidth = 320
        const tooltipHeight = 200
        const margin = 10
        
        let x = rect.left + rect.width / 2
        let y = rect.top
        
        // Adjust horizontal position
        if (x + tooltipWidth / 2 > window.innerWidth - margin) {
          x = window.innerWidth - tooltipWidth - margin
        } else if (x - tooltipWidth / 2 < margin) {
          x = margin + tooltipWidth / 2
        }
        
        // Adjust vertical position
        if (y - tooltipHeight < margin) {
          y = rect.bottom + margin
        } else {
          y = y - margin
        }
        
        tooltipPosition.value = { x, y }
      })
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