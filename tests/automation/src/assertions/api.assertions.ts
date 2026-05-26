import { expect, type APIResponse } from '@playwright/test'
import type { CharacterSummary, Lightcone, TeamRecommendation, VersionInfo } from '../types/api.types.js'

export function expectOkJson(response: APIResponse): void {
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type'], 'content type').toMatch(/application\/json/i)
}

export function expectValidCharacter(character: CharacterSummary): void {
  expect(character.id, 'character id').toEqual(expect.any(String))
  expect(character.name, 'character name').toEqual(expect.any(String))
  expect(character.element, 'character element').toEqual(expect.any(String))
  expect(character.path, 'character path').toEqual(expect.any(String))
  expect(character.rarity, 'character rarity').toEqual(expect.any(Number))
  expect(Array.isArray(character.roles), 'character roles').toBe(true)
  expect(Array.isArray(character.labels), 'character labels').toBe(true)
}

export function expectValidTeamRecommendation(team: TeamRecommendation): void {
  expect(typeof team, 'team recommendation shape').toBe('object')
  expect(team).not.toBeNull()
}

export function expectValidVersionInfo(version: VersionInfo): void {
  expect(version.version, 'version id').toEqual(expect.any(String))
}

export function expectValidLightcone(lightcone: Lightcone): void {
  expect(lightcone.id, 'lightcone id').toEqual(expect.any(String))
  expect(lightcone.name, 'lightcone name').toEqual(expect.any(String))
  expect(lightcone.path, 'lightcone path').toEqual(expect.any(String))
  expect(lightcone.rarity, 'lightcone rarity').toEqual(expect.any(Number))
}
