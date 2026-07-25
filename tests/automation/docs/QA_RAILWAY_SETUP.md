# QA Railway Setup

This document lists what is needed to verify and run the QA environment from `tests/automation`.

The goal is to keep `qa` as a long-lived environment branch and deploy QA services from that branch. Production stays on the current production URLs.

## Current Status

QA is configured in Railway under the `hsr-team-builder` project:

| Item | Value |
| --- | --- |
| Railway project | `hsr-team-builder` |
| Railway project ID | `f17b9df1-fbc0-42ee-9a79-6630e21e434b` |
| QA environment | `qa` |
| QA branch | `qa` |
| Backend service | `hsr-team-builder` |
| Frontend service | `hsr-team-builder frontend` |
| Postgres service | `Postgres` |
| Redis service | `Redis` |
| QA frontend URL | `https://qa.hsr-team-builder.gilded.dev` |
| QA backend URL | `https://api-qa.hsr-team-builder.gilded.dev` |

The Railway CLI is installed locally:

```bash
railway --version
```

Do not commit Railway tokens or admin credentials.

## Backend QA Variables

Set these on the backend QA service:

```env
NODE_ENV=production
DATABASE_URL=<qa-postgres-url>
REDIS_URL=<qa-redis-url>
JWT_SECRET=<qa-only-strong-secret>
ADMIN_USERNAME=<qa-admin-username>
ADMIN_PASSWORD=<qa-admin-password>
PRODUCTION_DOMAIN=https://qa.hsr-team-builder.gilded.dev
ALLOWED_ORIGINS=https://qa.hsr-team-builder.gilded.dev
```

Notes:

- Railway injects `PORT` at runtime. The current QA custom domains target port `8080`.
- `DATABASE_URL` and `REDIS_URL` must point to QA resources, not production.
- `JWT_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` must not use placeholder values.
- QA admin credentials should be QA-only shared class credentials, not a personal or production login.
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
| Backend root directory | `packages/backend` |
| Backend build command | `npm run build` |
| Backend start command | `npm run start:prod` |
| Frontend root directory | `/` |
| Frontend build command | `npm run build -w @hsr-team-builder/shared && npm run build -w @hsr-team-builder/frontend` |
| Frontend start command | `npm run preview -w @hsr-team-builder/frontend -- --host 0.0.0.0 --port $PORT` |
| Custom domain target ports | `8080` for both frontend and backend |
| Sleep when inactive | Enabled for QA services. |
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

```bash
railway list --json
railway variables --project f17b9df1-fbc0-42ee-9a79-6630e21e434b --environment qa --service hsr-team-builder --json
```

List backend variables carefully because output may include raw secret values:

```bash
railway variables --project f17b9df1-fbc0-42ee-9a79-6630e21e434b --environment qa --service hsr-team-builder --json
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
- Frontend QA service deploys from `qa`.
- QA database is separate from production.
- QA Redis is separate from production.
- QA backend accepts requests from QA frontend origin.
- Swagger loads on the QA backend at `/swagger`.
- `GET /characters`, `GET /versions/latest`, `GET /teams/popular`, and `GET /lightcones` work on QA.
- Admin login works on QA with QA credentials.
- Mutating tests are disabled for production and enabled only with explicit QA flags.

## Refresh QA Data From Production

Use this only when QA should be overwritten with a fresh copy of production data.

```bash
STAMP=$(date -u +%Y%m%dT%H%M%SZ)

PROD_URL=$(railway variables --project f17b9df1-fbc0-42ee-9a79-6630e21e434b --environment production --service Postgres --json | jq -r .DATABASE_PUBLIC_URL)
QA_URL=$(railway variables --project f17b9df1-fbc0-42ee-9a79-6630e21e434b --environment qa --service Postgres --json | jq -r .DATABASE_PUBLIC_URL)

pg_dump --format=custom --no-owner --no-acl --file "/tmp/hsr-prod-$STAMP.dump" "$PROD_URL"
pg_dump --format=custom --no-owner --no-acl --file "/tmp/hsr-qa-before-restore-$STAMP.dump" "$QA_URL"

pg_restore --clean --if-exists --no-owner --no-acl --dbname "$QA_URL" "/tmp/hsr-prod-$STAMP.dump"
```

Flush QA Redis after restoring the database:

```bash
QA_REDIS_URL=$(railway variables --project f17b9df1-fbc0-42ee-9a79-6630e21e434b --environment qa --service Redis --json | jq -r .REDIS_PUBLIC_URL)

REDIS_URL="$QA_REDIS_URL" node --input-type=module -e "import { createClient } from 'redis'; const client = createClient({ url: process.env.REDIS_URL }); await client.connect(); await client.flushDb(); await client.quit(); console.log('QA Redis cache flushed');"
```
