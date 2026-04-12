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
      <template v-for="entry in visibleEntries" :key="`${tier}-${entry.originalId}-${entry.id}`">
        <!-- Character Image -->
        <div v-if="entry.kind !== 'custom'" class="text-center recommendation-entry">
          <img
            :src="getCharacterAvatar(entry.id)"
            :alt="getCharacterName(entry.id)"
            class="rounded-circle border border-3 cursor-pointer mb-1"
            :class="{ 'is-unavailable': entry.kind === 'unavailable' }"
            :style="{
              width: '80px',
              height: '80px',
              borderColor: tierColor + ' !important',
            }"
            @error="($event.target as HTMLImageElement).src = '/images/placeholder.svg'"
            @mouseenter="$emit('show-tooltip', entry.id, $event)"
            @mouseleave="$emit('hide-tooltip')"
          />
          <div v-if="entry.kind !== 'owned'" class="recommendation-tag small">
            {{ getEntryTag(entry) }}
          </div>
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
            {{ entry.name }}
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
import type { Character } from '@hsr-team-builder/shared'
import type { ResolvedCharacterEntry } from '@/composables/useRoster'

interface Props {
  tier: 'bis' | 'generalist' | 'f2p'
  entries: ResolvedCharacterEntry[]
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
    props.entries.length > 0 ||
    (props.tier === 'f2p' && props.activeTab === 'sustain' && props.noSustainAvailable),
)

const showNoSustainMessage = computed(
  () => props.tier === 'f2p' && props.activeTab === 'sustain' && props.noSustainAvailable,
)

const visibleEntries = computed(() => props.entries)

const getCharacterName = (characterId: string): string => {
  const char = props.characters.find((c) => c.id === characterId)
  return char?.name || characterId
}

const getEntryTag = (entry: ResolvedCharacterEntry) => {
  const displayedCharacter = props.characters.find((character) => character.id === entry.id)

  if (entry.kind === 'free') {
    return 'Free'
  }

  if (entry.kind === 'fallback') {
    const originalCharacter = props.characters.find((character) => character.id === entry.originalId)

    if (entry.isFree && originalCharacter?.roles.includes('SUSTAIN')) {
      return `Free Sustain Option: ${displayedCharacter?.name || entry.name} for ${entry.originalName}`
    }

    return `${displayedCharacter?.name || entry.name} replacing ${entry.originalName}`
  }

  if (entry.kind === 'unavailable') {
    return 'Not obtained yet'
  }

  return ''
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.recommendation-entry {
  max-width: 90px;
}

.recommendation-tag {
  color: rgba(255, 255, 255, 0.84);
  line-height: 1.2;
  min-height: 2rem;
}

.is-unavailable {
  filter: grayscale(100%) saturate(0.2);
  opacity: 0.5;
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
