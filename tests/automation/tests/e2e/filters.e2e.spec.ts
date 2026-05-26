import { test } from '../../src/fixtures/test.fixture.js'

test.describe('character filters', () => {
  test('user can apply and clear a rarity filter', async ({ homePage }) => {
    await homePage.gotoHome()

    await homePage.toggleRarityFilter(5)
    await homePage.expectRarityFilterActive(5)

    await homePage.toggleRarityFilter(5)
    await homePage.expectRarityFilterInactive(5)
  })

  test('user can combine filters and reset them from the filter panel', async ({ homePage }) => {
    await homePage.gotoHome()

    await homePage.toggleRarityFilter(5)
    await homePage.toggleElementFilter('Lightning')
    await homePage.togglePathFilter('Nihility')
    await homePage.toggleArchetypeFilter('DoT')

    await homePage.expectRarityFilterActive(5)
    await homePage.expectElementFilterActive('Lightning')
    await homePage.expectPathFilterActive('Nihility')
    await homePage.expectArchetypeFilterActive('DoT')

    await homePage.resetFilters()

    await homePage.expectRarityFilterInactive(5)
    await homePage.expectElementFilterInactive('Lightning')
    await homePage.expectPathFilterInactive('Nihility')
    await homePage.expectArchetypeFilterInactive('DoT')
  })

  test('path and element filters visually align the character grid', async ({ homePage }) => {
    await homePage.gotoHome()

    await homePage.toggleElementFilter('Lightning')
    await homePage.togglePathFilter('Nihility')

    await homePage.expectElementFilterActive('Lightning')
    await homePage.expectPathFilterActive('Nihility')
    await homePage.expectCharacterCardAlignedWithFilters('Kafka')
    await homePage.expectCharacterCardNotVisible('Firefly')
  })
})
