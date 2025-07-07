<template>
  <div v-if="character.teamRecommendations" style="background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 15px; height: 320px; overflow: hidden;">
    <h2 style="color: #00d4ff; margin-bottom: 20px; font-size: 24px;">Recommended Teammates for {{ character.name }}</h2>
    
    <!-- Role Tabs -->
    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
      <button
        v-if="character.teamRecommendations.requiresSubDPS"
        style="padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: all 0.2s;"
        :style="{
          background: activeTab === 'subDPS' ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)',
          color: activeTab === 'subDPS' ? 'black' : 'white'
        }"
        @click="activeTab = 'subDPS'"
      >
        Sub DPS
      </button>
      <button
        style="padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: all 0.2s;"
        :style="{
          background: activeTab === 'bufferDebuffer' ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)',
          color: activeTab === 'bufferDebuffer' ? 'black' : 'white'
        }"
        @click="activeTab = 'bufferDebuffer'"
      >
        Buffer/Debuffer
      </button>
      <button
        style="padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: all 0.2s;"
        :style="{
          background: activeTab === 'sustain' ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)',
          color: activeTab === 'sustain' ? 'black' : 'white'
        }"
        @click="activeTab = 'sustain'"
      >
        Sustain
      </button>
    </div>

    <!-- Recommendation Tiers -->
    <div v-if="currentRecommendations" :style="{
      display: 'grid',
      gridTemplateColumns: getGridColumns(),
      gap: '15px',
      height: 'calc(100% - 80px)',
      overflowY: 'auto'
    }">
      <!-- BiS -->
      <div v-if="currentRecommendations.bis.length > 0" style="text-align: center;">
        <h3 style="color: #ffd700; font-size: 14px; margin-bottom: 10px;">Best in Slot (BiS)</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
          <div 
            v-for="characterId in currentRecommendations.bis"
            :key="characterId"
            style="text-align: center;"
          >
            <img 
              :src="getCharacterAvatar(characterId)" 
              :alt="getCharacterName(characterId)" 
              style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #ffd700; cursor: pointer;" 
              @error="onImageError"
              @mouseenter="showTooltip(characterId, $event)"
              @mouseleave="hideTooltip"
            />
            <div style="color: white; font-size: 10px; margin-top: 2px;">{{ getCharacterName(characterId) }}</div>
          </div>
        </div>
      </div>

      <!-- Generalist -->
      <div v-if="currentRecommendations.generalist.length > 0" style="text-align: center;">
        <h3 style="color: #00d4ff; font-size: 14px; margin-bottom: 10px;">Generalist</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
          <div 
            v-for="characterId in currentRecommendations.generalist"
            :key="characterId"
            style="text-align: center;"
          >
            <img 
              :src="getCharacterAvatar(characterId)" 
              :alt="getCharacterName(characterId)" 
              style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #00d4ff; cursor: pointer;" 
              @error="onImageError"
              @mouseenter="showTooltip(characterId, $event)"
              @mouseleave="hideTooltip"
            />
            <div style="color: white; font-size: 10px; margin-top: 2px;">{{ getCharacterName(characterId) }}</div>
          </div>
        </div>
      </div>

      <!-- F2P -->
      <div v-if="currentRecommendations.f2p.length > 0 || (activeTab === 'sustain' && character.teamRecommendations.anySustainAvailable === false)" style="text-align: center;">
        <h3 style="color: #2ecc71; font-size: 14px; margin-bottom: 10px;">F2P Options</h3>
        <div v-if="activeTab === 'sustain' && character.teamRecommendations.anySustainAvailable === false" style="color: #ff6b6b; font-size: 12px; padding: 10px;">
          No F2P sustain options available
        </div>
        <div v-else style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
          <div 
            v-for="characterId in currentRecommendations.f2p"
            :key="characterId"
            style="text-align: center;"
          >
            <img 
              :src="getCharacterAvatar(characterId)" 
              :alt="getCharacterName(characterId)" 
              style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #2ecc71; cursor: pointer;" 
              @error="onImageError"
              @mouseenter="showTooltip(characterId, $event)"
              @mouseleave="hideTooltip"
            />
            <div style="color: white; font-size: 10px; margin-top: 2px;">{{ getCharacterName(characterId) }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Character Tooltip -->
    <div 
      v-if="hoveredCharacter" 
      style="position: fixed; z-index: 1000; pointer-events: none; background: rgba(0, 0, 0, 0.9); border: 2px solid #00d4ff; border-radius: 8px; padding: 12px; color: white; font-size: 14px; max-width: 280px;"
      :style="{
        left: tooltipPosition.x + 10 + 'px',
        top: tooltipPosition.y - 10 + 'px'
      }"
    >
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <img 
          :src="getCharacterAvatar(hoveredCharacter.id)" 
          :alt="hoveredCharacter.name" 
          style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid #00d4ff;"
          @error="onImageError"
        />
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="font-weight: bold; font-size: 16px; color: #00d4ff;">{{ hoveredCharacter.name }}</div>
          <div :style="{ color: hoveredCharacter.rarity === 4 ? '#8a5fcc' : '#ffd700', fontSize: '14px' }">{{ hoveredCharacter.rarity }}★</div>
        </div>
      </div>
      
      <div style="margin-bottom: 6px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <img :src="`/images/element/${hoveredCharacter.element}.webp`" :alt="hoveredCharacter.element" style="width: 20px; height: 20px;" />
          <span style="font-weight: 600;">{{ hoveredCharacter.element }}</span>
          <span style="color: #aaa;">•</span>
          <img :src="`/images/path/${hoveredCharacter.path}.webp`" :alt="hoveredCharacter.path" style="width: 20px; height: 20px;" />
          <span style="font-weight: 600;">{{ hoveredCharacter.path }}</span>
        </div>
      </div>
      
      <div style="margin-top: 8px;">
        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
          <span 
            v-for="label in hoveredCharacter.labels.slice().sort()" 
            :key="label"
            style="font-size: 11px; padding: 3px 6px; border-radius: 10px; background: #00d4ff; color: black; font-weight: 500;"
          >
            {{ label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Character } from '@/types/Character'
import { getCharacterAvatar } from '@/data/avatars'
import { characters } from '@/data/characters'

const hoveredCharacter = ref<Character | null>(null)
const tooltipPosition = ref({ x: 0, y: 0 })

interface Props {
  character: Character
}

const props = defineProps<Props>()

const activeTab = ref<'subDPS' | 'bufferDebuffer' | 'sustain'>(
  props.character.teamRecommendations?.requiresSubDPS ? 'subDPS' : 'bufferDebuffer'
)

const currentRecommendations = computed(() => {
  if (!props.character.teamRecommendations) return null
  
  switch (activeTab.value) {
    case 'subDPS':
      return props.character.teamRecommendations.subDPS
    case 'bufferDebuffer':
      return props.character.teamRecommendations.bufferDebuffer
    case 'sustain':
      return props.character.teamRecommendations.sustain
    default:
      return null
  }
})

const getCharacterName = (characterId: string): string => {
  const character = characters.find(c => c.id === characterId)
  return character?.name || characterId
}

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/placeholder.svg'
}

const showTooltip = (characterId: string, event: MouseEvent) => {
  const character = characters.find(c => c.id === characterId)
  if (character) {
    hoveredCharacter.value = character
    tooltipPosition.value = { x: event.clientX, y: event.clientY }
  }
}

const hideTooltip = () => {
  hoveredCharacter.value = null
}

const getGridColumns = () => {
  if (!currentRecommendations.value) return '1fr'
  
  const visibleSections = []
  if (currentRecommendations.value.bis.length > 0) visibleSections.push('1fr')
  if (currentRecommendations.value.generalist.length > 0) visibleSections.push('1fr')
  if (currentRecommendations.value.f2p.length > 0 || (activeTab.value === 'sustain' && props.character.teamRecommendations?.anySustainAvailable === false)) {
    visibleSections.push('1fr')
  }
  
  return visibleSections.join(' ') || '1fr'
}
</script>