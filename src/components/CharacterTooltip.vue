<template>
  <div 
    v-if="character" 
    class="tooltip"
    :style="{
      left: position.x + 10 + 'px',
      top: position.y - 10 + 'px'
    }"
  >
    <div class="tooltip-header">
      <img 
        :src="getCharacterAvatar(character.id)" 
        :alt="character.name" 
        class="tooltip-avatar"
        @error="$event.target.src = '/images/placeholder.svg'"
      />
      <div class="tooltip-info">
        <div class="tooltip-name">{{ character.name }}</div>
        <div class="tooltip-rarity" :style="{ color: character.rarity === 4 ? '#8a5fcc' : '#ffd700' }">
          {{ character.rarity }}★
        </div>
      </div>
    </div>
    
    <div class="tooltip-details">
      <div class="tooltip-element-path">
        <img :src="`/images/element/${character.element}.webp`" :alt="character.element" class="tooltip-icon" />
        <span>{{ character.element }}</span>
        <span class="tooltip-separator">•</span>
        <img :src="`/images/path/${character.path}.webp`" :alt="character.path" class="tooltip-icon" />
        <span>{{ character.path }}</span>
      </div>
    </div>
    
    <div class="tooltip-labels">
      <span 
        v-for="label in character.labels.slice().sort()" 
        :key="label"
        class="tooltip-label"
      >
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/types/Character'
import { getCharacterAvatar } from '@/data/avatars'
import { COLORS } from '@/constants/design'

interface Props {
  character: Character | null
  position: { x: number; y: number }
}

defineProps<Props>()
</script>

<style scoped>
.tooltip {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  background: rgba(15, 15, 35, 0.95);
  border: 2px solid #00d4ff;
  border-radius: 8px;
  padding: 12px;
  color: white;
  font-size: 14px;
  max-width: 280px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.tooltip-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #00d4ff;
}

.tooltip-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tooltip-name {
  font-weight: bold;
  font-size: 16px;
  color: #00d4ff;
}

.tooltip-rarity {
  font-size: 14px;
}

.tooltip-details {
  margin-bottom: 6px;
}

.tooltip-element-path {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.tooltip-icon {
  width: 20px;
  height: 20px;
}

.tooltip-separator {
  color: #6c757d;
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
}
</style>