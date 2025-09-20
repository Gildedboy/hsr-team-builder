<template>
  <div class="card bg-dark border-primary h-100">
    <!-- No Data Message -->
    <div
      v-if="hasNoTeamData"
      class="card-body d-flex flex-column justify-content-center align-items-center text-center py-5"
    >
      <img
        src="/images/anime-satania.gif"
        alt="No data"
        class="mb-3"
        style="width: 120px; height: auto; border-radius: 8px"
      />
      <h3 class="text-primary mb-3">{{ character.name }}</h3>
      <p class="text-secondary mb-0">This character doesn't have enough data yet.</p>
      <p class="text-secondary small mt-2">
        Teammate recommendations and team compositions are being worked on.
      </p>
    </div>

    <!-- Regular Content -->
    <div v-else class="d-flex flex-column h-100">
      <div class="card-header text-center" style="padding-top: 10px">
        <h4 class="text-primary mb-0">Suggested Teammates for {{ character.name }}</h4>
      </div>

      <div class="card-body d-flex flex-column align-items-center p-3 flex-grow-1">
        <!-- Teammate Sections Tabs -->
        <div
          v-if="character.teammateRecommendations"
          class="d-flex gap-2 justify-content-center mb-3 flex-wrap"
        >
          <button
            v-for="section in character.teammateRecommendations"
            :key="section.name"
            class="btn btn-sm fw-semibold custom-tab px-2"
            :class="{ active: activeTeammateTab === section.name }"
            @click="activeTeammateTab = section.name"
          >
            {{ section.name }}
          </button>
        </div>

        <!-- Teammate Recommendations -->
        <div v-if="currentTeammateSection" class="w-100 mb-3 flex-grow-1">
          <div class="d-flex align-items-start justify-content-center gap-4 w-100">
            <RecommendationTier
              v-if="currentTeammateSection.bis.length > 0"
              tier="bis"
              :character-ids="currentTeammateSection.bis"
              :active-tab="activeTeammateTab"
              :characters="characters"
              @show-tooltip="showTooltip"
              @hide-tooltip="hideTooltip"
            />

            <RecommendationTier
              v-if="currentTeammateSection.generalist.length > 0"
              tier="generalist"
              :character-ids="currentTeammateSection.generalist"
              :active-tab="activeTeammateTab"
              :characters="characters"
              @show-tooltip="showTooltip"
              @hide-tooltip="hideTooltip"
            />

            <RecommendationTier
              v-if="currentTeammateSection.f2p.length > 0"
              tier="f2p"
              :character-ids="currentTeammateSection.f2p"
              :active-tab="activeTeammateTab"
              :characters="characters"
              @show-tooltip="showTooltip"
              @hide-tooltip="hideTooltip"
            />
          </div>
        </div>

        <!-- Separator Line -->
        <hr
          v-if="character.teamCompositions"
          class="w-100 border-primary opacity-50"
          style="margin: 1.5rem 0"
        />

        <!-- Team Compositions -->
        <div v-if="character.teamCompositions" class="w-100 flex-grow-1">
          <h4 class="text-center text-primary mb-3">Suggested Teams for {{ character.name }}</h4>

          <!-- Team Composition Tabs -->
          <div class="d-flex gap-2 justify-content-center mb-3 flex-wrap">
            <button
              v-for="team in character.teamCompositions"
              :key="team.name"
              class="btn btn-sm fw-semibold custom-tab px-3"
              :class="{ active: activeTeamTab === team.name }"
              @click="activeTeamTab = team.name"
            >
              {{ team.name }}
            </button>
          </div>

          <!-- Team Display -->
          <div
            v-if="currentTeamComposition"
            class="d-flex flex-column flex-lg-row justify-content-around gap-3 mb-3"
          >
            <div class="text-center">
              <h5 class="text-warning mb-2">BiS Team</h5>
              <div class="d-flex gap-1 gap-sm-2 justify-content-center flex-wrap">
                <div
                  v-for="charId in currentTeamComposition.bis.characters"
                  :key="charId"
                  class="team-character-item"
                  @mouseenter="showTooltip(charId, $event)"
                  @mouseleave="hideTooltip"
                >
                  <img
                    :src="getCharacterAvatar(charId)"
                    :alt="getCharacterName(charId)"
                    class="team-character-avatar"
                    @error="($event.target as HTMLImageElement).src = '/images/placeholder.svg'"
                  />
                </div>
              </div>
              <p v-if="currentTeamComposition.bis.description" class="text-muted small mt-2">
                {{ currentTeamComposition.bis.description }}
              </p>
            </div>

            <div v-if="currentTeamComposition.f2p" class="text-center">
              <h5 class="text-success mb-2">F2P Team</h5>
              <div class="d-flex gap-1 gap-sm-2 justify-content-center flex-wrap">
                <div
                  v-for="charId in currentTeamComposition.f2p.characters"
                  :key="charId"
                  class="team-character-item"
                  @mouseenter="showTooltip(charId, $event)"
                  @mouseleave="hideTooltip"
                >
                  <img
                    :src="getCharacterAvatar(charId)"
                    :alt="getCharacterName(charId)"
                    class="team-character-avatar"
                    @error="($event.target as HTMLImageElement).src = '/images/placeholder.svg'"
                  />
                </div>
              </div>
              <p v-if="currentTeamComposition.f2p.description" class="text-muted small mt-2">
                {{ currentTeamComposition.f2p.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CharacterTooltip :character="hoveredCharacter" :position="tooltipPosition" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Character } from '@hsr-team-builder/shared'
import { useTooltip } from '@/composables/useTooltip'
import { getCharacterAvatar } from '@/data/avatars'
import { useCharactersApi } from '@/composables/useCharactersApi'
import CharacterTooltip from './CharacterTooltip.vue'
import RecommendationTier from './RecommendationTier.vue'

interface Props {
  character: Character
}

const props = defineProps<Props>()

// Get characters from API
const { characters } = useCharactersApi()

const activeTeammateTab = ref(props.character.teammateRecommendations?.[0]?.name || '')
const activeTeamTab = ref(props.character.teamCompositions?.[0]?.name || '')

const currentTeammateSection = computed(() =>
  props.character.teammateRecommendations?.find(
    (section) => section.name === activeTeammateTab.value,
  ),
)

const currentTeamComposition = computed(() =>
  props.character.teamCompositions?.find((team) => team.name === activeTeamTab.value),
)

const hasNoTeamData = computed(() => {
  const hasNoTeammates = !props.character.teammateRecommendations || props.character.teammateRecommendations.length === 0
  const hasNoCompositions = !props.character.teamCompositions || props.character.teamCompositions.length === 0
  const result = hasNoTeammates && hasNoCompositions
  
  // Debug logging
  console.log('Character:', props.character.name)
  console.log('teammateRecommendations:', props.character.teammateRecommendations)
  console.log('teamCompositions:', props.character.teamCompositions)
  console.log('hasNoTeammates:', hasNoTeammates)
  console.log('hasNoCompositions:', hasNoCompositions)
  console.log('hasNoTeamData result:', result)
  
  return result
})

const { hoveredCharacter, tooltipPosition, showTooltip, hideTooltip } = useTooltip()

const getCharacterName = (characterId: string): string => {
  const char = characters.value.find((c) => c.id === characterId)
  return char?.name || characterId
}
</script>

<style scoped>
.custom-tab {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border: none !important;
}

.custom-tab.active {
  background-color: #00d4ff !important;
  color: black !important;
}

.team-character-item {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.team-character-avatar {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
}
</style>
