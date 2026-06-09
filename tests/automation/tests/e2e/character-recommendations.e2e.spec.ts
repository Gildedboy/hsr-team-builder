import { test } from '../../src/fixtures/test.fixture.js'

test.describe('character recommendations', () => {
  test('user can search for Kafka and view recommendation sections', async ({ homePage }) => {
    await homePage.gotoHome()

    await homePage.selectCharacterFromSearch('Kafka')

    await homePage.expectCharacterDetailsVisible('Kafka')
    await homePage.expectRecommendationsVisible('Kafka')
  })

  test('user can clear a selected character and return to the empty recommendation state', async ({
    homePage,
  }) => {
    await homePage.gotoHome()
    await homePage.selectCharacterFromSearch('Kafka')

    await homePage.clearSelection()
  })

  test('user can choose a character, choose another, and see the page update', async ({
    homePage,
  }) => {
    await homePage.gotoHome()
    await homePage.selectCharacterFromSearch('Kafka')
    await homePage.expectCharacterDetailsVisible('Kafka')
    await homePage.expectRecommendationsVisible('Kafka')

    await homePage.selectCharacterFromSearch('Firefly')

    await homePage.expectCharacterDetailsVisible('Firefly')
    await homePage.expectRecommendationsVisible('Firefly')
    await homePage.expectRecommendationsHidden('Kafka')
  })
})
