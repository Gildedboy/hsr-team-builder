<template>
  <div 
    class="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 cursor-pointer transition-all duration-300 border-2 border-transparent relative overflow-hidden transform hover:-translate-y-1 hover:shadow-lg border-l-4"
    :class="[
      isSelected ? 'border-cyan-400 shadow-cyan-400/30 shadow-lg' : '',
      character.rarity === 5 ? 'from-purple-900 to-slate-800' : 'from-purple-800 to-purple-700',
      getElementBorderClass(character.element)
    ]"
    @click="$emit('select', character)"
  >
    <div class="relative w-full h-48 mb-3">
      <img 
        :src="getCharacterAvatar(character.id)" 
        :alt="character.name"
        @error="onImageError"
        class="w-full h-full object-cover rounded-lg bg-gray-700"
      />
      <div class="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded-xl">
        <span v-for="star in character.rarity" :key="star" class="text-yellow-400 text-xs">★</span>
      </div>
    </div>
    
    <div class="text-center">
      <h3 class="text-white text-lg font-semibold mb-2">{{ character.name }}</h3>
      <div class="flex justify-between mb-3 text-xs text-gray-400">
        <span class="bg-white bg-opacity-10 px-2 py-1 rounded">{{ character.element }}</span>
        <span class="bg-white bg-opacity-10 px-2 py-1 rounded">{{ character.path }}</span>
      </div>
      
      <div class="flex flex-wrap gap-1 justify-center">
        <span 
          v-for="label in character.labels" 
          :key="label"
          class="text-xs px-2 py-1 rounded-full font-medium uppercase tracking-wide"
          :class="getLabelClass(label)"
        >
          {{ label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character, CharacterLabel } from '@/types/Character'
import { getCharacterAvatar } from '@/data/avatars'

interface Props {
  character: Character
  isSelected?: boolean
}

interface Emits {
  (e: 'select', character: Character): void
}

defineProps<Props>()
defineEmits<Emits>()

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/placeholder.svg'
}

const getLabelClass = (label: CharacterLabel): string => {
  const labelClassMap: Record<CharacterLabel, string> = {
    'Hypercarry': 'bg-red-500 text-white',
    'Sub-DPS': 'bg-orange-500 text-white',
    'Support': 'bg-teal-500 text-white',
    'Sustain': 'bg-green-400 text-gray-900',
    'HP Scaling': 'bg-red-400 text-white',
    'ATK Scaling': 'bg-orange-400 text-white',
    'DEF Scaling': 'bg-green-500 text-white',
    'Debuff': 'bg-purple-500 text-white',
    'Buffer': 'bg-blue-500 text-white',
    'Healer': 'bg-green-400 text-gray-900',
    'Shielder': 'bg-yellow-400 text-gray-900',
    'Works with Everyone': 'bg-purple-300 text-gray-900',
    'Crit Support': 'bg-pink-400 text-white',
    'Energy Support': 'bg-teal-400 text-white',
    'DoT': 'bg-purple-400 text-white',
    'Follow-up Attack': 'bg-orange-400 text-white',
    'Break Effect': 'bg-gray-500 text-white'
  }
  return labelClassMap[label] || 'bg-gray-600 text-white'
}

const getElementBorderClass = (element: string): string => {
  const elementBorderMap: Record<string, string> = {
    'Physical': 'border-l-gray-400',
    'Fire': 'border-l-red-500',
    'Ice': 'border-l-blue-400',
    'Lightning': 'border-l-yellow-500',
    'Wind': 'border-l-green-500',
    'Quantum': 'border-l-purple-500',
    'Imaginary': 'border-l-yellow-300'
  }
  return elementBorderMap[element] || 'border-l-gray-500'
}
</script>
