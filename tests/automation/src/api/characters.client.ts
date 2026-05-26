import type { APIResponse } from '@playwright/test'
import { BaseApiClient } from './base-api.client.js'
import type { CharacterSummary } from '../types/api.types.js'

export class CharactersClient extends BaseApiClient {
  async list(params?: {
    role?: string
    element?: string
    path?: string
    search?: string
  }): Promise<APIResponse> {
    const searchParams = new URLSearchParams()

    if (params?.role) searchParams.set('role', params.role)
    if (params?.element) searchParams.set('element', params.element)
    if (params?.path) searchParams.set('path', params.path)
    if (params?.search) searchParams.set('search', params.search)

    const query = searchParams.toString()
    return this.get(`/characters${query ? `?${query}` : ''}`)
  }

  async getById(characterId: string): Promise<APIResponse> {
    return this.get(`/characters/${characterId}`)
  }

  async update(
    characterId: string,
    payload: Partial<CharacterSummary>,
    accessToken: string,
  ): Promise<APIResponse> {
    return this.request.patch(`/characters/${characterId}`, {
      data: payload,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  async listJson(params?: Parameters<CharactersClient['list']>[0]): Promise<CharacterSummary[]> {
    const response = await this.list(params)
    return this.parseJson<CharacterSummary[]>(response)
  }

  async getByIdJson(characterId: string): Promise<CharacterSummary> {
    const response = await this.getById(characterId)
    return this.parseJson<CharacterSummary>(response)
  }
}
