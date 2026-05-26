import type { APIResponse } from '@playwright/test'
import { BaseApiClient } from './base-api.client.js'
import type { Lightcone } from '../types/api.types.js'

export class LightconesClient extends BaseApiClient {
  async list(): Promise<APIResponse> {
    return this.get('/lightcones')
  }

  async getById(lightconeId: string): Promise<APIResponse> {
    return this.get(`/lightcones/${lightconeId}`)
  }

  async listJson(): Promise<Lightcone[]> {
    const response = await this.list()
    return this.parseJson<Lightcone[]>(response)
  }
}
