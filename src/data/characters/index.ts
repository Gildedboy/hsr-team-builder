import type { Character } from '@/types/Character'
import { breakDPSCharacters } from './breakDPS'
import { bufferCharacters } from './buffers'

// Essential characters for functionality
const essentialCharacters: Character[] = [
  {
    id: 'feixiao',
    name: 'Feixiao',
    element: 'Wind',
    path: 'Hunt',
    rarity: 5,
    mainArchetype: 'DPS',
    labels: ['DPS', 'Follow-up Attack', 'Ultimate Based'],
    teamRecommendations: {
      requiresSubDPS: true,
      subDPS: {
        bis: ['cipher'],
        generalist: ['topaz'],
        f2p: ['hunt-march-7th', 'moze'],
      },
      bufferDebuffer: {
        bis: ['robin'],
        generalist: ['tribbie'],
        f2p: ['bronya'],
      },
      sustain: {
        bis: ['aventurine', 'lingsha'],
        generalist: [],
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
      bufferDebuffer: { bis: [], generalist: [], f2p: [] },
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
      bufferDebuffer: { bis: [], generalist: [], f2p: [] },
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
      bufferDebuffer: { bis: [], generalist: [], f2p: [] },
      sustain: { bis: [], generalist: [], f2p: [] },
    },
  },
]

export const characters: Character[] = [
  ...breakDPSCharacters,
  ...bufferCharacters,
  ...essentialCharacters,
]