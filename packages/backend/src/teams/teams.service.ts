import { Injectable } from '@nestjs/common'
import { CharactersService } from '../characters/characters.service'
import { Character } from '../types/Character'

export interface TeamRecommendation {
  id: string
  name: string
  description: string
  characters: Character[]
  synergy: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  cost: 'F2P' | 'Low' | 'Medium' | 'High'
}

@Injectable()
export class TeamsService {
  constructor(private readonly charactersService: CharactersService) {}

  async generateTeamRecommendations(mainCharacterId: string): Promise<TeamRecommendation[]> {
    const mainCharacter = await this.charactersService.findById(mainCharacterId)
    if (!mainCharacter) {
      return []
    }

    const recommendations: TeamRecommendation[] = []

    // Generate teams based on the character's team compositions
    if (mainCharacter.teamCompositions) {
      for (const [index, composition] of mainCharacter.teamCompositions.entries()) {
        // Use the bis (best in slot) team variant
        const teamCharacterPromises = composition.bis.characters.map((id) =>
          this.charactersService.findById(id),
        )
        const teamCharacters = (await Promise.all(teamCharacterPromises)).filter(
          (char) => char !== undefined,
        ) as Character[]

        if (teamCharacters.length >= 3) {
          recommendations.push({
            id: `${mainCharacterId}-team-${index + 1}`,
            name: `${mainCharacter.name} - ${composition.name}`,
            description:
              composition.bis.description ||
              `Optimized team composition for ${mainCharacter.name} as ${composition.role}`,
            characters: teamCharacters,
            synergy: this.calculateSynergy(teamCharacters),
            difficulty: this.calculateDifficulty(teamCharacters),
            cost: this.calculateCost(teamCharacters),
          })
        }

        // Also add F2P variant if available
        if (composition.f2p) {
          const f2pCharacterPromises = composition.f2p.characters.map((id) =>
            this.charactersService.findById(id),
          )
          const f2pTeamCharacters = (await Promise.all(f2pCharacterPromises)).filter(
            (char) => char !== undefined,
          ) as Character[]

          if (f2pTeamCharacters.length >= 3) {
            recommendations.push({
              id: `${mainCharacterId}-f2p-team-${index + 1}`,
              name: `${mainCharacter.name} - ${composition.name} (F2P)`,
              description:
                composition.f2p.description ||
                `F2P team composition for ${mainCharacter.name} as ${composition.role}`,
              characters: f2pTeamCharacters,
              synergy: this.calculateSynergy(f2pTeamCharacters),
              difficulty: this.calculateDifficulty(f2pTeamCharacters),
              cost: this.calculateCost(f2pTeamCharacters),
            })
          }
        }
      }
    }

    return recommendations
  }

  async getPopularTeams(): Promise<TeamRecommendation[]> {
    const allCharacters = await this.charactersService.findAll()
    const popularTeams: TeamRecommendation[] = []

    // Get some popular DPS characters and their teams
    const popularDPS = allCharacters
      .filter((char) => char.roles.includes('DPS') && char.rarity === 5)
      .slice(0, 5)

    for (const char of popularDPS) {
      const teams = await this.generateTeamRecommendations(char.id)
      if (teams.length > 0) {
        popularTeams.push(teams[0]) // Take the first recommended team
      }
    }

    return popularTeams
  }

  private calculateSynergy(characters: Character[]): string[] {
    const synergies: string[] = []

    // Check for common archetypes
    const archetypes = characters.flatMap((char) => char.archetype)
    const uniqueArchetypes = [...new Set(archetypes)]

    if (uniqueArchetypes.includes('Follow-up')) {
      synergies.push('Follow-up Attack synergy')
    }

    if (uniqueArchetypes.includes('Break-DPS')) {
      synergies.push('Break Effect synergy')
    }

    if (uniqueArchetypes.includes('DoT')) {
      synergies.push('Damage over Time synergy')
    }

    // Check for role balance
    const roles = characters.flatMap((char) => char.roles)
    if (roles.includes('DPS') && roles.includes('SUPPORT') && roles.includes('SUSTAIN')) {
      synergies.push('Balanced team composition')
    }

    return synergies
  }

  private calculateDifficulty(characters: Character[]): 'Easy' | 'Medium' | 'Hard' {
    const complexCharacters = characters.filter(
      (char) =>
        char.labels.includes('SP Unfriendly') ||
        char.labels.includes('Energy-Hungry') ||
        char.archetype.includes('Ultimate-Based'),
    )

    if (complexCharacters.length >= 2) return 'Hard'
    if (complexCharacters.length === 1) return 'Medium'
    return 'Easy'
  }

  private calculateCost(characters: Character[]): 'F2P' | 'Low' | 'Medium' | 'High' {
    const fiveStars = characters.filter((char) => char.rarity === 5).length

    if (fiveStars === 0) return 'F2P'
    if (fiveStars === 1) return 'Low'
    if (fiveStars === 2) return 'Medium'
    return 'High'
  }
}
