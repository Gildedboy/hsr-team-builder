import { test as base } from '@playwright/test'
import { HomePage } from '../pages/home.page.js'
import { RosterPage } from '../pages/roster.page.js'
import { TopBarPage } from '../pages/top-bar.page.js'

type UiFixtures = {
  homePage: HomePage
  rosterPage: RosterPage
  topBarPage: TopBarPage
}

export const test = base.extend<UiFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  rosterPage: async ({ page }, use) => {
    await use(new RosterPage(page))
  },
  topBarPage: async ({ page }, use) => {
    await use(new TopBarPage(page))
  },
})

export { expect } from '@playwright/test'
