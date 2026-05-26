import { expect, type Page } from '@playwright/test'
import { expectNoBlankPage } from '../assertions/ui.assertions.js'

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path)
  }

  async expectNoBlankPage(): Promise<void> {
    await expectNoBlankPage(this.page)
  }

  async expectAppShellReady(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /honkai star rail team builder/i })).toBeVisible()
  }
}
