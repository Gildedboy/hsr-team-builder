import { apiTest as test, expect } from '../../src/fixtures/api.fixture.js'
import { expectOkJson, expectValidLightcone } from '../../src/assertions/api.assertions.js'

test.describe('lightcones API', () => {
  test('returns lightcones with the expected contract', async ({ lightconesClient }) => {
    const response = await lightconesClient.list()
    expectOkJson(response)

    const lightcones = await lightconesClient.listJson()
    expect(Array.isArray(lightcones), 'lightcones response is an array').toBe(true)
    if (lightcones.length > 0) {
      expectValidLightcone(lightcones[0])
    }
  })
})
