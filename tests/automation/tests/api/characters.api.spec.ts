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

  test('returns a real character detail by id', async ({ charactersClient }) => {
    const response = await charactersClient.getById('kafka')
    expectOkJson(response)

    const character = await charactersClient.getByIdJson('kafka')
    expectValidCharacter(character)
    expect(character.id).toBe('kafka')
    expect(character.name).toBe('Kafka')
  })

  test('filters characters by role, element, and path', async ({ charactersClient }) => {
    const response = await charactersClient.list({
      role: 'DPS',
      element: 'Lightning',
      path: 'Nihility',
    })
    expectOkJson(response)

    const characters = await charactersClient.listJson({
      role: 'DPS',
      element: 'Lightning',
      path: 'Nihility',
    })

    expect(characters.length, 'filtered characters are seeded').toBeGreaterThan(0)
    for (const character of characters) {
      expect(character.roles).toContain('DPS')
      expect(character.element).toBe('Lightning')
      expect(character.path).toBe('Nihility')
    }
  })
})
