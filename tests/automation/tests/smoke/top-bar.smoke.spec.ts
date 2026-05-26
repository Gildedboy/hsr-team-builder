import { test } from '../../src/fixtures/test.fixture.js'

test.describe('top bar smoke', () => {
  test('contact form opens with required fields', async ({ homePage, topBarPage }) => {
    await homePage.gotoHome()

    await topBarPage.openContactModal()
    await topBarPage.expectContactFormReady()
  })

  test('trailblazer avatar toggles are interactive', async ({ homePage, topBarPage }) => {
    await homePage.gotoHome()

    await topBarPage.selectTrailblazerAvatar('Caelus')
    await topBarPage.selectTrailblazerAvatar('Stelle')
  })
})
