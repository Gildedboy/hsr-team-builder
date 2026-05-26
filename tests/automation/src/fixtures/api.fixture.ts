import { test as base } from '@playwright/test'
import { CharactersClient } from '../api/characters.client.js'
import { LightconesClient } from '../api/lightcones.client.js'
import { TeamsClient } from '../api/teams.client.js'
import { VersionsClient } from '../api/versions.client.js'

type ApiFixtures = {
  charactersClient: CharactersClient
  teamsClient: TeamsClient
  versionsClient: VersionsClient
  lightconesClient: LightconesClient
}

export const apiTest = base.extend<ApiFixtures>({
  charactersClient: async ({ request }, use) => {
    await use(new CharactersClient(request))
  },
  teamsClient: async ({ request }, use) => {
    await use(new TeamsClient(request))
  },
  versionsClient: async ({ request }, use) => {
    await use(new VersionsClient(request))
  },
  lightconesClient: async ({ request }, use) => {
    await use(new LightconesClient(request))
  },
})

export { expect } from '@playwright/test'
