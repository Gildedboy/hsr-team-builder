<template>
  <div 
    v-for="(chars, category) in roleCharacters"
    :key="category"
    v-show="chars.length > 0"
    class="mb-4"
  >
    <h3 class="h5 text-primary mb-3 p-2 rounded border-start border-primary border-3 category-header">
      {{ category }} ({{ chars.length }})
    </h3>
    <CharacterGrid
      :characters="chars"
      :selected-character="selectedCharacter"
      :is-recommended="isRecommended"
      :get-recommendation-tier="getRecommendationTier"
      :selected-elements="selectedElements"
      :selected-paths="selectedPaths"
      :selected-rarities="selectedRarities"
      @select="$emit('select', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Character } from '@/types/Character'
import CharacterGrid from './CharacterGrid.vue'

interface Props {
  roleCharacters: Record<string, Character[]>
  selectedCharacter?: Character | null
  isRecommended: (charId: string) => boolean
  getRecommendationTier: (charId: string) => 'bis' | 'generalist' | 'f2p' | null
  selectedElements: string[]
  selectedPaths: string[]
  selectedRarities: number[]
}

interface Emits {
  (e: 'select', character: Character): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.category-header {
  background: rgba(255, 255, 255, 0.1);
}
</style>