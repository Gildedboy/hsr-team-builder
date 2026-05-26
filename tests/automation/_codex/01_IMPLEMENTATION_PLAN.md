# HSR Team Builder Automation Framework — Implementation Plan

## Purpose

This automation framework validates the HSR Team Builder product after frontend, backend, and full-stack changes.

It must provide:

- fast smoke feedback
- API contract confidence
- E2E flow coverage
- post-deploy validation
- CI artifacts for debugging
- maintainable TypeScript structure

## Framework Location

Use:

```txt
tests/automation/
```

This is intentional.

Do not put the framework inside:

```txt
packages/frontend/
packages/backend/
```

The tests validate the full product, not only one package.

## Target Structure

```txt
tests/automation/
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── .env.example
├── README.md
├── docs/
├── prompts/
├── src/
│   ├── api/
│   ├── assertions/
│   ├── config/
│   ├── data/
│   ├── fixtures/
│   ├── flows/
│   ├── helpers/
│   ├── pages/
│   └── types/
└── tests/
    ├── api/
    ├── smoke/
    ├── e2e/
    ├── integration/
    └── visual-guard/
```

## Milestone 1 — Bootstrap

Create the initial Playwright TypeScript project.

Required files:

```txt
package.json
playwright.config.ts
tsconfig.json
.env.example
README.md
```

Required folders:

```txt
src/config
src/fixtures
src/pages
src/helpers
src/assertions
tests/smoke
```

First test:

```txt
tests/smoke/home.smoke.spec.ts
```

This test must validate:

- the site loads
- the page is not blank
- the main content is visible
- there are no critical runtime errors if feasible

## Milestone 2 — API Tests

Inspect the backend routes before writing tests.

Create API clients only for real endpoints.

Candidate files:

```txt
src/api/base-api.client.ts
src/api/health.client.ts
src/api/characters.client.ts
src/api/teams.client.ts
src/api/sources.client.ts
```

Candidate tests:

```txt
tests/api/health.api.spec.ts
tests/api/characters.api.spec.ts
tests/api/teams.api.spec.ts
tests/api/sources.api.spec.ts
```

Do not fake endpoint behavior.

If an endpoint does not exist, document it.

## Milestone 3 — Page Object Model

Create POMs only for real UI areas.

Candidate files:

```txt
src/pages/base.page.ts
src/pages/home.page.ts
src/pages/character-grid.page.ts
src/pages/team-builder.page.ts
src/pages/team-results.page.ts
src/pages/source-selector.page.ts
```

Each page object should expose meaningful user actions, not raw selector details.

Example:

Good:

```ts
await teamBuilderPage.selectMainCharacter('Firefly');
await teamBuilderPage.generateTeams();
```

Bad:

```ts
await page.locator('.main > div:nth-child(3) button').click();
```

## Milestone 4 — Fixtures and Helpers

Create fixtures for:

- page objects
- API clients
- shared test data

Candidate files:

```txt
src/fixtures/test.fixture.ts
src/fixtures/api.fixture.ts
```

Create helpers for:

```txt
src/helpers/storage.helpers.ts
src/helpers/network.helpers.ts
src/helpers/wait.helpers.ts
src/helpers/test-data.helpers.ts
```

Helpers must be generic and reusable.

## Milestone 5 — Critical Flows

Prioritize these test flows:

### Smoke

- home loads
- app shell renders
- no blank screen

### API

- health endpoint
- characters contract
- teams contract
- sources contract, if implemented

### E2E

- team recommendation or team rendering flow
- character availability behavior, if implemented
- source selector behavior, if implemented
- localStorage persistence, if implemented

### Integration

- frontend can consume backend data
- team cards render valid backend data

### Visual Guard

- basic responsive layout checks
- no overlapping critical elements
- mobile viewport still usable

## Milestone 6 — CI/CD

Create workflows:

```txt
.github/workflows/automation-smoke.yml
.github/workflows/automation-api.yml
.github/workflows/automation-e2e.yml
.github/workflows/automation-nightly.yml
```

Execution strategy:

| Event | Suite |
|---|---|
| Pull request | typecheck, lint, smoke, API |
| Frontend deploy | smoke, frontend-critical E2E |
| Backend deploy | API, backend-critical integration |
| Full deploy | smoke, API, integration, E2E |
| Nightly | full regression |

## Milestone 7 — Hardening

Before finishing:

- review all tests against the checklist
- remove brittle selectors
- remove hard waits
- ensure artifacts are ignored
- ensure reports upload in CI
- document skipped tests
- document missing app testability hooks

## Acceptance Criteria

The framework is acceptable when:

```bash
cd tests/automation
npm run typecheck
npm run test:smoke
npm run test:api
```

pass locally or against the configured deployed environment.

If E2E tests depend on missing features, they may be skipped with a clear TODO.
