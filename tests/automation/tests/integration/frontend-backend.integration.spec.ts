import { expect, test } from '../../src/fixtures/test.fixture.js'

test.describe('frontend/backend integration', () => {
  test('home page remains usable while character data loads from the configured backend', async ({ page, homePage }) => {
    await homePage.gotoHome()
    await homePage.expectLoaded()
    await expect(page.getByText(/select a character to see team recommendations/i)).toBeVisible()
  })
})
