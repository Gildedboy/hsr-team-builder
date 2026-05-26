import { expect, type Locator, type Page } from '@playwright/test'

export class TopBarPage {
  readonly contactButton: Locator
  readonly contactType: Locator
  readonly contactMessage: Locator
  readonly sendMessageButton: Locator
  readonly stelleToggle: Locator
  readonly caelusToggle: Locator

  constructor(private readonly page: Page) {
    this.contactButton = page.getByRole('button', { name: /contact/i })
    this.contactType = page.getByLabel(/type:/i)
    this.contactMessage = page.getByLabel(/message:/i)
    this.sendMessageButton = page.getByRole('button', { name: /send message/i })
    this.stelleToggle = page.getByRole('button', { name: /use stelle trailblazer avatar/i })
    this.caelusToggle = page.getByRole('button', { name: /use caelus trailblazer avatar/i })
  }

  async openContactModal(): Promise<void> {
    await this.contactButton.click()
    await expect(this.page.getByRole('heading', { name: 'Contact' })).toBeVisible()
  }

  async expectContactFormReady(): Promise<void> {
    await expect(this.contactType).toBeVisible()
    await expect(this.contactMessage).toBeVisible()
    await expect(this.sendMessageButton).toBeVisible()
  }

  async selectTrailblazerAvatar(avatar: 'Stelle' | 'Caelus'): Promise<void> {
    const toggle = avatar === 'Stelle' ? this.stelleToggle : this.caelusToggle
    await toggle.click()
    await expect(toggle).toHaveClass(/active/)
  }

  async expectTrailblazerAvatarSelected(avatar: 'Stelle' | 'Caelus'): Promise<void> {
    const activeToggle = avatar === 'Stelle' ? this.stelleToggle : this.caelusToggle
    const inactiveToggle = avatar === 'Stelle' ? this.caelusToggle : this.stelleToggle

    await expect(activeToggle).toHaveClass(/active/)
    await expect(inactiveToggle).not.toHaveClass(/active/)
  }

  async expectTrailblazerPreferenceStored(avatar: 'Stelle' | 'Caelus'): Promise<void> {
    const storedVariant = await this.page.evaluate(() =>
      window.localStorage.getItem('hsr-team-builder:trailblazer-avatar-variant:v1'),
    )
    expect(storedVariant).toBe(avatar === 'Stelle' ? 'stelle' : 'caelus')
  }
}
