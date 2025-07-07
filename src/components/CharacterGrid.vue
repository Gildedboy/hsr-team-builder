<template>
  <div class="character-grid">
    <div 
      v-for="char in characters" 
      :key="char.id" 
      @click="$emit('select', char)" 
      @mouseenter="$emit('hover', char.id, $event)"
      @mouseleave="$emit('unhover')"
      class="character-item"
      :class="{
        selected: selectedCharacter?.id === char.id,
        recommended: selectedCharacter && isRecommended(char.id),
        filtered: isFiltered(char)
      }"
    >
      <img 
        :src="getCharacterAvatar(char.id)" 
        :alt="char.name" 
        class="character-avatar"
        @error="$event.target.src = '/images/placeholder.svg'"
      />
      <div class="character-name">{{ char.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/types/Character'
import { getCharacterAvatar } from '@/data/avatars'

interface Props {
  characters: Character[]
  selectedCharacter?: Character | null
  isRecommended?: (charId: string) => boolean
  selectedElements?: string[]
  selectedPaths?: string[]
  selectedRarities?: number[]
}

interface Emits {
  (e: 'select', character: Character): void
  (e: 'hover', characterId: string, event: MouseEvent): void
  (e: 'unhover'): void
}

const props = withDefaults(defineProps<Props>(), {
  isRecommended: () => () => false,
  selectedElements: () => [],
  selectedPaths: () => [],
  selectedRarities: () => []
})

defineEmits<Emits>()

const isFiltered = (char: Character) => {
  return (props.selectedElements.length > 0 && !props.selectedElements.includes(char.element)) ||
         (props.selectedPaths.length > 0 && !props.selectedPaths.includes(char.path)) ||
         (props.selectedRarities.length > 0 && !props.selectedRarities.includes(char.rarity))
}
</script>

<style scoped>
.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 70px);
  gap: 10px;
  padding: 0 8px;
  justify-content: start;
}

.character-item {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: 2px solid transparent;
  filter: none;
}

.character-item.selected {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.8);
  border-color: #00d4ff;
}

.character-item.recommended {
  box-shadow: 0 0 8px rgba(46, 204, 113, 0.6);
  border-color: #2ecc71;
}

.character-item.filtered {
  opacity: 0.25;
  filter: grayscale(70%);
}

.character-avatar {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
}

.character-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  font-size: 10px;
  padding: 4px 2px;
  text-align: center;
  font-weight: 500;
}
</style>