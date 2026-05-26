# HSR Team Builder Automation

Standalone Playwright TypeScript automation framework for the HSR Team Builder monorepo.

The framework validates the product from the outside: frontend smoke flows, backend API contracts, integration behavior, critical E2E paths, visual guards, and post-deploy checks. It intentionally lives under `tests/automation` instead of `packages/frontend` or `packages/backend`.

## Setup

```bash
cd tests/automation
npm install
cp .env.example .env
```

The default target is production because the deployed frontend/API have the accurate cached application data:

```env
FRONTEND_BASE_URL=https://hsr-team-builder.gilded.dev
BACKEND_BASE_URL=https://api.hsr-team-builder.gilded.dev
TEST_ENV=production
```

## Common Commands

```bash
npm run typecheck
npm run lint
npm run test:smoke
npm run test:api
npm run validate
npm run cli:install-browsers
npm run cli:codegen -- https://hsr-team-builder.gilded.dev
npm run agent:help
npm run agent:open -- https://hsr-team-builder.gilded.dev
npm run agent:snapshot
```

## Structure

- `src/api`: typed API clients for real backend routes.
- `src/pages`: page and component objects for UI mechanics.
- `src/fixtures`: Playwright fixtures for shared pages and clients.
- `src/assertions`: reusable contract and UI assertions.
- `src/flows`: multi-page or multi-component workflows.
- `tests/*`: specs grouped by test layer.
- `docs`: local standards distilled from the `_codex` source notes.
- `prompts`: reusable prompts for generating, reviewing, and refactoring tests.

## Local App Targets

For local development only, override:

- frontend: `http://localhost:5174`
- backend: `http://localhost:3001`

Start the app from the repo root when running against local services:

```bash
npm run dev:all
```

Then run:

```bash
FRONTEND_BASE_URL=http://localhost:5174 BACKEND_BASE_URL=http://localhost:3001 npm run test:smoke
```

API contract tests should normally run against `https://api.hsr-team-builder.gilded.dev` until a backend test server exists with production-equivalent data.

## Playwright CLI Workflow

Use official Playwright CLI commands for test execution, codegen, and reports:

```bash
npm run cli:install-browsers
npm run cli:codegen -- https://hsr-team-builder.gilded.dev
npm run test:smoke
npm run report
```

Use the coding-agent `playwright-cli` workflow for browser exploration:

```bash
npm run agent:install-skills
npm run agent:open -- https://hsr-team-builder.gilded.dev
npm run agent:snapshot
npm run agent:screenshot -- --filename=home.png
npm run agent:close
```

The CLI workflow is for inspecting the owned app, capturing snapshots, debugging traces, and discovering candidate flows. Do not commit raw generated output; refactor it into `src/pages`, `src/flows`, fixtures, and specs.

## Current API Notes

The backend currently exposes read endpoints for `characters`, `teams`, `versions`, and `lightcones`. A dedicated `/health` endpoint is not implemented yet, so health checks should be added only after the backend exposes a real route.
