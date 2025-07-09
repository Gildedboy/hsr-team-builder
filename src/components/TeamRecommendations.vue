<template>
  <div v-if="character.teamRecommendations" class="card bg-dark border-primary h-100">
    <div class="card-header text-center">
      <h2 class="h4 text-primary mb-0">Recommended Teammates for {{ character.name }}</h2>
    </div>
    
    <div class="card-body d-flex flex-column align-items-center p-2">
      <!-- Role Tabs -->
      <div class="d-flex gap-2 justify-content-center mb-2">
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
          :class="{ active: activeTab === 'amplifier' }"
          @click="activeTab = 'amplifier'"
        >
          Amplifier
        </button>
        <button
          class="btn btn-sm fw-semibold custom-tab px-2"
          :class="{ active: activeTab === 'sustain' }"
          @click="activeTab = 'sustain'"
        >
          Sustain
        </button>
      </div>

      <!-- Content Area -->
      <div class="w-100">
        <!-- Recommendation Tiers -->
        <div v-if="currentRecommendations" class="d-flex align-items-start w-100 mb-3">
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

        <!-- Team Compositions -->
        <div class="w-100" style="margin-top: 3.5rem;">
          <h4 class="text-center text-primary mb-2">Recommended Teams for {{ character.name }}</h4>
          <!-- Team Role Tabs -->
          <div class="d-flex gap-2 justify-content-center mb-2">
            <button
              class="btn btn-sm fw-semibold custom-tab px-3"
              :class="{ active: activeTeamTab === 'mainDPS' }"
              @click="activeTeamTab = 'mainDPS'"
            >
              Main DPS
            </button>
            <button
              v-if="canBeSubDPS"
              class="btn btn-sm fw-semibold custom-tab px-3"
              :class="{ active: activeTeamTab === 'subDPS' }"
              @click="activeTeamTab = 'subDPS'"
            >
              Sub-DPS
            </button>
          </div>

          <!-- Main DPS Teams -->
          <div v-if="activeTeamTab === 'mainDPS'" class="d-flex justify-content-around gap-4">
            <div class="text-center">
              <h5 class="text-warning mb-3">BiS Team</h5>
              <div class="d-flex gap-2 justify-content-center">
                <div
                  v-for="charId in getBisMainDPSTeam"
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
                  <div class="team-character-name">{{ getCharacterName(charId) }}</div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <h5 class="text-success mb-3">F2P Team</h5>
              <div class="d-flex gap-2 justify-content-center">
                <div
                  v-for="charId in getF2pMainDPSTeam"
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
                  <div class="team-character-name">{{ getCharacterName(charId) }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sub-DPS Teams -->
          <div v-if="activeTeamTab === 'subDPS' && canBeSubDPS" class="d-flex justify-content-around gap-4">
            <div class="text-center">
              <h5 class="text-warning mb-3">BiS Team</h5>
              <div class="d-flex gap-2 justify-content-center">
                <div
                  v-for="charId in getBisSubDPSTeam"
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
                  <div class="team-character-name">{{ getCharacterName(charId) }}</div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <h5 class="text-success mb-3">F2P Team</h5>
              <div class="d-flex gap-2 justify-content-center">
                <div
                  v-for="charId in getF2pSubDPSTeam"
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
                  <div class="team-character-name">{{ getCharacterName(charId) }}</div>
                </div>
              </div>
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
import { useTeamRecommendations } from '@/composables/useTeamRecommendations'
import { useTooltip } from '@/composables/useTooltip'
import { getCharacterAvatar } from '@/data/avatars'
import CharacterTooltip from './CharacterTooltip.vue'
import RecommendationTier from './RecommendationTier.vue'

interface Props {
  character: Character
}

const props = defineProps<Props>()

const { activeTab, activeTeamTab, currentRecommendations, canBeSubDPS, getBisMainDPSTeam, getBisSubDPSTeam, getF2pMainDPSTeam, getF2pSubDPSTeam, getCharacterName } = useTeamRecommendations(props.character)
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

.team-character-item {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.team-character-avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
}

.team-character-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  font-size: 9px;
  padding: 2px;
  text-align: center;
  font-weight: 500;
}
</style>