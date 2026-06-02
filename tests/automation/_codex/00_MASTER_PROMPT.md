# Codex Master Prompt — HSR Team Builder Automation Framework

You are working inside the HSR Team Builder monorepo.

This repository contains a frontend and backend product. Your task is to create a dedicated Playwright TypeScript automation framework for this product.

Do not mix this work with any external QA-AI framework or product. This automation framework belongs specifically to HSR Team Builder.

## Primary Goal

Create a maintainable automated testing framework that validates:

- frontend smoke flows
- backend API contracts
- frontend/backend integration
- critical E2E user flows
- post-deploy regression checks
- CI/CD execution after frontend or backend deploys

The framework must be useful both as a real quality gate for the product and as a learning-friendly Playwright TypeScript project.

## Required Location

Create the framework under:

```txt
tests/automation/
```

Do not place it inside:

```txt
packages/frontend/
packages/backend/
```

The framework validates the whole product, so it must live in a neutral location.

## Required Technology

Use:

- TypeScript
- Playwright Test
- Playwright APIRequestContext for API tests
- Page Object Model for UI flows
- Playwright fixtures
- typed API clients
- reusable helpers
- reusable assertions
- GitHub Actions for CI/CD

## Required Playwright Skills Usage

Use the TestDino Playwright Skill guidance as a standards layer for:

- locator strategy
- web-first assertions
- waiting strategy
- POM structure
- fixture usage
- API testing
- CI/CD
- debugging
- trace usage
- flaky test prevention
- Playwright CLI/codegen usage

Relevant references:

- https://github.com/testdino-hq/playwright-skill
- https://playwright.dev/docs/getting-started-cli

Do not use Playwright skills as runtime production dependencies unless necessary. Treat them as standards, review material, and implementation guidance.

## Required Local Documentation

Create or use these documents:

```txt
tests/automation/docs/PLAYWRIGHT_SKILLS_USAGE.md
tests/automation/docs/LOCATOR_STRATEGY.md
tests/automation/docs/ASSERTION_STRATEGY.md
tests/automation/docs/POM_GUIDELINES.md
tests/automation/docs/CI_CD_STRATEGY.md
tests/automation/docs/TEST_REVIEW_CHECKLIST.md
tests/automation/docs/CODEGEN_REFACTORING_RULES.md
```

You may use the files in:

```txt
tests/automation/_codex/
```

as the source instructions for creating the real framework documentation.

## Required Framework Structure

Create this structure:

```txt
tests/automation/
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
├── .env.example
├── README.md
├── docs/
│   ├── PLAYWRIGHT_SKILLS_USAGE.md
│   ├── LOCATOR_STRATEGY.md
│   ├── ASSERTION_STRATEGY.md
│   ├── POM_GUIDELINES.md
│   ├── CI_CD_STRATEGY.md
│   ├── TEST_REVIEW_CHECKLIST.md
│   └── CODEGEN_REFACTORING_RULES.md
├── prompts/
│   ├── generate-test.prompt.md
│   ├── review-test.prompt.md
│   └── refactor-codegen.prompt.md
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

## Required Scripts

The automation package must include these scripts:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:smoke": "playwright test tests/smoke",
    "test:api": "playwright test tests/api",
    "test:e2e": "playwright test tests/e2e",
    "test:integration": "playwright test tests/integration",
    "test:visual-guard": "playwright test tests/visual-guard",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "report": "playwright show-report",
    "codegen": "playwright codegen",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "validate": "npm run typecheck && npm run lint && npm run test:smoke"
  }
}
```

## Environment Variables

Create:

```txt
tests/automation/.env.example
```

With:

```env
BASE_URL=https://hsr-team-builder.gilded.dev
API_BASE_URL=https://hsr-team-builder.gilded.dev/api
CI=false
TEST_ENV=local
```

If the backend uses a separate deployed URL, adapt the variable names clearly:

```env
FRONTEND_BASE_URL=
BACKEND_BASE_URL=
```

Do not hardcode production URLs inside tests if environment variables can be used.

## Implementation Milestones

Implement in this order.

### Milestone 1 — Bootstrap

Create the Playwright TypeScript project under:

```txt
tests/automation/
```

Add:

- package.json
- tsconfig.json
- playwright.config.ts
- .env.example
- README.md
- docs directory
- prompts directory
- first smoke test

Acceptance:

```bash
cd tests/automation
npm install
npm run typecheck
npm run test:smoke
```

### Milestone 2 — API Foundation

Inspect backend routes before inventing endpoint names.

Create:

```txt
src/api/
src/assertions/
tests/api/
```

Add API clients for existing endpoints only.

Expected candidates:

- health
- characters
- teams
- sources
- recommendations, if implemented

If an endpoint does not exist, do not fake it. Create a documented TODO or skipped test only when useful.

Acceptance:

```bash
npm run test:api
```

### Milestone 3 — POM Foundation

Create:

```txt
src/pages/base.page.ts
src/pages/home.page.ts
src/pages/character-grid.page.ts
src/pages/team-builder.page.ts
src/pages/team-results.page.ts
```

Only create page objects that match real UI screens/components.

Acceptance:

At least one real UI smoke or E2E test should use page objects and pass.

### Milestone 4 — Critical E2E Flows

Implement tests for real product flows.

Prioritize:

1. home loads
2. team recommendation or team display flow
3. character selection/filtering if implemented
4. source selector if implemented
5. localStorage persistence if implemented
6. responsive guard

If a feature is planned but not implemented, create a skipped test with a clear TODO and reason.

Do not fabricate behavior.

### Milestone 5 — CI/CD

Create GitHub Actions workflows:

```txt
.github/workflows/automation-smoke.yml
.github/workflows/automation-api.yml
.github/workflows/automation-weekly.yml
```

The workflows must:

- run from `tests/automation`
- install dependencies with `npm ci`
- install Playwright browsers with `npx playwright install --with-deps`
- run the appropriate suite
- upload `playwright-report`
- upload `test-results`
- use `retention-days: 7`

If existing deploy workflow names are known, use `workflow_run`.
If not known, create `workflow_dispatch` and document how to wire deploy workflows later.

### Milestone 6 — Review and Hardening

Before finalizing, review all tests against:

```txt
tests/automation/docs/TEST_REVIEW_CHECKLIST.md
```

Fix:

- brittle locators
- hard waits
- duplicated logic
- unclear assertions
- missing types
- POM boundary violations
- tests that depend on unstable data without justification

## Strict Rules

- Do not use `waitForTimeout()` except in explicitly documented debug-only code.
- Do not leave raw Playwright codegen output as final test code.
- Do not use CSS/XPath selectors if accessible locators are possible.
- Do not invent endpoints.
- Do not invent UI behavior.
- Do not test implementation details when user-visible behavior can be tested.
- Do not mix frontend-only and backend-only responsibilities.
- Do not add external AI vendor dependencies.
- Do not store secrets.
- Do not commit videos, traces, reports, or test-results.
- Keep TypeScript strict and readable.

## Final Output Required From Codex

When done, summarize:

1. files created
2. scripts added
3. tests implemented
4. workflows added
5. how to run locally
6. how to run in CI
7. skipped tests or TODOs
8. known limitations
