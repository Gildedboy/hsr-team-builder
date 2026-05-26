# QA Railway Setup

This document lists what is needed to verify and run the future QA environment from `tests/automation`.

The goal is to keep `qa` as a long-lived environment branch and deploy QA services from that branch. Production stays on the current production URLs.

## Current Status

The Railway CLI is installed locally:

```bash
railway --version
```

This workspace is not linked to a Railway project yet. Railway browserless login cannot run in this non-interactive agent terminal, so verification from Codex needs a Railway token:

```bash
export RAILWAY_TOKEN=...
# or
export RAILWAY_API_TOKEN=...
```

Do not commit Railway tokens or admin credentials.

## Information Needed

Provide or create these items in Railway:

| Item | Needed Value |
| --- | --- |
| Railway project ID/name | The project that will host QA services. |
| Backend QA service name | Example: `hsr-team-builder-api-qa`. |
| Frontend QA service name | Example: `hsr-team-builder-web-qa`, if frontend is also hosted on Railway. |
| QA environment name | Recommended: `qa`. |
| QA branch | `qa`. |
| Backend QA public URL | Example: `https://api-qa.hsr-team-builder.gilded.dev`. |
| Frontend QA public URL | Example: `https://qa.hsr-team-builder.gilded.dev`. |
| QA Postgres service | Separate from production. |
| QA Redis service | Separate from production. |
| QA admin credentials | Used only for QA mutation tests. |
| Railway API token | Needed for CLI verification from this environment. |

## Backend QA Variables

Set these on the backend QA service:

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=<qa-postgres-url>
REDIS_URL=<qa-redis-url>
JWT_SECRET=<qa-only-strong-secret>
ADMIN_USERNAME=<qa-admin-username>
ADMIN_PASSWORD=<qa-admin-password>
PRODUCTION_DOMAIN=https://qa.hsr-team-builder.gilded.dev
ALLOWED_ORIGINS=https://qa.hsr-team-builder.gilded.dev
```

Notes:

- `DATABASE_URL` and `REDIS_URL` must point to QA resources, not production.
- `JWT_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` must not use placeholder values.
- `PRODUCTION_DOMAIN` and `ALLOWED_ORIGINS` must include the QA frontend URL so browser requests pass CORS.
- If the frontend has multiple QA URLs, use comma-separated `ALLOWED_ORIGINS`.

## Frontend QA Variables

Set these on the frontend QA build/deploy service:

```env
VITE_API_URL=https://api-qa.hsr-team-builder.gilded.dev
VITE_APP_VERSION=qa
```

The frontend chooses its API at build time through `VITE_API_URL`, so the QA frontend must be built with the QA API URL.

## Branch Deploy Settings

For each QA service in Railway, confirm:

| Setting | Expected |
| --- | --- |
| Source repo | `Gildedboy/hsr-team-builder` |
| Branch | `qa` |
| Backend root/build path | Backend package configuration points to `packages/backend`. |
| Frontend root/build path | Frontend package configuration points to `packages/frontend`, if hosted on Railway. |
| Auto deploy | Enabled for pushes to `qa`, if desired. |
| Production branch | Do not change production to `qa`. |

## Automation QA Variables

For local or CI automation against QA:

```env
FRONTEND_BASE_URL=https://qa.hsr-team-builder.gilded.dev
BACKEND_BASE_URL=https://api-qa.hsr-team-builder.gilded.dev
BASE_URL=https://qa.hsr-team-builder.gilded.dev
API_BASE_URL=https://api-qa.hsr-team-builder.gilded.dev
TEST_ENV=qa
ENABLE_API_MUTATION_TESTS=true
ADMIN_USERNAME=<qa-admin-username>
ADMIN_PASSWORD=<qa-admin-password>
```

The mutating API spec is skipped unless both of these are set:

```env
TEST_ENV=qa
ENABLE_API_MUTATION_TESTS=true
```

## CLI Verification Commands

After a Railway token is available:

```bash
railway status --json
railway link --project <project-id> --environment qa --service <backend-service-name>
railway environment list --json
railway environment config --environment qa --json
```

List backend variables carefully because output may include raw secret values:

```bash
railway variable list --service <backend-service-name> --environment qa --json
```

When reporting results, summarize whether required keys exist. Do not paste secret values.

## Automation Commands

From `tests/automation`:

```bash
npm run typecheck
npm run lint
FRONTEND_BASE_URL=https://qa.hsr-team-builder.gilded.dev BACKEND_BASE_URL=https://api-qa.hsr-team-builder.gilded.dev TEST_ENV=qa npm run test:smoke
FRONTEND_BASE_URL=https://qa.hsr-team-builder.gilded.dev BACKEND_BASE_URL=https://api-qa.hsr-team-builder.gilded.dev TEST_ENV=qa npm run test:api
```

Run QA mutation tests only after confirming the QA database is disposable or restorable:

```bash
FRONTEND_BASE_URL=https://qa.hsr-team-builder.gilded.dev \
BACKEND_BASE_URL=https://api-qa.hsr-team-builder.gilded.dev \
TEST_ENV=qa \
ENABLE_API_MUTATION_TESTS=true \
ADMIN_USERNAME=<qa-admin-username> \
ADMIN_PASSWORD=<qa-admin-password> \
npm run test:api
```

## Verification Checklist

Before enabling QA mutation tests:

- `qa` branch exists and is pushed.
- Backend QA service deploys from `qa`.
- Frontend QA service deploys from `qa`, or the QA frontend build uses `VITE_API_URL` for the QA backend.
- QA database is separate from production.
- QA Redis is separate from production.
- QA backend accepts requests from QA frontend origin.
- Swagger loads on the QA backend at `/swagger`.
- `GET /characters`, `GET /versions/latest`, `GET /teams/popular`, and `GET /lightcones` work on QA.
- Admin login works on QA with QA credentials.
- Mutating tests are disabled for production and enabled only with explicit QA flags.
