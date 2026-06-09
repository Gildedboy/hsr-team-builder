import { apiTest as test, expect } from '../../src/fixtures/api.fixture.js'
import { expectOkJson, expectValidCharacter } from '../../src/assertions/api.assertions.js'

type LoginResponse = {
  access_token: string
}

const mutationTestsEnabled =
  process.env.TEST_ENV === 'qa' && process.env.ENABLE_API_MUTATION_TESTS === 'true'

test.describe('characters API mutations', () => {
  test.skip(
    !mutationTestsEnabled,
    'QA-only mutation test. Set TEST_ENV=qa and ENABLE_API_MUTATION_TESTS=true.',
  )

  test('updates a character, verifies the get response, then restores the original value', async ({
    request,
    charactersClient,
  }) => {
    const username = process.env.ADMIN_USERNAME
    const password = process.env.ADMIN_PASSWORD

    expect(username, 'ADMIN_USERNAME is required for QA mutation tests').toBeTruthy()
    expect(password, 'ADMIN_PASSWORD is required for QA mutation tests').toBeTruthy()

    const loginResponse = await request.post('/auth/login', {
      data: {
        username,
        password,
      },
      headers: {
        Accept: 'application/json',
      },
    })
    expectOkJson(loginResponse)

    const { access_token: accessToken } = (await loginResponse.json()) as LoginResponse
    expect(accessToken, 'admin access token').toEqual(expect.any(String))

    const originalCharacter = await charactersClient.getByIdJson('kafka')
    const originalLabels = originalCharacter.labels
    const qaLabel = `qa-automation-${Date.now()}`

    try {
      const updateResponse = await charactersClient.update(
        'kafka',
        { labels: [...originalLabels, qaLabel] },
        accessToken,
      )
      expectOkJson(updateResponse)

      const updatedCharacter = await charactersClient.getByIdJson('kafka')
      expectValidCharacter(updatedCharacter)
      expect(updatedCharacter.labels).toContain(qaLabel)
    } finally {
      const restoreResponse = await charactersClient.update(
        'kafka',
        { labels: originalLabels },
        accessToken,
      )
      expectOkJson(restoreResponse)
    }

    const restoredCharacter = await charactersClient.getByIdJson('kafka')
    expect(restoredCharacter.labels).toEqual(originalLabels)
  })
})
