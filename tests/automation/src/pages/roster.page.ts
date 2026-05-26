import { expect, type Locator, type Page } from '@playwright/test'

export class RosterPage {
  readonly root: Locator
  readonly editRosterButton: Locator
  readonly hideAllButton: Locator
  readonly saveChangesButton: Locator
  readonly cancelButton: Locator

  constructor(private readonly page: Page) {
    this.root = page.getByRole('heading', { name: /my roster/i }).locator('..').locator('..')
    this.editRosterButton = page.getByRole('button', { name: /edit roster/i })
    this.hideAllButton = page.getByRole('button', { name: /hide all/i })
    this.saveChangesButton = page.getByRole('button', { name: /save changes/i })
    this.cancelButton = page.getByRole('button', { name: /cancel/i })
  }

  async expectReady(): Promise<void> {
    await expect(this.root).toBeVisible()
    await expect(this.editRosterButton).toBeVisible()
  }

  async enterEditMode(): Promise<void> {
    await this.editRosterButton.click()
    await expect(this.saveChangesButton).toBeVisible()
    await expect(this.cancelButton).toBeVisible()
  }

  async hideAllNonFreeCharacters(): Promise<void> {
    await this.hideAllButton.click()
    await expect(this.saveChangesButton).toBeEnabled()
  }

  async saveChanges(): Promise<void> {
    await this.saveChangesButton.click()
    await expect(this.editRosterButton).toBeVisible()
  }

  async cancelEditMode(): Promise<void> {
    await this.cancelButton.click()
    await expect(this.editRosterButton).toBeVisible()
  }

  async expectNotOwnedCountGreaterThan(count: number): Promise<void> {
    const countLabel = this.page.getByText(/not owned characters:/i).locator('strong')
    const value = Number((await countLabel.textContent())?.trim() ?? '0')
    expect(value, 'not owned character count').toBeGreaterThan(count)
  }

  async expectUnavailableCharactersVisible(): Promise<void> {
    await expect(this.page.locator('.unavailable-badge').first()).toBeVisible()
  }
}
