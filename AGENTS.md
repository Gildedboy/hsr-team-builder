# Agent Notes

This repository is a monorepo. Product code lives under `packages/*`; the Playwright automation framework lives under `tests/automation`.

## Project Workflow Docs

Before creating branches, opening PRs, tagging frontend releases, or syncing the QA environment, read:

- `docs/UPLOAD_AND_DEPLOY_WORKFLOW.md`

Important context: `qa` is a mirror branch for the QA Railway environment. Do not develop directly on `qa`; complete fixes and features through `main`, then make sure `qa` receives the same changes.

Before adding or changing character/lightcone assets, slug mappings, or manually-created API records, read:

- `docs/CHARACTER_ADDITIONS.md`

## Test Automation

Before generating, reviewing, or changing Playwright tests, use the TestDino Playwright skill guidance:

```bash
npx skills add testdino-hq/playwright-skill
```

If the skill is already installed in the agent environment, use that local skill. For Codex environments this is commonly available as `playwright-skill`.

Treat the skill as standards and implementation guidance, not as an application runtime dependency. Apply it for:

- locator strategy
- web-first assertions
- waiting and flakiness prevention
- Page Object Model boundaries
- fixtures and typed API clients
- API, E2E, integration, smoke, and visual guard tests
- CI/debugging/reporting practices

The automation package also exposes a repository-local discovery helper:

```bash
cd tests/automation
npm run agent:install-skills
```

Read these files before changing tests:

- `tests/automation/README.md`
- `tests/automation/docs/PLAYWRIGHT_SKILLS_USAGE.md`
- `tests/automation/docs/TEST_REVIEW_CHECKLIST.md`

Run automation commands from `tests/automation` unless a command explicitly says otherwise.
