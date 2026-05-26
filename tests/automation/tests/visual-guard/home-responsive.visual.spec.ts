import { expect, test } from '../../src/fixtures/test.fixture.js'
import { expectVisibleWithinViewport } from '../../src/assertions/ui.assertions.js'

test.describe('home responsive guard', () => {
  test('critical home regions are visible', async ({ page, homePage }) => {
    await homePage.gotoHome()
    await homePage.expectLoaded()

    await expectVisibleWithinViewport(homePage.title)
    await expect(page.getByText(/select a character on the main grid/i)).toBeVisible()
  })
})
