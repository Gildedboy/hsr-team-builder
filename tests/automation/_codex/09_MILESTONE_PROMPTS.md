# Codex Milestone Prompts

## Milestone 1 Prompt

Read all files under:

```txt
tests/automation/_codex/
```

Then implement the HSR Team Builder automation framework according to those instructions.

Start with Milestone 1 only.

Create the framework under:

```txt
tests/automation/
```

Do not implement all milestones at once.

For Milestone 1, create:

- package.json
- tsconfig.json
- playwright.config.ts
- .env.example
- README.md
- docs copied/adapted from \_codex
- prompts directory
- src base folders
- tests/smoke/home.smoke.spec.ts

Use TypeScript and Playwright Test.

Use the Playwright skills guidance as a standards layer.

Do not invent app behavior.

Do not create full E2E flows yet unless needed for the first smoke test.

After implementing Milestone 1, run:

```bash
npm install
npm run typecheck
npm run test:smoke
```

Then summarize:

- files created
- commands run
- test result
- any missing selectors or testability concerns
- recommended next milestone

## Milestone 2 Prompt

Continue the HSR Team Builder automation framework.

Before making changes, read:

```txt
tests/automation/_codex/
tests/automation/docs/
```

Implement Milestone 2: API testing foundation.

Inspect the backend package/routes/controllers before writing API tests.

Create API clients only for real endpoints.

Create:

- src/api/base-api.client.ts
- API clients for real backend endpoints
- src/assertions/api.assertions.ts
- tests/api/\*.api.spec.ts

Use Playwright APIRequestContext.

Do not invent endpoint names or behavior.

If expected endpoints such as health, characters, teams, sources, or recommendations do not exist, document that clearly and either skip the test with a TODO or do not create the test.

Run:

```bash
cd tests/automation
npm run typecheck
npm run test:api
```

Then summarize:

- endpoints discovered
- API clients created
- tests created
- passing/failing/skipped tests
- missing backend testability concerns

## Milestone 3 Prompt

Continue the HSR Team Builder automation framework.

Before making changes, read:

```txt
tests/automation/_codex/
tests/automation/docs/
```

Implement Milestone 3: Page Object Model foundation.

Inspect the frontend package before creating page objects.

Create page objects only for real UI screens/components.

Candidate files:

- src/pages/base.page.ts
- src/pages/home.page.ts
- src/pages/character-grid.page.ts
- src/pages/team-builder.page.ts
- src/pages/team-results.page.ts
- src/pages/source-selector.page.ts if the UI exists

Create fixtures for page objects:

- src/fixtures/test.fixture.ts

Update at least one smoke or E2E test to use the fixture-based page objects.

Follow:

- locator strategy
- assertion strategy
- POM guidelines
- test review checklist

If stable locators are missing, add safe `data-testid` attributes to frontend components or document them in:

```txt
tests/automation/docs/MISSING_TESTABILITY_HOOKS.md
```

Run:

```bash
cd tests/automation
npm run typecheck
npm run test:smoke
```

Then summarize:

- page objects created
- fixtures created
- tests updated
- missing test IDs
- test results

## Milestone 4 Prompt

Continue the HSR Team Builder automation framework.

Before making changes, read:

```txt
tests/automation/_codex/
tests/automation/docs/
```

Implement Milestone 4: critical E2E flows.

Only automate real implemented behavior.

Prioritize:

1. team recommendation or team display flow
2. character selection/filtering if implemented
3. character availability/disabled character behavior if implemented
4. source selector if implemented
5. localStorage persistence if implemented
6. responsive guard if stable enough

Create tests under:

- tests/e2e/
- tests/integration/
- tests/visual-guard/ only if appropriate

Use tags:

- @frontend-critical
- @backend-critical
- @regression
- @smoke when relevant

Do not use raw page locators in specs if a page object should own them.

Do not use waitForTimeout.

If a feature is not implemented, create a skipped test only if it documents a valuable future behavior. Otherwise, do not create fake tests.

Run:

```bash
cd tests/automation
npm run typecheck
npm run test:e2e
```

If some tests are skipped, explain why.

Then summarize:

- flows implemented
- tests created
- tests skipped
- missing app hooks
- stability risks

## Milestone 5 CI/CD Prompt

Continue the HSR Team Builder automation framework.

Before making changes, read:

```txt
tests/automation/_codex/
tests/automation/docs/CI_CD_STRATEGY.md
```

Implement Milestone 5: CI/CD workflows.

Create:

- .github/workflows/automation-smoke.yml
- .github/workflows/automation-api.yml
- .github/workflows/automation-weekly.yml

Requirements:

- run from tests/automation
- use actions/checkout
- use actions/setup-node
- use npm ci
- install Playwright browsers with npx playwright install --with-deps
- run typecheck where appropriate
- run the selected test suite
- upload playwright-report
- upload test-results
- use retention-days: 7
- support workflow_dispatch

If existing deploy workflow names are known, wire workflow_run to them.
If not known, leave workflow_dispatch and document exactly how to connect them later.

Use secrets:

- HSR_FRONTEND_BASE_URL
- HSR_BACKEND_BASE_URL

Map them to:

- BASE_URL
- API_BASE_URL

Run local validation where possible:

```bash
cd tests/automation
npm run typecheck
```

Then summarize:

- workflows created
- triggers used
- secrets required
- how to wire frontend deploy
- how to wire backend deploy
- artifacts uploaded
