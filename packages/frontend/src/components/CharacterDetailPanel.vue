<template>
  <div v-if="character" class="character-detail-panel">
    <!-- Header -->
    <div class="detail-header">
      <img
        :src="getCharacterAvatar(character.id)"
        :alt="character.name"
        class="detail-avatar"
        @error="($event.target as HTMLImageElement).src = '/images/placeholder.svg'"
      />
      <div class="detail-info">
        <div class="detail-name-row">
          <h3 class="detail-name">{{ character.name }}</h3>
          <span
            class="detail-rarity"
            :style="{ color: character.rarity === 4 ? '#8a5fcc' : '#ffd700' }"
          >
            {{ character.rarity }}★
          </span>
        </div>
        <div class="detail-meta">
          <div class="meta-item">
            <img
              :src="`/images/element/${character.element}.webp`"
              :alt="character.element"
              class="meta-icon"
            />
            <span>{{ character.element }}</span>
          </div>
          <div class="meta-item">
            <img
              :src="`/images/path/${character.path}.webp`"
              :alt="character.path"
              class="meta-icon"
            />
            <span>{{ character.path }}</span>
          </div>
        </div>
      </div>
      <button
        class="btn btn-outline-secondary btn-sm detail-close"
        @click="() => emit('close')"
        aria-label="Close character details"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Roles & Archetypes -->
    <div class="detail-section">
      <div class="section-row">
        <div class="roles-section">
          <span class="section-label">Roles:</span>
          <div class="tags-container">
            <span
              v-for="role in character.roles"
              :key="role"
              class="tag role-tag"
            >
              {{ role }}
            </span>
          </div>
        </div>
        <div class="archetypes-section">
          <span class="section-label">Archetypes:</span>
          <div class="tags-container">
            <span
              v-for="archetype in character.archetype"
              :key="archetype"
              class="tag archetype-tag"
            >
              {{ archetype }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Labels/Tags -->
    <div class="detail-section">
      <span class="section-label">Tags:</span>
      <div class="labels-container">
        <span
          v-for="label in character.labels.slice().sort()"
          :key="label"
          class="tag label-tag"
        >
          {{ label }}
        </span>
      </div>
    </div>

    <!-- Teammate Recommendations (if available) -->
    <div
      v-if="character.teammateRecommendations && character.teammateRecommendations.length > 0"
      class="detail-section"
    >
      <span class="section-label">
        <i class="fas fa-users"></i>
        Teammate Recommendations:
      </span>
      <div class="recommendations-container">
        <div
          v-for="section in character.teammateRecommendations"
          :key="section.name"
          class="recommendation-section"
        >
          <h4 class="recommendation-title">{{ section.name }}</h4>
          
          <!-- BIS Recommendations -->
          <div v-if="section.bis && section.bis.length > 0" class="recommendation-tier">
            <span class="tier-label bis-label">Best in Slot:</span>
            <div class="character-chips">
              <span
                v-for="charId in section.bis"
                :key="charId"
                class="character-chip bis-chip"
              >
                {{ getCharacterName(charId) }}
              </span>
            </div>
          </div>

          <!-- Generalist Recommendations -->
          <div v-if="section.generalist && section.generalist.length > 0" class="recommendation-tier">
            <span class="tier-label generalist-label">Generalist:</span>
            <div class="character-chips">
              <span
                v-for="charId in section.generalist"
                :key="charId"
                class="character-chip generalist-chip"
              >
                {{ getCharacterName(charId) }}
              </span>
            </div>
          </div>

          <!-- F2P Recommendations -->
          <div v-if="section.f2p && section.f2p.length > 0" class="recommendation-tier">
            <span class="tier-label f2p-label">F2P Options:</span>
            <div class="character-chips">
              <span
                v-for="charId in section.f2p"
                :key="charId"
                class="character-chip f2p-chip"
              >
                {{ getCharacterName(charId) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@hsr-team-builder/shared'
import { getCharacterAvatar } from '@/data/avatars'
import { useCharactersApi } from '@/composables/useCharactersApi'

interface Props {
  character: Character | null
}

defineProps<Props>()
const emit = defineEmits(['close'])

const { getCharacterById } = useCharactersApi()

const getCharacterName = (characterId: string): string => {
  const char = getCharacterById(characterId)
  return char?.name || characterId
}
</script>

<style scoped>
.character-detail-panel {
  background: rgba(15, 15, 35, 0.95);
  border: 2px solid #00d4ff;
  border-radius: 12px;
  padding: 20px;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  margin-top: 16px;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  position: relative;
}

.detail-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #00d4ff;
  flex-shrink: 0;
}

.detail-info {
  flex: 1;
  min-width: 0;
}

.detail-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.detail-name {
  font-size: 24px;
  font-weight: bold;
  color: #00d4ff;
  margin: 0;
  line-height: 1.2;
}

.detail-rarity {
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
}

.detail-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
}

.meta-icon {
  width: 24px;
  height: 24px;
}

.detail-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.detail-section {
  margin-bottom: 20px;
}

.section-label {
  display: block;
  font-weight: 600;
  color: #00d4ff;
  margin-bottom: 8px;
  font-size: 16px;
}

.section-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .section-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

.tags-container,
.labels-container,
.character-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
}

.role-tag {
  background: #dc3545;
  color: white;
}

.archetype-tag {
  background: #6f42c1;
  color: white;
}

.label-tag {
  background: #00d4ff;
  color: black;
}

.recommendations-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recommendation-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
}

.recommendation-title {
  font-size: 18px;
  font-weight: 600;
  color: #00d4ff;
  margin: 0 0 12px 0;
}

.recommendation-tier {
  margin-bottom: 12px;
}

.recommendation-tier:last-child {
  margin-bottom: 0;
}

.tier-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}

.bis-label {
  color: #ffd700;
}

.generalist-label {
  color: #28a745;
}

.f2p-label {
  color: #17a2b8;
}

.character-chip {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  color: white;
}

.bis-chip {
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid #ffd700;
}

.generalist-chip {
  background: rgba(40, 167, 69, 0.2);
  border: 1px solid #28a745;
}

.f2p-chip {
  background: rgba(23, 162, 184, 0.2);
  border: 1px solid #17a2b8;
}
</style>