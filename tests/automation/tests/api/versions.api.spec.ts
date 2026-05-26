import { apiTest as test, expect } from '../../src/fixtures/api.fixture.js'
import { expectOkJson, expectValidVersionInfo } from '../../src/assertions/api.assertions.js'

test.describe('versions API', () => {
  test('returns the latest version contract', async ({ versionsClient }) => {
    const response = await versionsClient.latest()
    expectOkJson(response)

    const version = await versionsClient.latestJson()
    expectValidVersionInfo(version)
  })

  test('returns changelog data', async ({ versionsClient }) => {
    const response = await versionsClient.changelog()
    expectOkJson(response)

    const changelog = await versionsClient.changelogJson()
    expect(Array.isArray(changelog), 'changelog response is an array').toBe(true)
  })
})
