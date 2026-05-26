import { test } from '../../src/fixtures/test.fixture.js'

test.describe('character filters', () => {
  test('user can apply and clear a rarity filter', async ({ homePage }) => {
    await homePage.gotoHome()

    await homePage.toggleRarityFilter(5)
    await homePage.expectRarityFilterActive(5)

    await homePage.toggleRarityFilter(5)
  })
})
