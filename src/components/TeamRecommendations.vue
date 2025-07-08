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
        <!-- BiS -->
        <div class="text-center" style="flex: 1;">
          <h3 v-if="currentRecommendations.bis.length > 0" class="h5 fw-bold mb-2" style="color: #ffd700;">BiS - Best in Slot</h3>
          <div v-if="currentRecommendations.bis.length > 0" class="d-flex flex-wrap gap-2 justify-content-center">
            <div 
              v-for="characterId in currentRecommendations.bis"
              :key="characterId"
              class="text-center"
            >
              <img 
                :src="getCharacterAvatar(characterId)" 
                :alt="getCharacterName(characterId)" 
                class="rounded-circle border border-3 cursor-pointer mb-1"
                style="width: 80px; height: 80px; border-color: #ffd700 !important;"
                @error="$event.target.src = '/images/placeholder.svg'"
                @mouseenter="showTooltip(characterId, $event)"
                @mouseleave="hideTooltip"
              />
              <div class="text-white small fw-medium">{{ getCharacterName(characterId) }}</div>
            </div>
          </div>
        </div>

        <!-- Generalist -->
        <div class="text-center" style="flex: 1;">
          <h3 v-if="currentRecommendations.generalist.length > 0" class="h5 fw-bold mb-2" :style="{ color: COLORS.generalist }">Generalist</h3>
          <div v-if="currentRecommendations.generalist.length > 0" class="d-flex flex-wrap gap-2 justify-content-center">
            <div 
              v-for="characterId in currentRecommendations.generalist"
              :key="characterId"
              class="text-center"
            >
              <img 
                :src="getCharacterAvatar(characterId)" 
                :alt="getCharacterName(characterId)" 
                class="rounded-circle border border-3 cursor-pointer mb-1"
                :style="{ width: '80px', height: '80px', borderColor: COLORS.generalist + ' !important' }"
                @error="$event.target.src = '/images/placeholder.svg'"
                @mouseenter="showTooltip(characterId, $event)"
                @mouseleave="hideTooltip"
              />
              <div class="text-white small fw-medium">{{ getCharacterName(characterId) }}</div>
            </div>
          </div>
        </div>

        <!-- F2P -->
        <div class="text-center" style="flex: 1;">
          <h3 v-if="currentRecommendations.f2p.length > 0 || (activeTab === 'sustain' && character.teamRecommendations.anySustainAvailable === false)" class="h5 fw-bold mb-2" style="color: #2ecc71;">F2P Options</h3>
          <div v-if="activeTab === 'sustain' && character.teamRecommendations.anySustainAvailable === false" class="text-warning small p-3">
            No F2P sustain options available
          </div>
          <div v-else class="d-flex flex-wrap gap-2 justify-content-center">
            <div 
              v-for="characterId in currentRecommendations.f2p"
              :key="characterId"
              class="text-center"
            >
              <img 
                :src="getCharacterAvatar(characterId)" 
                :alt="getCharacterName(characterId)" 
                class="rounded-circle border border-3 cursor-pointer mb-2"
                style="width: 80px; height: 80px; border-color: #2ecc71 !important;"
                @error="$event.target.src = '/images/placeholder.svg'"
                @mouseenter="showTooltip(characterId, $event)"
                @mouseleave="hideTooltip"
              />
              <div class="text-white small fw-medium">{{ getCharacterName(characterId) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <CharacterTooltip :character="hoveredCharacter" :position="tooltipPosition" />
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/types/Character'
import { getCharacterAvatar } from '@/data/avatars'
import { useTeamRecommendations } from '@/composables/useTeamRecommendations'
import { useTooltip } from '@/composables/useTooltip'
import { COLORS } from '@/constants/design'
import CharacterTooltip from './CharacterTooltip.vue'

interface Props {
  character: Character
}

const props = defineProps<Props>()

const { activeTab, currentRecommendations, getCharacterName, getGridColumns } = useTeamRecommendations(props.character)
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