import type { Character } from '@/types/Character'

export const breakDPSCharacters: Character[] = [
  {
    id: 'boothill',
    name: 'Boothill',
    element: 'Physical',
    path: 'Hunt',
    rarity: 5,
    mainArchetype: 'Break DPS',
    labels: ['Break DPS', 'Single Target', 'Implant Weakness'],
    teamRecommendations: {
      requiresSubDPS: false,
      amplifier: {
        bis: ['fugue', 'ruan-mei'],
        generalist: ['sunday'],
        f2p: ['bronya', 'harmony-trailblazer'],
      },
      sustain: {
        bis: ['lingsha'],
        generalist: ['hyacine', 'fu-xuan', 'huohuo'],
        f2p: ['gallagher'],
      },
    },
  },
  {
    id: 'firefly',
    name: 'Firefly',
    element: 'Fire',
    path: 'Destruction',
    rarity: 5,
    mainArchetype: 'Break DPS',
    labels: ['Break DPS', 'Super Break', 'Implant Weakness', 'Action Advance', 'Blast'],
    teamRecommendations: {
      requiresSubDPS: false,
      amplifier: {
        bis: ['ruan-mei', 'fugue'],
        generalist: [],
        f2p: ['harmony-trailblazer'],
      },
      sustain: {
        bis: ['lingsha'],
        generalist: ['huohuo'],
        f2p: ['gallagher'],
      },
    },
  },
  {
    id: 'rappa',
    name: 'Rappa',
    element: 'Imaginary',
    path: 'Erudition',
    rarity: 5,
    mainArchetype: 'Break DPS',
    labels: ['Break DPS', 'AoE', 'Blast', 'Super Break'],
    teamRecommendations: {
      requiresSubDPS: false,
      amplifier: {
        bis: ['fugue', 'ruan-mei'],
        generalist: [],
        f2p: ['harmony-trailblazer'],
      },
      sustain: {
        bis: ['lingsha'],
        generalist: ['huohuo'],
        f2p: ['gallagher'],
      },
    },
  },
]