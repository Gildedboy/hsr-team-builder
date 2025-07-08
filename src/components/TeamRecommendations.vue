<template>
  <div v-if="character.teamRecommendations" class="card bg-dark border-primary h-100">
    <div class="card-header text-center">
      <h2 class="h4 text-primary mb-0">Recommended Teammates for {{ character.name }}</h2>
    </div>
    
    <div class="card-body d-flex flex-column align-items-center p-2" style="padding-top: 20px;">
      <!-- Role Tabs -->
      <div class="d-flex gap-2 justify-content-center" style="padding-top: 30px; margin-bottom: 100px;">
        <button
          v-if="character.teamRecommendations.requiresSubDPS"
          class="btn btn-sm fw-semibold custom-tab px-2"
          :class="{ active: activeTab === 'subDPS' }"
          @click="activeTab = 'subDPS'"
        >
          Sub DPS
        </button>
        <button
          class="btn btn-sm fw-semibold custom-tab px-2"
          :class="{ active: activeTab === 'bufferDebuffer' }"
          @click="activeTab = 'bufferDebuffer'"
        >
          Buffer/Debuffer
        </button>
        <button
          class="btn btn-sm fw-semibold custom-tab px-2"
          :class="{ active: activeTab === 'sustain' }"
          @click="activeTab = 'sustain'"
        >
          Sustain
        </button>
      </div>

      <!-- Recommendation Tiers -->
      <div v-if="currentRecommendations" class="d-flex align-items-start w-100">
        <RecommendationTier
          tier="bis"
          :character-ids="currentRecommendations.bis"
          :active-tab="activeTab"
          @show-tooltip="showTooltip"
          @hide-tooltip="hideTooltip"
        />
        
        <RecommendationTier
          tier="generalist"
          :character-ids="currentRecommendations.generalist"
          :active-tab="activeTab"
          @show-tooltip="showTooltip"
          @hide-tooltip="hideTooltip"
        />
        
        <RecommendationTier
          tier="f2p"
          :character-ids="currentRecommendations.f2p"
          :active-tab="activeTab"
          :no-sustain-available="character.teamRecommendations?.anySustainAvailable === false"
          @show-tooltip="showTooltip"
          @hide-tooltip="hideTooltip"
        />
      </div>
    </div>
    
    <CharacterTooltip :character="hoveredCharacter" :position="tooltipPosition" />
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/types/Character'
import { useTeamRecommendations } from '@/composables/useTeamRecommendations'
import { useTooltip } from '@/composables/useTooltip'
import CharacterTooltip from './CharacterTooltip.vue'
import RecommendationTier from './RecommendationTier.vue'

interface Props {
  character: Character
}

const props = defineProps<Props>()

const { activeTab, currentRecommendations } = useTeamRecommendations(props.character)
const { hoveredCharacter, tooltipPosition, showTooltip, hideTooltip } = useTooltip()
</script>

<style scoped>
/* Custom tab styling for team recommendations */
.custom-tab {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border: none !important;
}

.custom-tab.active {
  background-color: #00d4ff !important;
  color: black !important;
}

.cursor-pointer {
  cursor: pointer;
}
</style>