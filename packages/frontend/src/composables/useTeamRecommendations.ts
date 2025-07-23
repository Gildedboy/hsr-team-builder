import { ref, computed, watch, toRef } from 'vue'
import { useCharactersApi } from '@/composables/useCharactersApi'
import type { Character } from '@/types/Character'

export function useTeamRecommendations(character: Character) {
  const characterRef = toRef(() => character)

  // Get characters from API
  const { characters } = useCharactersApi()

  const activeTab = ref<string>(character.teammateRecommendations?.[0]?.name || 'teammates')

  const activeTeamTab = ref<string>(character.teamCompositions?.[0]?.name || 'team')

  // Reset tab when character changes
  watch(characterRef, (newCharacter) => {
    activeTab.value = newCharacter.teammateRecommendations?.[0]?.name || 'teammates'
    activeTeamTab.value = newCharacter.teamCompositions?.[0]?.name || 'team'
  })

  const currentRecommendations = computed(() => {
    if (!characterRef.value.teammateRecommendations) return null
    return characterRef.value.teammateRecommendations.find(
      (section) => section.name === activeTab.value,
    )
  })

  const currentTeamComposition = computed(() => {
    if (!characterRef.value.teamCompositions) return null
    return characterRef.value.teamCompositions.find((team) => team.name === activeTeamTab.value)
  })

  const getCharacterName = (characterId: string): string => {
    const char = characters.value.find((c) => c.id === characterId)
    return char?.name || characterId
  }

  return {
    activeTab,
    activeTeamTab,
    currentRecommendations,
    currentTeamComposition,
    getCharacterName,
    teammateRecommendations: characterRef.value.teammateRecommendations || [],
    teamCompositions: characterRef.value.teamCompositions || [],
  }
}
