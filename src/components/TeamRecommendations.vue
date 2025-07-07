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
            @mouseenter="showTooltip(characterId, $event)"
            @mouseleave="hideTooltip"
          >
            <img 
              :src="getCharacterAvatar(characterId)" 
              :alt="getCharacterName(characterId)" 
              class="character-avatar bis-border"
              @error="$event.target.src = '/images/placeholder.svg'"
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
            @mouseenter="showTooltip(characterId, $event)"
            @mouseleave="hideTooltip"
          >
            <img 
              :src="getCharacterAvatar(characterId)" 
              :alt="getCharacterName(characterId)" 
              class="character-avatar generalist-border"
              @error="$event.target.src = '/images/placeholder.svg'"
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
            @mouseenter="showTooltip(characterId, $event)"
            @mouseleave="hideTooltip"
          >
            <img 
              :src="getCharacterAvatar(characterId)" 
              :alt="getCharacterName(characterId)" 
              class="character-avatar f2p-border"
              @error="$event.target.src = '/images/placeholder.svg'"
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
  background: rgba(255, 255, 255, 0.05);
  padding: 25px;
  border-radius: 15px;
  height: 320px;
  overflow: hidden;
}

.title {
  color: #00d4ff;
  margin-bottom: 20px;
  font-size: 24px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tab {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.tab.active {
  background: #00d4ff;
  color: black;
}

.recommendations {
  display: grid;
  gap: 15px;
  height: calc(100% - 80px);
  overflow-y: auto;
}

.tier {
  text-align: center;
}

.tier-title {
  font-size: 14px;
  margin-bottom: 10px;
}

.tier-title.bis {
  color: #ffd700;
}

.tier-title.generalist {
  color: #00d4ff;
}

.tier-title.f2p {
  color: #2ecc71;
}

.character-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.character-item {
  text-align: center;
}

.character-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid;
  cursor: pointer;
}

.bis-border {
  border-color: #ffd700;
}

.generalist-border {
  border-color: #00d4ff;
}

.f2p-border {
  border-color: #2ecc71;
}

.character-name {
  color: white;
  font-size: 10px;
  margin-top: 2px;
}

.no-options {
  color: #ff6b6b;
  font-size: 12px;
  padding: 10px;
}
</style>