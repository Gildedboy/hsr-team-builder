import type { APIRequestContext, APIResponse } from '@playwright/test'

export class BaseApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected async get(path: string): Promise<APIResponse> {
    return this.request.get(path, {
      headers: {
        Accept: 'application/json',
      },
    })
  }

  protected async parseJson<T>(response: APIResponse): Promise<T> {
    return (await response.json()) as T
  }
}
