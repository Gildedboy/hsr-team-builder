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

  test('includes the latest version in the versions list', async ({ versionsClient }) => {
    const response = await versionsClient.list()
    expectOkJson(response)

    const [versions, latest] = await Promise.all([versionsClient.listJson(), versionsClient.latestJson()])
    expect(Array.isArray(versions), 'versions response is an array').toBe(true)
    expect(versions.some((version) => version.version === latest.version)).toBe(true)
  })

  test('returns roadmap data as an array', async ({ versionsClient }) => {
    const response = await versionsClient.roadmap()
    expectOkJson(response)

    const roadmap = await versionsClient.roadmapJson()
    expect(Array.isArray(roadmap), 'roadmap response is an array').toBe(true)
  })
})
