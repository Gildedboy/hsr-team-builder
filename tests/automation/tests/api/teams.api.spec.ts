import { apiTest as test, expect } from '../../src/fixtures/api.fixture.js'
import { expectOkJson, expectValidTeamRecommendation } from '../../src/assertions/api.assertions.js'

test.describe('teams API', () => {
  test('returns popular team recommendations', async ({ teamsClient }) => {
    const response = await teamsClient.popular()
    expectOkJson(response)

    const teams = await teamsClient.popularJson()
    expect(Array.isArray(teams), 'popular teams response is an array').toBe(true)
    if (teams.length > 0) {
      expectValidTeamRecommendation(teams[0])
    }
  })

  test('returns recommendations for a real character id', async ({ teamsClient }) => {
    const response = await teamsClient.recommendations('kafka')
    expectOkJson(response)

    const teams = await teamsClient.recommendationsJson('kafka')
    expect(Array.isArray(teams), 'character recommendations response is an array').toBe(true)
  })
})
