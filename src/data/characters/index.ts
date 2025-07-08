import type { Character } from '@/types/Character'
import { breakDPSCharacters } from './breakDPS'

// Import other character files here as they're created
// import { bufferCharacters } from './buffers'
// import { dpsCharacters } from './dps'
// import { healerCharacters } from './healers'
// import { shielderCharacters } from './shielders'

export const characters: Character[] = [
  ...breakDPSCharacters,
  // Add other character arrays here
  
  // Temporary: Keep existing characters until migration is complete
  // Buffer - Alphabetical
  {
    id: 'bronya',
    name: 'Bronya',
    element: 'Wind',
    path: 'Harmony',
    rarity: 5,
    mainArchetype: 'Buffer',
    labels: ['Support', 'Buffer', 'Crit Support', 'Generalist'],
    teamRecommendations: {
      requiresSubDPS: false,
      mainDPS: {
        bis: [],
        generalist: [],
        f2p: [],
      },
      bufferDebuffer: {
        bis: [],
        generalist: [],
        f2p: [],
      },
      sustain: {
        bis: [],
        generalist: [],
        f2p: [],
      },
    },
  },
  // ... rest of characters (truncated for brevity)
]