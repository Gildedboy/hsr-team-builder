import { computed } from 'vue'
import type { Character } from '@/types/Character'

export function useCharacterGrouping(filteredCharacters: { value: Character[] }) {
  const charactersByRole = computed(() => {
    const filtered = filteredCharacters.value
    
    const dpsCharacters = filtered.filter(char => 
      char.mainArchetype === 'DPS' || char.mainArchetype === 'Break DPS' || char.mainArchetype === 'DoT'
    )
    
    const dpsCategories = {
      'Follow-up': dpsCharacters.filter(char => char.labels.some(label => label.includes('Follow-up'))),
      'DoT': dpsCharacters.filter(char => char.labels.some(label => label.includes('DoT')) || char.mainArchetype === 'DoT'),
      'Counter': dpsCharacters.filter(char => char.labels.some(label => label.includes('Counter'))),
      'Break': dpsCharacters.filter(char => char.labels.some(label => label.includes('Break')) || char.mainArchetype === 'Break DPS'),
      'Hypercarry': dpsCharacters.filter(char => char.labels.some(label => label.includes('Hypercarry'))),
      'AoE': dpsCharacters.filter(char => char.labels.some(label => label.includes('AoE'))),
      'HP Scaling': dpsCharacters.filter(char => char.labels.some(label => label.includes('HP Scaling'))),
      'Debuffer DPS': dpsCharacters.filter(char => char.labels.some(label => label.includes('Debuff'))),
      'Other DPS': dpsCharacters.filter(char => 
        !char.labels.some(label => 
          label.includes('Follow-up') || label.includes('DoT') || 
          label.includes('Counter') || label.includes('Break') || 
          label.includes('Hypercarry') || label.includes('AoE') || 
          label.includes('HP Scaling') || label.includes('Debuff')
        ) && char.mainArchetype !== 'DoT' && char.mainArchetype !== 'Break DPS'
      )
    }
    
    const supportCharacters = filtered.filter(char => 
      char.mainArchetype === 'Buffer' || char.mainArchetype === 'Debuff' || char.mainArchetype === 'Support'
    )
    
    const supportCategories = {
      'Buffer': supportCharacters.filter(char => char.mainArchetype === 'Buffer' || char.labels.some(label => label.includes('Buffer'))),
      'Debuffer': supportCharacters.filter(char => char.mainArchetype === 'Debuff' || char.labels.some(label => label.includes('Debuff'))),
      'Sub-DPS': supportCharacters.filter(char => char.labels.some(label => label.includes('Sub-DPS')) || char.mainArchetype === 'Support')
    }
    
    const sustainCharacters = filtered.filter(char => 
      char.mainArchetype === 'Healer' || char.mainArchetype === 'Shielder'
    )
    
    const sustainCategories = {
      'Healer': sustainCharacters.filter(char => char.mainArchetype === 'Healer'),
      'Shielder': sustainCharacters.filter(char => char.mainArchetype === 'Shielder')
    }
    
    const sortByRarityThenName = (a: Character, b: Character) => {
      if (a.rarity !== b.rarity) return b.rarity - a.rarity
      return a.name.localeCompare(b.name)
    }
    
    Object.values(dpsCategories).forEach(chars => chars.sort(sortByRarityThenName))
    Object.values(supportCategories).forEach(chars => chars.sort(sortByRarityThenName))
    Object.values(sustainCategories).forEach(chars => chars.sort(sortByRarityThenName))
    
    return {
      dps: dpsCategories,
      support: supportCategories,
      sustain: sustainCategories
    }
  })

  return { charactersByRole }
}