import { expect, type Locator, type Page } from '@playwright/test'
import { BasePage } from './base.page.js'

export class HomePage extends BasePage {
  readonly title: Locator
  readonly filterHeading: Locator
  readonly rosterHeading: Locator
  readonly characterSearch: Locator

  constructor(page: Page) {
    super(page)
    this.title = page.getByRole('heading', { name: /honkai star rail team builder/i })
    this.filterHeading = page.getByRole('heading', { name: /filters/i })
    this.rosterHeading = page.getByRole('heading', { name: /my roster/i })
    this.characterSearch = page.getByPlaceholder('Search characters...').first()
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
}
