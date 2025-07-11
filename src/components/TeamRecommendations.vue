<template>
  <div v-if="character.teammateRecommendations || character.teamCompositions" class="card bg-dark border-primary h-100">
    <div class="card-header text-center">
      <h2 class="h4 text-primary mb-0">Suggested Teammates for {{ character.name }}</h2>
    </div>
    
    <div class="card-body d-flex flex-column align-items-center p-2">
      <!-- Teammate Sections Tabs -->
      <div v-if="character.teammateRecommendations" class="d-flex gap-2 justify-content-center mb-2 flex-wrap">
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
      <div v-if="currentTeammateSection" class="w-100 mb-3">
        <div class="d-flex align-items-start w-100">
          <RecommendationTier
            tier="bis"
            :character-ids="currentTeammateSection.bis"
            :active-tab="activeTeammateTab"
            @show-tooltip="showTooltip"
            @hide-tooltip="hideTooltip"
          />
          
          <RecommendationTier
            tier="generalist"
            :character-ids="currentTeammateSection.generalist"
            :active-tab="activeTeammateTab"
            @show-tooltip="showTooltip"
            @hide-tooltip="hideTooltip"
          />
          
          <RecommendationTier
            tier="f2p"
            :character-ids="currentTeammateSection.f2p"
            :active-tab="activeTeammateTab"
            @show-tooltip="showTooltip"
            @hide-tooltip="hideTooltip"
          />
        </div>
      </div>

      <!-- Team Compositions -->
      <div v-if="character.teamCompositions" class="w-100" style="margin-top: 2rem;">
        <h4 class="text-center text-primary mb-2">Suggested Teams for {{ character.name }}</h4>
        
        <!-- Team Composition Tabs -->
        <div class="d-flex gap-2 justify-content-center mb-2 flex-wrap">
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
        <div v-if="currentTeamComposition" class="d-flex flex-column flex-lg-row justify-content-around gap-3">
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

          <div class="text-center">
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Character } from '@/types/Character'
import { useTooltip } from '@/composables/useTooltip'
import { getCharacterAvatar } from '@/data/avatars'
import { characters } from '@/data/characters'
import CharacterTooltip from './CharacterTooltip.vue'
import RecommendationTier from './RecommendationTier.vue'

interface Props {
  character: Character
}

const props = defineProps<Props>()

const activeTeammateTab = ref(props.character.teammateRecommendations?.[0]?.name || '')
const activeTeamTab = ref(props.character.teamCompositions?.[0]?.name || '')

const currentTeammateSection = computed(() => 
  props.character.teammateRecommendations?.find(section => section.name === activeTeammateTab.value)
)

const currentTeamComposition = computed(() =>
  props.character.teamCompositions?.find(team => team.name === activeTeamTab.value)
)

const { hoveredCharacter, tooltipPosition, showTooltip, hideTooltip } = useTooltip()

const getCharacterName = (characterId: string): string => {
  const char = characters.find(c => c.id === characterId)
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