<template>
  <div class="text-center" style="flex: 1;">
    <h3 v-if="hasRecommendations" class="h5 fw-bold mb-2" :style="{ color: tierColor }">
      {{ tierTitle }}
    </h3>
    
    <div v-if="showNoSustainMessage" class="text-warning small p-3">
      No F2P sustain options available
    </div>
    
    <div v-else-if="hasRecommendations" class="d-flex flex-wrap gap-2 justify-content-center">
      <div 
        v-for="characterId in characterIds"
        :key="characterId"
        class="text-center"
      >
        <img 
          :src="getCharacterAvatar(characterId)" 
          :alt="getCharacterName(characterId)" 
          class="rounded-circle border border-3 cursor-pointer mb-1"
          :style="{ 
            width: '80px', 
            height: '80px', 
            borderColor: tierColor + ' !important' 
          }"
          @error="$event.target.src = '/images/placeholder.svg'"
          @mouseenter="$emit('show-tooltip', characterId, $event)"
          @mouseleave="$emit('hide-tooltip')"
        />
        <div class="text-white small fw-medium">{{ getCharacterName(characterId) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getCharacterAvatar } from '@/data/avatars'
import { characters } from '@/data/characters'
import { COLORS } from '@/constants/design'

interface Props {
  tier: 'bis' | 'generalist' | 'f2p'
  characterIds: string[]
  activeTab: string
  noSustainAvailable?: boolean
}

interface Emits {
  (e: 'show-tooltip', characterId: string, event: MouseEvent): void
  (e: 'hide-tooltip'): void
}

const props = withDefaults(defineProps<Props>(), {
  noSustainAvailable: false
})

defineEmits<Emits>()

const tierConfig = {
  bis: { title: 'BiS - Best in Slot', color: '#ffd700' },
  generalist: { title: 'Generalist', color: COLORS.generalist },
  f2p: { title: 'F2P Options', color: '#2ecc71' }
}

const tierTitle = computed(() => tierConfig[props.tier].title)
const tierColor = computed(() => tierConfig[props.tier].color)

const hasRecommendations = computed(() => 
  props.characterIds.length > 0 || 
  (props.tier === 'f2p' && props.activeTab === 'sustain' && props.noSustainAvailable)
)

const showNoSustainMessage = computed(() => 
  props.tier === 'f2p' && 
  props.activeTab === 'sustain' && 
  props.noSustainAvailable
)

const getCharacterName = (characterId: string): string => {
  const char = characters.find(c => c.id === characterId)
  return char?.name || characterId
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>