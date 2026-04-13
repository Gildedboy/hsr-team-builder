<template>
  <div class="character-grid">
    <div
      v-for="char in characters"
      :key="char.id"
      @click="handleCharacterClick(char)"
      @mouseenter="showTooltip(char.id, $event)"
      @mouseleave="hideTooltip"
      class="character-item"
      :class="{
        'edit-mode': isRosterEditMode,
        'is-free': isFreeCharacter(char.id),
        unavailable: isCharacterDisabled(char.id),
        selected: selectedCharacter?.id === char.id,
        recommended: selectedCharacter && isRecommended(char.id),
        'recommended-bis': selectedCharacter && getRecommendationTier(char.id) === 'bis',
        'recommended-generalist':
          selectedCharacter && getRecommendationTier(char.id) === 'generalist',
        'recommended-f2p': selectedCharacter && getRecommendationTier(char.id) === 'f2p',
      }"
      :style="
        isFiltered(char)
          ? {
              opacity: '0.25',
              filter: 'grayscale(80%)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              transform: 'scale(1)',
            }
          : {}
      "
    >
      <div class="character-state-badges">
        <span v-if="isFreeCharacter(char.id)" class="state-badge free-badge">Free</span>
        <span v-else-if="isRosterEditMode" class="state-badge edit-badge">
          {{ isCharacterDisabled(char.id) ? 'Not Owned' : 'Owned' }}
        </span>
        <span v-else-if="isCharacterDisabled(char.id)" class="state-badge unavailable-badge">
          Not Owned
        </span>
      </div>
      <img
        :src="getCharacterAvatar(char.id)"
        :alt="char.name"
        class="character-avatar"
        width="66"
        height="66"
        loading="lazy"
        @error="($event.target as HTMLImageElement).src = '/images/placeholder.svg'"
      />
      <div class="character-name">{{ char.name }}</div>
    </div>

    <CharacterTooltip :character="hoveredCharacter" :position="tooltipPosition" />
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@hsr-team-builder/shared'
import { getCharacterAvatar } from '@/data/avatars'
import { COLORS } from '@/constants/design'
import { useTooltip } from '@/composables/useTooltip'
import CharacterTooltip from './CharacterTooltip.vue'

interface Props {
  characters: Character[]
  selectedCharacter?: Character | null
  isRecommended?: (charId: string) => boolean
  getRecommendationTier?: (charId: string) => 'bis' | 'generalist' | 'f2p' | null
  selectedElements?: string[]
  selectedPaths?: string[]
  selectedRarities?: number[]
  isRosterEditMode?: boolean
  isCharacterDisabled?: (charId: string) => boolean
  isFreeCharacter?: (charId: string) => boolean
  toggleCharacterAvailability?: (charId: string) => void
}

interface Emits {
  (e: 'select', character: Character): void
}

const props = withDefaults(defineProps<Props>(), {
  isRecommended: () => () => false,
  getRecommendationTier: () => () => null,
  selectedElements: () => [],
  selectedPaths: () => [],
  selectedRarities: () => [],
  isRosterEditMode: false,
  isCharacterDisabled: () => () => false,
  isFreeCharacter: () => () => false,
  toggleCharacterAvailability: () => () => undefined,
})

const emit = defineEmits<Emits>()

const { hoveredCharacter, tooltipPosition, showTooltip, hideTooltip } = useTooltip()

const isFiltered = (char: Character) => {
  const hasFilters =
    (props.selectedElements.length > 0 && !props.selectedElements.includes(char.element)) ||
    (props.selectedPaths.length > 0 && !props.selectedPaths.includes(char.path)) ||
    (props.selectedRarities.length > 0 && !props.selectedRarities.includes(char.rarity))

  const isNotRecommended =
    props.selectedCharacter &&
    char.id !== props.selectedCharacter.id &&
    !props.isRecommended(char.id)

  return hasFilters || isNotRecommended
}

const handleCharacterClick = (character: Character) => {
  if (props.isRosterEditMode) {
    props.toggleCharacterAvailability(character.id)
    return
  }

  emit('select', character)
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
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease,
    opacity 0.18s ease,
    filter 0.18s ease;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: 2px solid transparent;
  filter: none;
  contain: layout paint;
}

.character-item.edit-mode {
  cursor: pointer;
}

.character-item.selected {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 0, 255, 0.8);
  border-color: #ff00ff;
}

.character-item.recommended-bis {
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.8) !important;
  border-color: v-bind('COLORS.bis') !important;
}

.character-item.recommended-generalist {
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.8) !important;
  border-color: v-bind('COLORS.generalist') !important;
}

.character-item.recommended-f2p {
  box-shadow: 0 0 12px rgba(46, 204, 113, 0.8) !important;
  border-color: v-bind('COLORS.f2p') !important;
}

.character-item.recommended {
  box-shadow: 0 0 8px rgba(46, 204, 113, 0.6);
  border-color: #2ecc71;
}

.character-item.unavailable {
  opacity: 0.45;
  filter: grayscale(100%) saturate(0.25);
}

.character-item.edit-mode.unavailable {
  opacity: 0.6;
}

.character-item.selected.unavailable {
  opacity: 0.9;
  filter: grayscale(70%) saturate(0.45);
  box-shadow: 0 4px 12px rgba(255, 0, 255, 0.8);
  border-color: #ff00ff;
}

.character-avatar {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
}

.character-state-badges {
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  display: flex;
  justify-content: flex-start;
  pointer-events: none;
  z-index: 1;
}

.state-badge {
  background: rgba(13, 17, 23, 0.92);
  border-radius: 999px;
  color: white;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 2px 6px;
  text-transform: uppercase;
}

.free-badge {
  border: 1px solid rgba(46, 204, 113, 0.85);
}

.edit-badge {
  border: 1px solid rgba(0, 212, 255, 0.85);
}

.unavailable-badge {
  border: 1px solid rgba(255, 193, 7, 0.85);
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

@media (hover: none) and (pointer: coarse) {
  .character-item {
    transition:
      opacity 0.12s ease,
      filter 0.12s ease,
      border-color 0.12s ease;
  }
}
</style>
