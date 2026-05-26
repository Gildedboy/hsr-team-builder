import { expect, type Locator, type Page } from '@playwright/test'

export class RosterPage {
  readonly root: Locator
  readonly editRosterButton: Locator

  constructor(private readonly page: Page) {
    this.root = page.getByRole('heading', { name: /my roster/i }).locator('..').locator('..')
    this.editRosterButton = page.getByRole('button', { name: /edit roster/i })
  }

  async expectReady(): Promise<void> {
    await expect(this.root).toBeVisible()
    await expect(this.editRosterButton).toBeVisible()
  }

  async enterEditMode(): Promise<void> {
    await this.editRosterButton.click()
    await expect(this.page.getByRole('button', { name: /save changes/i })).toBeVisible()
  }
}
