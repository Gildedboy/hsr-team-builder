import { test } from '../../src/fixtures/test.fixture.js'

test.describe('roster management', () => {
  test('user can enter roster edit mode', async ({ homePage, rosterPage }) => {
    await homePage.gotoHome()
    await rosterPage.expectReady()
    await rosterPage.enterEditMode()
  })

  test('user can stage and cancel roster availability changes', async ({ homePage, rosterPage }) => {
    await homePage.gotoHome()
    await rosterPage.expectReady()

    await rosterPage.enterEditMode()
    await rosterPage.hideAllNonFreeCharacters()
    await rosterPage.cancelEditMode()
  })
})
