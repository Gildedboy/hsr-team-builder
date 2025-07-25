<template>
  <div
    v-if="character"
    class="character-tooltip"
    :style="{
      left: position.x + 'px',
      top: position.y + 'px',
    }"
  >
    <div class="tooltip-header">
      <img
        :src="getCharacterAvatar(character.id)"
        :alt="character.name"
        class="tooltip-avatar"
        @error="($event.target as HTMLImageElement).src = '/images/placeholder.svg'"
      />
      <div class="tooltip-info">
        <div class="tooltip-name-rarity">
          <span class="tooltip-name">{{ character.name }}</span>
          <span
            class="tooltip-rarity"
            :style="{ color: character.rarity === 4 ? '#8a5fcc' : '#ffd700' }"
          >
            {{ character.rarity }}★
          </span>
        </div>
      </div>
    </div>

    <div class="tooltip-details">
      <div class="tooltip-element-path">
        <img
          :src="`/images/element/${character.element}.webp`"
          :alt="character.element"
          class="tooltip-icon"
        />
        <span>{{ character.element }}</span>
        <span class="tooltip-separator">•</span>
        <img
          :src="`/images/path/${character.path}.webp`"
          :alt="character.path"
          class="tooltip-icon"
        />
        <span>{{ character.path }}</span>
      </div>
    </div>

    <div class="tooltip-labels">
      <span v-for="label in character.labels.slice().sort()" :key="label" class="tooltip-label">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@hsr-team-builder/shared'
import { getCharacterAvatar } from '@/data/avatars'

interface Props {
  character: Character | null
  position: { x: number; y: number }
}

defineProps<Props>()
</script>

<style scoped>
.character-tooltip {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  background: rgba(15, 15, 35, 0.95);
  border: 2px solid #00d4ff;
  border-radius: 8px;
  padding: 12px;
  color: white;
  font-size: 14px;
  width: 320px;
  max-width: 320px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  min-height: 48px;
}

.tooltip-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #00d4ff;
  flex-shrink: 0;
}

.tooltip-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.tooltip-name-rarity {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.tooltip-name {
  font-weight: bold;
  font-size: 16px;
  color: #00d4ff;
  word-wrap: break-word;
  line-height: 1.2;
}

.tooltip-rarity {
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.tooltip-details {
  margin-bottom: 8px;
}

.tooltip-element-path {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.tooltip-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.tooltip-separator {
  color: #6c757d;
  margin: 0 2px;
}

.tooltip-labels {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tooltip-label {
  font-size: 11px;
  padding: 3px 6px;
  border-radius: 10px;
  background: #00d4ff;
  color: black;
  font-weight: 500;
  line-height: 1.2;
  word-break: break-word;
}
</style>
