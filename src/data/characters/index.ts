import type { Character } from '@/types/Character'
import { breakDPSCharacters } from './breakDPS'
import { bufferCharacters } from './buffers'
import { dpsCharacters } from './dpsCharacters'
import { supportCharacters } from './supportCharacters'
import { sustainCharacters } from './sustainCharacters'
import { miscCharacters } from './miscCharacters'
import { newCharacters } from './newCharacters'

// Essential characters for functionality
const essentialCharacters: Character[] = [
  {
    id: 'feixiao',
    name: 'Feixiao',
    element: 'Wind',
    path: 'Hunt',
    rarity: 5,
    mainArchetype: 'DPS',
    labels: ['DPS', 'Follow-up Attack', 'Ultimate Based', 'Multi-Hit'],
    teamRecommendations: {
      requiresSubDPS: true,
      subDPS: {
        bis: ['cipher'],
        generalist: ['topaz'],
        f2p: ['moze'],
      },
      amplifier: {
        bis: ['robin'],
        generalist: ['tribbie'],
        f2p: ['remembrance-trailblazer'],
      },
      sustain: {
        bis: ['aventurine'],
        generalist: ['lingsha', 'huohuo'],
        f2p: ['gallagher'],
      },
    },
  },
  {
    id: 'gallagher',
    name: 'Gallagher',
    element: 'Fire',
    path: 'Abundance',
    rarity: 4,
    mainArchetype: 'Healer',
    labels: ['Healer', 'Break Support', 'Debuff', 'Generalist'],
    teamRecommendations: {
      requiresSubDPS: false,
      amplifier: { bis: [], generalist: [], f2p: [] },
      sustain: { bis: [], generalist: [], f2p: [] },
    },
  },
  {
    id: 'lingsha',
    name: 'Lingsha',
    element: 'Fire',
    path: 'Abundance',
    rarity: 5,
    mainArchetype: 'Healer',
    labels: ['Healer', 'Break Support', 'Follow-up Attack'],
    teamRecommendations: {
      requiresSubDPS: false,
      amplifier: { bis: [], generalist: [], f2p: [] },
      sustain: { bis: [], generalist: [], f2p: [] },
    },
  },
  {
    id: 'aventurine',
    name: 'Aventurine',
    element: 'Imaginary',
    path: 'Preservation',
    rarity: 5,
    mainArchetype: 'Shielder',
    labels: ['Shielder', 'Follow-up Attack', 'Crit Support'],
    teamRecommendations: {
      requiresSubDPS: false,
      amplifier: { bis: [], generalist: [], f2p: [] },
      sustain: { bis: [], generalist: [], f2p: [] },
    },
  },
]

export const characters: Character[] = [
  ...breakDPSCharacters,
  ...bufferCharacters,
  ...dpsCharacters,
  ...supportCharacters,
  ...sustainCharacters,
  ...miscCharacters,
  ...newCharacters,
  ...essentialCharacters,
]