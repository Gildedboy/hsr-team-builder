import { ref, computed, watch, toRef } from 'vue'
import { characters } from '@/data/characters'
import type { Character } from '@/types/Character'

export function useTeamRecommendations(character: Character) {
  const characterRef = toRef(() => character)
  
  const activeTab = ref<'subDPS' | 'amplifier' | 'sustain'>(
    character.teamRecommendations?.requiresSubDPS ? 'subDPS' : 'amplifier'
  )

  const activeTeamTab = ref<'mainDPS' | 'subDPS'>('mainDPS')

  // Reset tab when character changes
  watch(characterRef, (newCharacter) => {
    activeTab.value = newCharacter.teamRecommendations?.requiresSubDPS ? 'subDPS' : 'amplifier'
    activeTeamTab.value = 'mainDPS'
  })

  const currentRecommendations = computed(() => {
    if (!characterRef.value.teamRecommendations) return null
    
    switch (activeTab.value) {
      case 'subDPS':
        return characterRef.value.teamRecommendations.subDPS
      case 'amplifier':
        return characterRef.value.teamRecommendations.amplifier
      case 'sustain':
        return characterRef.value.teamRecommendations.sustain
      default:
        return null
    }
  })

  const canBeSubDPS = computed(() => {
    return characterRef.value.labels.some(label => label.includes('Sub-DPS'))
  })

  const isF2PCharacter = (characterId: string): boolean => {
    const f2pFiveStars = ['yanqing', 'gepard', 'himeko', 'bronya', 'bailu', 'welt', 'clara']
    const trailblazers = ['destruction-trailblazer', 'fire-trailblazer', 'harmony-trailblazer', 'remembrance-trailblazer']
    
    // Check if it's a trailblazer variant
    if (trailblazers.includes(characterId)) return true
    
    // Check if it's a general banner 5-star
    if (f2pFiveStars.includes(characterId)) return true
    
    // Check if it's a 4-star (need to look up character data)
    const char = characters.find(c => c.id === characterId)
    return char?.rarity === 4 || false
  }

  const filterF2POptions = (characterIds: string[]): string[] => {
    return characterIds.filter(id => isF2PCharacter(id))
  }

  const sortByRarity = (characterIds: string[]): string[] => {
    return characterIds.sort((a, b) => {
      const charA = characters.find(c => c.id === a)
      const charB = characters.find(c => c.id === b)
      const rarityA = charA?.rarity || 0
      const rarityB = charB?.rarity || 0
      return rarityB - rarityA // 5-star first, then 4-star
    })
  }

  const getBisMainDPSTeam = computed(() => {
    if (!characterRef.value.teamRecommendations) return []
    const rec = characterRef.value.teamRecommendations
    const team = [characterRef.value.id]
    
    // If character requires sub-DPS, add sub-DPS first
    if (rec.requiresSubDPS && rec.subDPS) {
      const subDPS = rec.subDPS.bis[0] || rec.subDPS.generalist[0] || rec.subDPS.f2p[0]
      if (subDPS) team.push(subDPS)
      
      // Add 1 amplifier for dual-DPS teams
      const amplifier = rec.amplifier.bis[0] || rec.amplifier.generalist[0] || rec.amplifier.f2p[0]
      if (amplifier) team.push(amplifier)
    } else {
      // Add 2 amplifiers for hypercarry teams
      const allAmplifiers = [...rec.amplifier.bis, ...rec.amplifier.generalist, ...rec.amplifier.f2p]
      for (let i = 0; i < 2 && i < allAmplifiers.length; i++) {
        if (allAmplifiers[i]) team.push(allAmplifiers[i])
      }
    }
    
    // Add sustain
    const sustain = rec.sustain.bis[0] || rec.sustain.generalist[0] || rec.sustain.f2p[0]
    if (sustain) team.push(sustain)
    
    return team.slice(0, 4)
  })

  const getBisSubDPSTeam = computed(() => {
    if (!characterRef.value.teamRecommendations || !canBeSubDPS.value) return []
    const rec = characterRef.value.teamRecommendations
    
    // Find a main DPS from subDPS recommendations (reverse lookup)
    const allMainDPSOptions = [rec.subDPS?.bis[0], rec.subDPS?.generalist[0], rec.subDPS?.f2p[0]].filter((id): id is string => Boolean(id))
    const sortedMainDPS = sortByRarity(allMainDPSOptions)
    const mainDPS = sortedMainDPS[0] || 'castorice'
    const dpsTeam = sortByRarity([mainDPS, characterRef.value.id])
    const team = [...dpsTeam]
    
    // For sub-DPS: Prioritize dual-DPS friendly amplifiers
    const dualDPSAmplifiers = ['ruan-mei', 'tribbie']
    const allAmplifiers = sortByRarity([...rec.amplifier.bis, ...rec.amplifier.generalist, ...rec.amplifier.f2p])
    const dualDPSFriendly = sortByRarity(allAmplifiers.filter(id => dualDPSAmplifiers.includes(id)))
    const otherAmplifiers = sortByRarity(allAmplifiers.filter(id => !dualDPSAmplifiers.includes(id)))
    
    // Use dual-DPS amplifiers first, then others as fallback
    const prioritizedAmplifiers = [...dualDPSFriendly, ...otherAmplifiers]
    if (prioritizedAmplifiers[0]) team.push(prioritizedAmplifiers[0])
    
    // Add sustain
    const allSustainSorted = sortByRarity([...rec.sustain.bis, ...rec.sustain.generalist, ...rec.sustain.f2p])
    const sustain = allSustainSorted[0]
    if (sustain) team.push(sustain)
    
    return team.slice(0, 4)
  })

  const getF2pMainDPSTeam = computed(() => {
    if (!characterRef.value.teamRecommendations) return []
    const rec = characterRef.value.teamRecommendations
    const team = [characterRef.value.id]
    
    // Get F2P options for all roles
    const allAmplifiers = [...rec.amplifier.f2p, ...rec.amplifier.generalist, ...rec.amplifier.bis]
    const f2pAmplifiers = filterF2POptions(allAmplifiers)
    const allSustain = [...rec.sustain.f2p, ...rec.sustain.generalist, ...rec.sustain.bis]
    const f2pSustain = filterF2POptions(allSustain)
    
    // If character requires sub-DPS, add F2P sub-DPS first
    if (rec.requiresSubDPS && rec.subDPS) {
      const allSubDPS = [...rec.subDPS.f2p, ...rec.subDPS.generalist, ...rec.subDPS.bis]
      const f2pSubDPS = filterF2POptions(allSubDPS)
      const subDPS = f2pSubDPS[0]
      if (subDPS) team.push(subDPS)
      
      // Add 1 F2P amplifier for dual-DPS teams
      if (f2pAmplifiers[0]) team.push(f2pAmplifiers[0])
    } else {
      // Add 2 F2P amplifiers for hypercarry teams
      for (let i = 0; i < 2 && i < f2pAmplifiers.length; i++) {
        if (f2pAmplifiers[i]) team.push(f2pAmplifiers[i])
      }
    }
    
    // Add F2P sustain
    if (f2pSustain[0]) team.push(f2pSustain[0])
    
    return team.slice(0, 4)
  })

  const getF2pSubDPSTeam = computed(() => {
    if (!characterRef.value.teamRecommendations || !canBeSubDPS.value) return []
    const rec = characterRef.value.teamRecommendations
    
    // Find a F2P main DPS from subDPS recommendations (reverse lookup)
    const allMainDPS = [rec.subDPS?.f2p[0], rec.subDPS?.generalist[0], rec.subDPS?.bis[0]].filter((id): id is string => Boolean(id))
    const f2pMainDPS = sortByRarity(filterF2POptions(allMainDPS))
    const mainDPS = f2pMainDPS[0] || 'castorice' // fallback to castorice if no F2P main DPS
    const dpsTeam = sortByRarity([mainDPS, characterRef.value.id])
    const team = [...dpsTeam]
    
    // Filter amplifiers to only F2P options
    const allAmplifiers = [...rec.amplifier.f2p, ...rec.amplifier.generalist, ...rec.amplifier.bis]
    const f2pAmplifiers = sortByRarity(filterF2POptions(allAmplifiers))
    
    // For sub-DPS: Prioritize dual-DPS friendly amplifiers
    const dualDPSAmplifiers = ['ruan-mei', 'tribbie']
    const dualDPSFriendly = sortByRarity(f2pAmplifiers.filter(id => dualDPSAmplifiers.includes(id)))
    const otherAmplifiers = sortByRarity(f2pAmplifiers.filter(id => !dualDPSAmplifiers.includes(id)))
    
    // Use dual-DPS amplifiers first, then others as fallback
    const prioritizedAmplifiers = [...dualDPSFriendly, ...otherAmplifiers]
    if (prioritizedAmplifiers[0]) team.push(prioritizedAmplifiers[0])
    
    // Add F2P sustain
    const allSustain = [...rec.sustain.f2p, ...rec.sustain.generalist, ...rec.sustain.bis]
    const f2pSustain = sortByRarity(filterF2POptions(allSustain))
    const sustain = f2pSustain[0]
    if (sustain) team.push(sustain)
    
    return team.slice(0, 4)
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
    activeTeamTab,
    currentRecommendations,
    canBeSubDPS,
    getBisMainDPSTeam,
    getBisSubDPSTeam,
    getF2pMainDPSTeam,
    getF2pSubDPSTeam,
    getCharacterName,
    getGridColumns
  }
}