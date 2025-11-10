import type { LightconePath, LightconeRarity } from './CharacterEnums'

export interface Lightcone {
  id: string
  name: string
  rarity: LightconeRarity
  path: LightconePath
}

// Helper function to get lightcone rarity color
export function getLightconeRarityColor(rarity: LightconeRarity): string {
  switch (rarity) {
    case 3:
      return '#4a90e2' // Blue
    case 4:
      return '#8a5fcc' // Purple
    case 5:
      return '#ffd700' // Gold
    default:
      return '#ffffff' // White fallback
  }
}
