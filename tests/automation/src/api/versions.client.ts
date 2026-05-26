import type { APIResponse } from '@playwright/test'
import { BaseApiClient } from './base-api.client.js'
import type { VersionInfo } from '../types/api.types.js'

export class VersionsClient extends BaseApiClient {
  async list(): Promise<APIResponse> {
    return this.get('/versions')
  }

  async latest(): Promise<APIResponse> {
    return this.get('/versions/latest')
  }

  async changelog(): Promise<APIResponse> {
    return this.get('/versions/changelog')
  }

  async roadmap(): Promise<APIResponse> {
    return this.get('/versions/roadmap')
  }

  async latestJson(): Promise<VersionInfo> {
    const response = await this.latest()
    return this.parseJson<VersionInfo>(response)
  }

  async changelogJson(): Promise<VersionInfo[]> {
    const response = await this.changelog()
    return this.parseJson<VersionInfo[]>(response)
  }
}
