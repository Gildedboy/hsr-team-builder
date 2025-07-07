<template>
  <div class="bg-slate-800 p-5 rounded-xl mb-5">
    <h3 class="text-white mb-5 text-2xl font-semibold">Filters</h3>
    
    <div class="mb-5">
      <h4 class="text-gray-400 mb-2 text-sm uppercase tracking-wider font-medium">Labels</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="label in allLabels"
          :key="label"
          class="bg-gray-700 text-white border-none px-3 py-2 rounded-full cursor-pointer transition-all duration-200 text-xs font-medium hover:bg-gray-600 hover:-translate-y-0.5"
          :class="selectedLabels.includes(label) ? 'bg-cyan-400 text-black' : ''"
          @click="toggleLabel(label)"
        >
          {{ label }}
        </button>
      </div>
    </div>

    <div class="mb-5">
      <h4 class="text-gray-400 mb-2 text-sm uppercase tracking-wider font-medium">Elements</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="element in allElements"
          :key="element"
          class="bg-gray-700 text-white border-none px-3 py-2 rounded-full cursor-pointer transition-all duration-200 text-xs font-medium hover:bg-gray-600 hover:-translate-y-0.5"
          :class="getElementButtonClass(element)"
          @click="toggleElement(element)"
        >
          {{ element }}
        </button>
      </div>
    </div>

    <div class="mb-5">
      <h4 class="text-gray-400 mb-2 text-sm uppercase tracking-wider font-medium">Paths</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="path in allPaths"
          :key="path"
          class="bg-gray-700 text-white border-none px-3 py-2 rounded-full cursor-pointer transition-all duration-200 text-xs font-medium hover:bg-gray-600 hover:-translate-y-0.5"
          :class="selectedPaths.includes(path) ? 'bg-cyan-400 text-black' : ''"
          @click="togglePath(path)"
        >
          {{ path }}
        </button>
      </div>
    </div>

    <div class="mb-5">
      <h4 class="text-gray-400 mb-2 text-sm uppercase tracking-wider font-medium">Rarity</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="rarity in allRarities"
          :key="rarity"
          class="bg-gray-700 text-white border-none px-3 py-2 rounded-full cursor-pointer transition-all duration-200 text-xs font-medium hover:bg-gray-600 hover:-translate-y-0.5"
          :class="getRarityButtonClass(rarity)"
          @click="toggleRarity(rarity)"
        >
          {{ rarity }}★
        </button>
      </div>
    </div>

    <div class="mt-5 text-center">
      <button class="bg-gray-600 text-white border-none px-5 py-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-500" @click="clearFilters">Clear All</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CharacterLabel } from '@/types/Character'

interface Props {
  selectedLabels: CharacterLabel[]
  selectedElements: string[]
  selectedPaths: string[]
  selectedRarities: number[]
}

interface Emits {
  (e: 'update:selectedLabels', labels: CharacterLabel[]): void
  (e: 'update:selectedElements', elements: string[]): void
  (e: 'update:selectedPaths', paths: string[]): void
  (e: 'update:selectedRarities', rarities: number[]): void
  (e: 'clear'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const allLabels: CharacterLabel[] = [
  'Hypercarry',
  'Sub-DPS',
  'Support',
  'Sustain',
  'HP Scaling',
  'ATK Scaling',
  'DEF Scaling',
  'Debuff',
  'Buffer',
  'Healer',
  'Shielder',
  'Works with Everyone',
  'Crit Support',
  'Energy Support',
  'DoT',
  'Follow-up Attack',
  'Break Effect'
]

const allElements = [
  'Physical',
  'Fire',
  'Ice',
  'Lightning',
  'Wind',
  'Quantum',
  'Imaginary'
]

const allPaths = [
  'Destruction',
  'Hunt',
  'Erudition',
  'Harmony',
  'Nihility',
  'Preservation',
  'Abundance',
  'Remembrance'
]

const allRarities = [4, 5]

const toggleLabel = (label: CharacterLabel) => {
  const newLabels = props.selectedLabels.includes(label)
    ? props.selectedLabels.filter(l => l !== label)
    : [...props.selectedLabels, label]
  emit('update:selectedLabels', newLabels)
}

const toggleElement = (element: string) => {
  const newElements = props.selectedElements.includes(element)
    ? props.selectedElements.filter(e => e !== element)
    : [...props.selectedElements, element]
  emit('update:selectedElements', newElements)
}

const togglePath = (path: string) => {
  const newPaths = props.selectedPaths.includes(path)
    ? props.selectedPaths.filter(p => p !== path)
    : [...props.selectedPaths, path]
  emit('update:selectedPaths', newPaths)
}

const toggleRarity = (rarity: number) => {
  const newRarities = props.selectedRarities.includes(rarity)
    ? props.selectedRarities.filter(r => r !== rarity)
    : [...props.selectedRarities, rarity]
  emit('update:selectedRarities', newRarities)
}

const clearFilters = () => {
  emit('clear')
}

const getElementButtonClass = (element: string) => {
  if (!selectedElements.value.includes(element)) return ''
  
  const elementClasses = {
    'Physical': 'bg-gray-400 text-black',
    'Fire': 'bg-red-500 text-white',
    'Ice': 'bg-blue-400 text-white',
    'Lightning': 'bg-yellow-500 text-white',
    'Wind': 'bg-green-500 text-white',
    'Quantum': 'bg-purple-500 text-white',
    'Imaginary': 'bg-yellow-300 text-black'
  }
  
  return elementClasses[element as keyof typeof elementClasses] || 'bg-cyan-400 text-black'
}

const getRarityButtonClass = (rarity: number) => {
  if (!selectedRarities.value.includes(rarity)) return ''
  
  return rarity === 5 ? 'bg-yellow-400 text-black' : 'bg-purple-500 text-white'
}
</script>
