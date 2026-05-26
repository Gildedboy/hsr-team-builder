import type { APIResponse } from '@playwright/test'
import { BaseApiClient } from './base-api.client.js'
import type { TeamRecommendation } from '../types/api.types.js'

export class TeamsClient extends BaseApiClient {
  async popular(): Promise<APIResponse> {
    return this.get('/teams/popular')
  }

  async recommendations(characterId: string): Promise<APIResponse> {
    return this.get(`/teams/recommendations/${characterId}`)
  }

  async popularJson(): Promise<TeamRecommendation[]> {
    const response = await this.popular()
    return this.parseJson<TeamRecommendation[]>(response)
  }

  async recommendationsJson(characterId: string): Promise<TeamRecommendation[]> {
    const response = await this.recommendations(characterId)
    return this.parseJson<TeamRecommendation[]>(response)
  }
}
