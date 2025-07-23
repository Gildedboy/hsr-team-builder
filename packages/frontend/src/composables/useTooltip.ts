import { ref } from 'vue'
import { useCharactersApi } from '@/composables/useCharactersApi'
import type { Character } from '@hsr-team-builder/shared'

export function useTooltip() {
  const hoveredCharacter = ref<Character | null>(null)
  const tooltipPosition = ref({ x: 0, y: 0 })

  // Get characters from API
  const { characters } = useCharactersApi()

  // Detect if device supports touch (mobile/tablet)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  const showTooltip = (characterId: string, event: MouseEvent) => {
    // Don't show tooltips on touch devices
    if (isTouchDevice) return
    const character = characters.value.find((c) => c.id === characterId)
    if (character) {
      hoveredCharacter.value = character

      // Use requestAnimationFrame to batch DOM reads
      requestAnimationFrame(() => {
        const rect = (event.target as HTMLElement).getBoundingClientRect()

        const tooltipWidth = 320
        const margin = 12

        // Center tooltip horizontally relative to the character avatar
        let x = rect.left + rect.width / 2 - tooltipWidth / 2

        // Determine if we have enough space below for the tooltip
        const estimatedTooltipHeight = 160 // Conservative estimate
        const spaceBelow = window.innerHeight - rect.bottom
        const spaceAbove = rect.top

        let y: number

        if (spaceBelow >= estimatedTooltipHeight + margin) {
          // Enough space below - show below the avatar
          y = rect.bottom + margin
        } else if (spaceAbove >= estimatedTooltipHeight + margin) {
          // Not enough space below but enough above - show above
          y = rect.top - estimatedTooltipHeight - margin
        } else {
          // Not enough space in either direction - show below anyway but closer
          y = rect.bottom + 8
        }

        // Adjust horizontal position to keep tooltip within viewport
        if (x + tooltipWidth > window.innerWidth - margin) {
          x = window.innerWidth - tooltipWidth - margin
        } else if (x < margin) {
          x = margin
        }

        // Final boundary check for vertical position
        if (y < margin) {
          y = margin
        } else if (y + estimatedTooltipHeight > window.innerHeight - margin) {
          y = Math.max(margin, window.innerHeight - estimatedTooltipHeight - margin)
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
    hideTooltip,
  }
}
