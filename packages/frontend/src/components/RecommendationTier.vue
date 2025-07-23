<template>
  <div class="text-center" style="flex: 1">
    <div class="title-container mb-4">
      <h3 v-if="hasRecommendations" class="h5 fw-bold" :style="{ color: tierColor }">
        {{ tierTitle }}
      </h3>
    </div>

    <div v-if="showNoSustainMessage" class="text-warning small p-3">
      No F2P sustain options available
    </div>

    <div v-else-if="hasRecommendations" class="d-flex flex-wrap gap-2 justify-content-center">
      <template v-for="characterId in sortedCharacterIds" :key="characterId">
        <!-- Character Image -->
        <div v-if="!isCustomText(characterId)" class="text-center">
          <img
            :src="getCharacterAvatar(characterId)"
            :alt="getCharacterName(characterId)"
            class="rounded-circle border border-3 cursor-pointer mb-1"
            :style="{
              width: '80px',
              height: '80px',
              borderColor: tierColor + ' !important',
            }"
            @error="($event.target as HTMLImageElement).src = '/images/placeholder.svg'"
            @mouseenter="$emit('show-tooltip', characterId, $event)"
            @mouseleave="$emit('hide-tooltip')"
          />
        </div>

        <!-- Custom Text -->
        <div
          v-else
          class="custom-text-recommendation d-flex align-items-center px-3 py-2 rounded"
          :style="{
            backgroundColor: '#212529',
            border: '3px solid ' + tierColor,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
          }"
        >
          <span class="fw-bold small text-center text-white">
            {{ characterId }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getCharacterAvatar } from '@/data/avatars'
import { COLORS } from '@/constants/design'
import type { Character } from '@/types/Character'

interface Props {
  tier: 'bis' | 'generalist' | 'f2p'
  characterIds: string[]
  activeTab: string
  noSustainAvailable?: boolean
  characters: Character[]
}

interface Emits {
  (e: 'show-tooltip', characterId: string, event: MouseEvent): void
  (e: 'hide-tooltip'): void
}

const props = withDefaults(defineProps<Props>(), {
  noSustainAvailable: false,
})

defineEmits<Emits>()

const tierConfig = {
  bis: { title: 'BiS - Best in Slot', color: '#ffd700' },
  generalist: { title: 'Generalist', color: COLORS.generalist },
  f2p: { title: 'F2P Options', color: '#2ecc71' },
}

const tierTitle = computed(() => tierConfig[props.tier].title)
const tierColor = computed(() => tierConfig[props.tier].color)

const hasRecommendations = computed(
  () =>
    props.characterIds.length > 0 ||
    (props.tier === 'f2p' && props.activeTab === 'sustain' && props.noSustainAvailable),
)

const showNoSustainMessage = computed(
  () => props.tier === 'f2p' && props.activeTab === 'sustain' && props.noSustainAvailable,
)

const isCustomText = (entry: string): boolean => {
  // Check if it's custom text (not a character ID)
  return !props.characters.find((c) => c.id === entry)
}

const sortedCharacterIds = computed(() => {
  return [...props.characterIds].sort((a, b) => {
    const aIsCustom = isCustomText(a)
    const bIsCustom = isCustomText(b)

    // Put custom text at the end
    if (aIsCustom && !bIsCustom) return 1
    if (!aIsCustom && bIsCustom) return -1
    if (aIsCustom && bIsCustom) return a.localeCompare(b)

    const charA = props.characters.find((c) => c.id === a)
    const charB = props.characters.find((c) => c.id === b)

    // Sort by rarity (5-star first, then 4-star)
    if (charA?.rarity !== charB?.rarity) {
      return (charB?.rarity || 0) - (charA?.rarity || 0)
    }

    // If same rarity, sort alphabetically by name
    return (charA?.name || a).localeCompare(charB?.name || b)
  })
})

const getCharacterName = (characterId: string): string => {
  const char = props.characters.find((c) => c.id === characterId)
  return char?.name || characterId
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.title-container {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-text-recommendation {
  min-height: 80px;
  max-width: 180px;
  min-width: 120px;
  word-wrap: break-word;
  word-break: break-word;
  flex-shrink: 1;
  flex-grow: 0;
  transition: all 0.2s ease;
  overflow-wrap: break-word;
  hyphens: auto;
}

.custom-text-recommendation:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6) !important;
  border-width: 3px;
}
</style>
