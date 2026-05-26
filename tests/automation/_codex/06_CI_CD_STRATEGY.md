# CI/CD Strategy

## Purpose

The automation framework must run after relevant product changes and deploys.

It should catch:

- broken frontend deploys
- broken backend deploys
- broken API contracts
- broken integration between frontend and backend
- critical E2E regressions

## Required Workflows

Create:

```txt
.github/workflows/automation-smoke.yml
.github/workflows/automation-api.yml
.github/workflows/automation-e2e.yml
.github/workflows/automation-nightly.yml
```

## Working Directory

All automation workflow steps must run from:

```txt
tests/automation
```

Example:

```yaml
defaults:
  run:
    working-directory: tests/automation
```

## Required CI Steps

Each workflow should generally:

1. checkout repo
2. setup Node
3. run `npm ci`
4. install Playwright browsers
5. run typecheck when appropriate
6. run selected tests
7. upload Playwright report
8. upload test results

## Required Playwright Browser Install

Use:

```bash
npx playwright install --with-deps
```

## Artifact Uploads

Always upload:

```txt
tests/automation/playwright-report
tests/automation/test-results
```

Use:

```yaml
if: always()
retention-days: 7
```

## Pull Request Strategy

On pull requests to main:

Run:

```bash
npm run typecheck
npm run lint
npm run test:smoke
npm run test:api
```

Do not run the full regression suite on every PR initially.

## Frontend Deploy Strategy

After frontend deploy:

Run:

```bash
npm run test:smoke
npx playwright test --grep @frontend-critical
```

This validates:

- deployed UI loads
- core UI flow still works
- frontend can talk to backend

## Backend Deploy Strategy

After backend deploy:

Run:

```bash
npm run test:api
npx playwright test --grep @backend-critical
```

This validates:

- backend health
- API contracts
- frontend/backend integration where relevant

## Full Deploy Strategy

After full deploy:

Run:

```bash
npm run test:smoke
npm run test:api
npm run test:integration
npm run test:e2e
```

## Nightly Strategy

Once per day:

Run:

```bash
npm run test
```

Nightly may include:

- full E2E
- mobile viewport
- visual guard tests
- regression tags

## Workflow Trigger Policy

If existing deploy workflow names are known, use:

```yaml
on:
  workflow_run:
    workflows:
      - Deploy Frontend
      - Deploy Backend
    types:
      - completed
```

If deploy workflow names are unknown, create manual workflows with:

```yaml
on:
  workflow_dispatch:
```

Then document how to wire them later.

## Environment Variables in CI

Use secrets:

```txt
HSR_FRONTEND_BASE_URL
HSR_BACKEND_BASE_URL
```

Map them to:

```yaml
env:
  BASE_URL: ${{ secrets.HSR_FRONTEND_BASE_URL }}
  API_BASE_URL: ${{ secrets.HSR_BACKEND_BASE_URL }}
  CI: true
```

## CI Review Questions

Before accepting workflows, ask:

1. Does the workflow run from the correct directory?
2. Does it install Playwright browsers?
3. Does it upload artifacts on failure?
4. Does it avoid running too much on PRs?
5. Does it support manual execution?
6. Does it clearly separate frontend and backend deploy checks?
