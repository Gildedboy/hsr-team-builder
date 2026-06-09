# Automation Overview for Students

This document explains the Playwright automation package at a high level. It focuses only on the `tests/automation` folder.

## Big Picture

The automation tests are organized so specs stay simple and readable.

The main idea is:

1. A test asks for a fixture, such as `homePage` or `charactersClient`.
2. The fixture creates the page object or API client needed by the test.
3. The test calls high-level methods like `gotoHome()`, `selectCharacterFromSearch()`, or `listJson()`.
4. Page objects, API clients, and assertion helpers hide the low-level Playwright details.
5. Playwright config controls browsers, retries, screenshots, traces, and base URLs.

This keeps the tests focused on behavior instead of repeating selectors, URLs, or request details everywhere.

## Test Groups

The test files live under `tests/automation/tests`.

| Folder | Purpose |
| --- | --- |
| `tests/smoke` | Quick checks that the most important UI parts load and basic controls work. |
| `tests/e2e` | User flows that combine multiple actions, such as searching characters, using filters, and editing the roster. |
| `tests/api` | Backend contract checks using Playwright API requests. |
| `tests/integration` | Confirms the home page remains usable while configured backend data loads. |
| `tests/visual-guard` | Lightweight responsive guard for important home page regions. |

## UI Tests

UI specs import `test` from:

```ts
src/fixtures/test.fixture.ts
```

That fixture gives each test access to:

| Fixture | What it gives the test |
| --- | --- |
| `homePage` | Methods for loading the home page, searching characters, checking recommendations, and using rarity filters. |
| `rosterPage` | Methods for roster edit mode, hiding non-free characters, saving state checks, and canceling edits. |
| `topBarPage` | Methods for opening the contact modal and toggling the Trailblazer avatar. |

Example flow:

```txt
test -> homePage fixture -> HomePage object -> Playwright page actions/assertions
```

So instead of writing raw locator code in every test, the test can say:

```ts
await homePage.gotoHome()
await homePage.selectCharacterFromSearch('Kafka')
await homePage.expectRecommendationsVisible('Kafka')
```

## Page Objects

Page objects live under `src/pages`.

| File | Role |
| --- | --- |
| `base.page.ts` | Shared page behavior, such as `goto()`, blank-page checks, and app shell checks. |
| `home.page.ts` | Home page interactions: load checks, character search, selecting a character, recommendations, clear selection, and rarity filters. |
| `roster.page.ts` | Roster interactions: ready checks, edit mode, hide-all action, and canceling edits. |
| `top-bar.page.ts` | Header interactions: contact modal and avatar toggle checks. |

Page objects are the place where selectors live. Tests should call page object methods instead of duplicating selector details.

## API Tests

API specs import `apiTest` from:

```ts
src/fixtures/api.fixture.ts
```

That fixture gives each API test typed clients:

| Fixture | Client | What it covers |
| --- | --- | --- |
| `charactersClient` | `CharactersClient` | Character list, search filters, and character lookup. |
| `teamsClient` | `TeamsClient` | Popular teams and recommendations for a character. |
| `versionsClient` | `VersionsClient` | Latest version, changelog, roadmap, and version list. |
| `lightconesClient` | `LightconesClient` | Lightcone list and lightcone lookup. |

The clients live under `src/api`. They all extend `BaseApiClient`, which centralizes common request behavior like sending JSON `Accept` headers and parsing JSON responses.

## Assertion Helpers

Reusable assertions live under `src/assertions`.

| File | Purpose |
| --- | --- |
| `api.assertions.ts` | Checks common API contracts, such as `200` JSON responses and expected object shapes. |
| `ui.assertions.ts` | Checks UI conditions, such as the page not being blank or a locator being visible inside the viewport. |

These helpers make tests easier to read and keep repeated validation logic in one place.

## Flow Helper

The home smoke flow lives in:

```ts
src/flows/home-smoke.flow.ts
```

It combines the repeated home page smoke steps:

```txt
go to home -> check page is not blank -> check home page loaded -> check search is editable
```

The smoke spec uses this helper so the test reads like a single business-level check instead of a list of small setup actions.

## Console Error Hook

The console helper lives in:

```ts
src/helpers/console.helpers.ts
```

`collectCriticalConsoleErrors(page)` attaches listeners to the Playwright `page`:

| Listener | What it watches |
| --- | --- |
| `page.on('console')` | Browser console errors. |
| `page.on('pageerror')` | Runtime exceptions thrown by the page. |

The home smoke test starts this collector before loading the app. After the page loads, it expects the collected critical errors list to be empty.

Some known noisy network-style errors are ignored so the test focuses on meaningful runtime failures.

## Playwright Config

The main config is:

```ts
playwright.config.ts
```

It controls:

| Config Area | What it does |
| --- | --- |
| `testDir` | Runs specs from `tests/automation/tests`. |
| `baseURL` | Uses the configured frontend URL for UI tests. |
| API project `baseURL` | Uses the configured backend/API URL for API tests. |
| `projects` | Runs Chromium UI tests, mobile smoke/visual tests, and API tests separately. |
| `retries` | Retries only in CI. |
| `trace`, `screenshot`, `video` | Keeps debugging artifacts when tests fail. |

The config is also where the framework separates UI specs from API specs.

## How Everything Works Together

For a UI test:

```txt
spec file
  -> imports test fixture
  -> asks for homePage / rosterPage / topBarPage
  -> fixture creates page object
  -> page object uses Playwright locators and assertions
  -> config decides browser, base URL, retries, and artifacts
```

For an API test:

```txt
spec file
  -> imports apiTest fixture
  -> asks for charactersClient / teamsClient / versionsClient / lightconesClient
  -> fixture creates API client
  -> client sends request through Playwright request context
  -> assertion helper validates response status, content type, and data shape
  -> config points API tests at the API base URL
```

The result is a layered test framework:

```txt
Tests describe behavior.
Fixtures provide ready-to-use objects.
Page objects and clients perform actions.
Assertions validate outcomes.
Config controls execution.
```

That separation is what makes the tests easier to explain, maintain, and expand.
