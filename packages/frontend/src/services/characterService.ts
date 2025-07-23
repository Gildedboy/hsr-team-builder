import type { Character } from '@hsr-team-builder/shared'

const API_BASE_URL = 'http://localhost:3001'

export class CharacterService {
  static async getAllCharacters(): Promise<Character[]> {
    console.log('🔄 Fetching characters from API...')
    const response = await fetch(`${API_BASE_URL}/characters`)
    if (!response.ok) {
      console.error('❌ Failed to fetch characters:', response.status, response.statusText)
      throw new Error('Failed to fetch characters')
    }
    const data = await response.json()
    console.log('✅ Successfully fetched', data.length, 'characters from API')
    return data
  }

  static async getCharacterById(id: string): Promise<Character> {
    const response = await fetch(`${API_BASE_URL}/characters/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch character ${id}`)
    }
    return response.json()
  }

  static async searchCharacters(query: string): Promise<Character[]> {
    const response = await fetch(`${API_BASE_URL}/characters?search=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error('Failed to search characters')
    }
    return response.json()
  }

  static async getCharactersByRole(role: string): Promise<Character[]> {
    const response = await fetch(`${API_BASE_URL}/characters?role=${encodeURIComponent(role)}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch characters by role ${role}`)
    }
    return response.json()
  }

  static async getCharactersByElement(element: string): Promise<Character[]> {
    const response = await fetch(
      `${API_BASE_URL}/characters?element=${encodeURIComponent(element)}`,
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch characters by element ${element}`)
    }
    return response.json()
  }

  static async getCharactersByPath(path: string): Promise<Character[]> {
    const response = await fetch(`${API_BASE_URL}/characters?path=${encodeURIComponent(path)}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch characters by path ${path}`)
    }
    return response.json()
  }
}
