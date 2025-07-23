export interface TeamRecommendation {
  id: string
  name: string
  description: string
  characters: Character[]
  synergy: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  cost: 'F2P' | 'Low' | 'Medium' | 'High'
}

import type { Character } from '@hsr-team-builder/shared'

const API_BASE_URL = 'http://localhost:3000'

export class TeamService {
  static async getPopularTeams(): Promise<TeamRecommendation[]> {
    const response = await fetch(`${API_BASE_URL}/teams/popular`)
    if (!response.ok) {
      throw new Error('Failed to fetch popular teams')
    }
    return response.json()
  }

  static async getTeamRecommendations(characterId: string): Promise<TeamRecommendation[]> {
    const response = await fetch(`${API_BASE_URL}/teams/recommendations/${characterId}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch team recommendations for character ${characterId}`)
    }
    return response.json()
  }
}
