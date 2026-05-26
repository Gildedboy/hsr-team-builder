import { expect } from '@playwright/test'
import type { HomePage } from '../pages/home.page.js'

export async function expectHomeSmokeReady(homePage: HomePage): Promise<void> {
  await homePage.gotoHome()
  await homePage.expectNoBlankPage()
  await homePage.expectLoaded()
  await expect(homePage.characterSearch).toBeEditable()
}
