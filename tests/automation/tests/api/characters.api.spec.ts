import { apiTest as test, expect } from '../../src/fixtures/api.fixture.js'
import { expectOkJson, expectValidCharacter } from '../../src/assertions/api.assertions.js'

test.describe('characters API', () => {
  test('returns character summaries with the expected contract', async ({ charactersClient }) => {
    const response = await charactersClient.list()
    expectOkJson(response)

    const characters = await charactersClient.listJson()
    expect(Array.isArray(characters), 'characters response is an array').toBe(true)
    expect(characters.length, 'characters are seeded').toBeGreaterThan(0)
    expectValidCharacter(characters[0])
  })

  test('filters characters by search query', async ({ charactersClient }) => {
    const response = await charactersClient.list({ search: 'kafka' })
    expectOkJson(response)

    const characters = await charactersClient.listJson({ search: 'kafka' })
    expect(Array.isArray(characters), 'search response is an array').toBe(true)
    expect(characters.some((character) => character.name.toLowerCase().includes('kafka'))).toBe(true)
  })
})
