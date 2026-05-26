import { expect, type Locator, type Page } from '@playwright/test'
import { BasePage } from './base.page.js'

export class HomePage extends BasePage {
  readonly title: Locator
  readonly filterHeading: Locator
  readonly rosterHeading: Locator
  readonly characterSearch: Locator
  readonly clearSelectionButton: Locator

  constructor(page: Page) {
    super(page)
    this.title = page.getByRole('heading', { name: /honkai star rail team builder/i })
    this.filterHeading = page.getByRole('heading', { name: /filters/i })
    this.rosterHeading = page.getByRole('heading', { name: /my roster/i })
    this.characterSearch = page.getByPlaceholder('Search characters...').first()
    this.clearSelectionButton = page.getByRole('button', { name: /clear selection/i })
  }

  async gotoHome(): Promise<void> {
    await this.goto('/')
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toBeVisible()
    await expect(this.filterHeading).toBeVisible()
    await expect(this.rosterHeading).toBeVisible()
    await expect(this.characterSearch).toBeVisible()
  }

  async searchForCharacter(characterName: string): Promise<void> {
    await this.characterSearch.fill(characterName)
  }

  async selectCharacterFromSearch(characterName: string): Promise<void> {
    await this.searchForCharacter(characterName)

    // Search suggestions are custom divs today, so keep the selector isolated in the page object.
    const suggestion = this.page.locator('.search-suggestion-item').filter({ hasText: characterName }).first()
    await expect(suggestion).toBeVisible()
    await suggestion.click()
  }

  async expectCharacterDetailsVisible(characterName: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Character Details' })).toBeVisible()
    await expect(this.page.getByRole('heading', { name: characterName }).first()).toBeVisible()
    await expect(this.page.getByRole('heading', { name: /roles/i })).toBeVisible()
    await expect(this.page.getByRole('heading', { name: /archetypes/i })).toBeVisible()
  }

  async expectRecommendationsVisible(characterName: string): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: `Suggested Teammates for ${characterName}` }),
    ).toBeVisible()
    await expect(
      this.page.getByRole('heading', { name: `Suggested Teams for ${characterName}` }),
    ).toBeVisible()
  }

  async clearSelection(): Promise<void> {
    await this.clearSelectionButton.click()
    await expect(this.page.getByText(/select a character to see team recommendations/i)).toBeVisible()
  }

  async toggleRarityFilter(rarity: 4 | 5): Promise<void> {
    await this.page.getByRole('button', { name: `${rarity}★` }).click()
  }

  async expectRarityFilterActive(rarity: 4 | 5): Promise<void> {
    await expect(this.page.getByRole('button', { name: `${rarity}★` })).toHaveClass(/active/)
  }
}
