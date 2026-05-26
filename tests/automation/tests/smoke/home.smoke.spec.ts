import { expect, test } from '../../src/fixtures/test.fixture.js'
import { collectCriticalConsoleErrors } from '../../src/helpers/console.helpers.js'
import { expectHomeSmokeReady } from '../../src/flows/home-smoke.flow.js'

test.describe('home smoke', () => {
  test('loads the app shell without a blank page or critical runtime errors', async ({ page, homePage }) => {
    const consoleErrors = collectCriticalConsoleErrors(page)

    await expectHomeSmokeReady(homePage)

    expect(consoleErrors, 'critical console and page errors').toEqual([])
  })
})
