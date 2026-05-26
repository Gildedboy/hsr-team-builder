import { expect, type Locator, type Page } from '@playwright/test'
import { BasePage } from './base.page.js'

export class HomePage extends BasePage {
  readonly title: Locator
  readonly filterHeading: Locator
  readonly rosterHeading: Locator
  readonly characterSearch: Locator
  readonly clearSelectionButton: Locator
  readonly resetFiltersButton: Locator

  constructor(page: Page) {
    super(page)
    this.title = page.getByRole('heading', { name: /honkai star rail team builder/i })
    this.filterHeading = page.getByRole('heading', { name: /filters/i })
    this.rosterHeading = page.getByRole('heading', { name: /my roster/i })
    this.characterSearch = page.getByPlaceholder('Search characters...').first()
    this.clearSelectionButton = page.getByRole('button', { name: /clear selection/i })
    this.resetFiltersButton = page.getByRole('button', { name: /reset/i }).first()
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

  async expectRecommendationsHidden(characterName: string): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: `Suggested Teammates for ${characterName}` }),
    ).toBeHidden()
    await expect(
      this.page.getByRole('heading', { name: `Suggested Teams for ${characterName}` }),
    ).toBeHidden()
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

  async expectRarityFilterInactive(rarity: 4 | 5): Promise<void> {
    await expect(this.page.getByRole('button', { name: `${rarity}★` })).not.toHaveClass(/active/)
  }

  async toggleElementFilter(element: string): Promise<void> {
    await this.page.locator('button.element-path-button').filter({ has: this.page.getByAltText(element) }).click()
  }

  async expectElementFilterActive(element: string): Promise<void> {
    await expect(
      this.page.locator('button.element-path-button').filter({ has: this.page.getByAltText(element) }),
    ).toHaveClass(/active/)
  }

  async expectElementFilterInactive(element: string): Promise<void> {
    await expect(
      this.page.locator('button.element-path-button').filter({ has: this.page.getByAltText(element) }),
    ).not.toHaveClass(/active/)
  }

  async togglePathFilter(path: string): Promise<void> {
    await this.page.locator('button.element-path-button').filter({ has: this.page.getByAltText(path) }).click()
  }

  async expectPathFilterActive(path: string): Promise<void> {
    await expect(
      this.page.locator('button.element-path-button').filter({ has: this.page.getByAltText(path) }),
    ).toHaveClass(/active/)
  }

  async expectPathFilterInactive(path: string): Promise<void> {
    await expect(
      this.page.locator('button.element-path-button').filter({ has: this.page.getByAltText(path) }),
    ).not.toHaveClass(/active/)
  }

  async toggleArchetypeFilter(archetype: string): Promise<void> {
    await this.page.getByRole('button', { name: archetype }).click()
  }

  async expectArchetypeFilterActive(archetype: string): Promise<void> {
    await expect(this.page.getByRole('button', { name: archetype })).toHaveClass(/filter-chip-active/)
  }

  async expectArchetypeFilterInactive(archetype: string): Promise<void> {
    await expect(this.page.getByRole('button', { name: archetype })).not.toHaveClass(/filter-chip-active/)
  }

  async resetFilters(): Promise<void> {
    await this.resetFiltersButton.click()
  }

  async expectCharacterCardAlignedWithFilters(characterName: string): Promise<void> {
    const card = this.page.locator('.character-item').filter({ hasText: characterName }).first()
    await expect(card).toBeVisible()
    await expect(card).toHaveCSS('opacity', '1')
  }

  async expectCharacterCardNotVisible(characterName: string): Promise<void> {
    const card = this.page.locator('.character-item').filter({ hasText: characterName }).first()
    await expect(card).toHaveCount(0)
  }
}
