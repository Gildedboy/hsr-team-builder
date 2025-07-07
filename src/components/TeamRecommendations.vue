<template>
  <div v-if="character.teamRecommendations" class="team-recommendations">
    <h2 class="title">Recommended Teammates for {{ character.name }}</h2>
    
    <!-- Role Tabs -->
    <div class="tabs">
      <button
        v-if="character.teamRecommendations.requiresSubDPS"
        class="tab"
        :class="{ active: activeTab === 'subDPS' }"
        @click="activeTab = 'subDPS'"
      >
        Sub DPS
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'bufferDebuffer' }"
        @click="activeTab = 'bufferDebuffer'"
      >
        Buffer/Debuffer
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'sustain' }"
        @click="activeTab = 'sustain'"
      >
        Sustain
      </button>
    </div>

    <!-- Recommendation Tiers -->
    <div v-if="currentRecommendations" class="recommendations" :style="{ gridTemplateColumns: getGridColumns() }">
      <!-- BiS -->
      <div v-if="currentRecommendations.bis.length > 0" class="tier">
        <h3 class="tier-title bis">Best in Slot (BiS)</h3>
        <div class="character-grid">
          <div 
            v-for="characterId in currentRecommendations.bis"
            :key="characterId"
            class="character-item"
          >
            <img 
              :src="getCharacterAvatar(characterId)" 
              :alt="getCharacterName(characterId)" 
              class="character-avatar bis-border"
              @error="$event.target.src = '/images/placeholder.svg'"
              @mouseenter="showTooltip(characterId, $event)"
              @mouseleave="hideTooltip"
            />
            <div class="character-name">{{ getCharacterName(characterId) }}</div>
          </div>
        </div>
      </div>

      <!-- Generalist -->
      <div v-if="currentRecommendations.generalist.length > 0" class="tier">
        <h3 class="tier-title generalist">Generalist</h3>
        <div class="character-grid">
          <div 
            v-for="characterId in currentRecommendations.generalist"
            :key="characterId"
            class="character-item"
          >
            <img 
              :src="getCharacterAvatar(characterId)" 
              :alt="getCharacterName(characterId)" 
              class="character-avatar generalist-border"
              @error="$event.target.src = '/images/placeholder.svg'"
              @mouseenter="showTooltip(characterId, $event)"
              @mouseleave="hideTooltip"
            />
            <div class="character-name">{{ getCharacterName(characterId) }}</div>
          </div>
        </div>
      </div>

      <!-- F2P -->
      <div v-if="currentRecommendations.f2p.length > 0 || (activeTab === 'sustain' && character.teamRecommendations.anySustainAvailable === false)" class="tier">
        <h3 class="tier-title f2p">F2P Options</h3>
        <div v-if="activeTab === 'sustain' && character.teamRecommendations.anySustainAvailable === false" class="no-options">
          No F2P sustain options available
        </div>
        <div v-else class="character-grid">
          <div 
            v-for="characterId in currentRecommendations.f2p"
            :key="characterId"
            class="character-item"
          >
            <img 
              :src="getCharacterAvatar(characterId)" 
              :alt="getCharacterName(characterId)" 
              class="character-avatar f2p-border"
              @error="$event.target.src = '/images/placeholder.svg'"
              @mouseenter="showTooltip(characterId, $event)"
              @mouseleave="hideTooltip"
            />
            <div class="character-name">{{ getCharacterName(characterId) }}</div>
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
.team-recommendations {
  background: v-bind('COLORS.bgPrimary');
  padding: 20px;
  border-radius: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.title {
  color: v-bind('COLORS.primary');
  margin-bottom: 20px;
  font-size: 24px;
  margin: 0 0 20px 0;
  font-weight: 600;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 50px;
}

.tab {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.tab.active {
  background: v-bind('COLORS.primary');
  color: black;
}

.recommendations {
  display: flex;
  gap: 15px;
  flex: 1;
  overflow-y: auto;
  justify-content: space-between;
}

.tier {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.tier-title {
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: 600;
}

.tier-title.bis {
  color: v-bind('COLORS.bis');
}

.tier-title.generalist {
  color: v-bind('COLORS.generalist');
}

.tier-title.f2p {
  color: v-bind('COLORS.f2p');
}

.character-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  flex: 1;
}

.character-item {
  text-align: center;
}

.character-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid;
  cursor: pointer;
  margin-bottom: 4px;
}

.bis-border {
  border-color: v-bind('COLORS.bis');
}

.generalist-border {
  border-color: v-bind('COLORS.generalist');
}

.f2p-border {
  border-color: v-bind('COLORS.f2p');
}

.character-name {
  color: white;
  font-size: 11px;
  font-weight: 500;
}

.no-options {
  color: v-bind('COLORS.warning');
  font-size: 12px;
  padding: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>