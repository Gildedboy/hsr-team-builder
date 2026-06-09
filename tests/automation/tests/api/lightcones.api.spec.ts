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

  test('returns a lightcone detail for an id from the list', async ({ lightconesClient }) => {
    const lightcones = await lightconesClient.listJson()
    expect(lightcones.length, 'lightcones are seeded').toBeGreaterThan(0)

    const response = await lightconesClient.getById(lightcones[0].id)
    expectOkJson(response)

    const lightcone = await lightconesClient.getByIdJson(lightcones[0].id)
    expectValidLightcone(lightcone)
    expect(lightcone.id).toBe(lightcones[0].id)
  })
})
