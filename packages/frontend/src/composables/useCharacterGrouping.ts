import { computed } from 'vue'
import type { Character } from '@hsr-team-builder/shared'

export function useCharacterGrouping(filteredCharacters: { value: Character[] }, selectedArchetypes?: { value: string[] }) {
  const charactersByRole = computed(() => {
    const filtered = filteredCharacters.value
    
    // DPS Column - characters with role 'DPS' or 'SUB_DPS'
    const dpsCharacters = filtered.filter(char => 
      char.roles.includes('DPS') || char.roles.includes('SUB_DPS')
    )
    
    // Support Column - characters with role 'SUPPORT'
    const supportCharacters = filtered.filter(char => 
      char.roles.includes('SUPPORT')
    )
    
    // Sustain Column - characters with role 'SUSTAIN'
    const sustainCharacters = filtered.filter(char => 
      char.roles.includes('SUSTAIN')
    )
    
    // Group by archetype within each column
    const groupByArchetype = (characters: Character[]) => {
      const groups: { [key: string]: Character[] } = {}
      
      characters.forEach(char => {
        const archetypes = char.archetype || ['Other']
        
        // If archetype filters are active, only show characters in those subcategories
        const relevantArchetypes = selectedArchetypes?.value.length 
          ? archetypes.filter(archetype => selectedArchetypes.value.includes(archetype))
          : archetypes
        
        // Add character to each of their relevant archetype groups
        relevantArchetypes.forEach(archetype => {
          if (!groups[archetype]) {
            groups[archetype] = []
          }
          groups[archetype].push(char)
        })
      })
      
      return groups
    }
    
    const sortByRarityThenName = (a: Character, b: Character) => {
      if (a.rarity !== b.rarity) return b.rarity - a.rarity
      return a.name.localeCompare(b.name)
    }
    
    const dpsCategories = groupByArchetype(dpsCharacters)
    const supportCategories = groupByArchetype(supportCharacters)
    const sustainCategories = groupByArchetype(sustainCharacters)
    
    // Sort each category
    Object.values(dpsCategories).forEach(chars => chars.sort(sortByRarityThenName))
    Object.values(supportCategories).forEach(chars => chars.sort(sortByRarityThenName))
    Object.values(sustainCategories).forEach(chars => chars.sort(sortByRarityThenName))
    
    // Sort subcategories alphabetically
    const sortedDpsCategories = Object.keys(dpsCategories).sort().reduce((obj, key) => {
      obj[key] = dpsCategories[key]
      return obj
    }, {} as { [key: string]: Character[] })
    
    const sortedSupportCategories = Object.keys(supportCategories).sort().reduce((obj, key) => {
      obj[key] = supportCategories[key]
      return obj
    }, {} as { [key: string]: Character[] })
    
    const sortedSustainCategories = Object.keys(sustainCategories).sort().reduce((obj, key) => {
      obj[key] = sustainCategories[key]
      return obj
    }, {} as { [key: string]: Character[] })
    
    return {
      dps: sortedDpsCategories,
      support: sortedSupportCategories,
      sustain: sortedSustainCategories
    }
  })

  return { charactersByRole }
}