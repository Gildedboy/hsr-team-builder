# QA Railway Setup

This agent-facing runbook describes how to verify and operate the QA environment without publishing
deployment-specific identifiers. Production remains on its production URLs, and QA deploys from the
`qa` branch into separate QA services and data stores.

## Private Per-Clone Configuration

Exact Railway identifiers, service names, domains, ports, and ready-to-run commands belong in:

```text
tests/automation/docs/QA_RAILWAY_SETUP.local.md
```

That path is ignored by Git. When the local file is absent, create it from
`QA_RAILWAY_SETUP.local.example.md` and populate it through authenticated Railway access or an
approved private source. Never commit the local file, Railway tokens, database URLs, Redis URLs,
JWT secrets, or admin credentials.

Agents should read the local file when it exists, but must not quote its infrastructure values in
commits, pull requests, logs, or user-facing responses.

## Required Local Values

The private runbook should provide these values for the current clone:

- Railway project ID
- QA environment and branch
- backend and frontend service names
- Postgres and Redis service names
- QA frontend and backend URLs
- custom-domain target ports when non-default

The Railway CLI must be authenticated before using those values:

```bash
railway whoami
railway --version
```

## Backend QA Variables

Configure the backend QA service with values belonging only to QA:

```env
NODE_ENV=production
DATABASE_URL=<qa-postgres-url>
REDIS_URL=<qa-redis-url>
JWT_SECRET=<qa-only-strong-secret>
ADMIN_USERNAME=<qa-admin-username>
ADMIN_PASSWORD=<qa-admin-password>
PRODUCTION_DOMAIN=<qa-frontend-url>
ALLOWED_ORIGINS=<qa-frontend-url>
```

Railway normally injects `PORT`. Confirm the custom domain targets the actual runtime port. QA data
stores and credentials must be separate from production.

## Frontend QA Variables

Configure the QA frontend build with:

```env
VITE_API_URL=<qa-backend-url>
VITE_APP_VERSION=qa
```

The frontend chooses its API at build time, so a QA frontend must never be built with the production
API URL.

## Branch Deploy Settings

Confirm both QA services deploy from the `qa` branch and use the repository's current package build
and start commands. Do not change the production service branch to `qa`.

Expected package locations:

| Service | Root directory |
| --- | --- |
| Backend | `packages/backend` |
| Frontend | repository root |

Use `docs/UPLOAD_AND_DEPLOY_WORKFLOW.md` for branch synchronization. The `qa` branch is an environment
mirror, not the source branch for product development.

## Automation QA Variables

For local or CI automation against QA:

```env
FRONTEND_BASE_URL=<qa-frontend-url>
BACKEND_BASE_URL=<qa-backend-url>
BASE_URL=<qa-frontend-url>
API_BASE_URL=<qa-backend-url>
TEST_ENV=qa
ENABLE_API_MUTATION_TESTS=true
ADMIN_USERNAME=<qa-admin-username>
ADMIN_PASSWORD=<qa-admin-password>
```

Mutating API tests require both `TEST_ENV=qa` and `ENABLE_API_MUTATION_TESTS=true`. Never enable them
against production.

## CLI Verification

Use the private runbook values without printing secrets:

```bash
railway variables \
  --project "$RAILWAY_PROJECT_ID" \
  --environment "$QA_ENVIRONMENT" \
  --service "$QA_BACKEND_SERVICE" \
  --json
```

Variable output may contain raw secrets. Report only whether required keys exist.

## Automation Commands

Run from `tests/automation`:

```bash
npm run typecheck
npm run lint
FRONTEND_BASE_URL="$QA_FRONTEND_URL" BACKEND_BASE_URL="$QA_BACKEND_URL" TEST_ENV=qa npm run test:smoke
FRONTEND_BASE_URL="$QA_FRONTEND_URL" BACKEND_BASE_URL="$QA_BACKEND_URL" TEST_ENV=qa npm run test:api
```

Only run mutation tests after confirming the QA database is disposable or restorable.

## Verification Checklist

- `qa` exists and both QA services deploy from it.
- QA Postgres and Redis are separate from production.
- The QA backend accepts the QA frontend origin.
- Swagger loads on the QA backend at `/swagger`.
- Character, version, team, and lightcone GET endpoints work on QA.
- QA-only admin login works.
- Mutation flags are disabled for production.

## Refresh QA Data From Production

This is an authorized-maintainer operation. It intentionally overwrites QA and must never target the
production database.

1. Authenticate the Railway CLI.
2. Load exact identifiers from `QA_RAILWAY_SETUP.local.md`.
3. Resolve the production and QA database URLs without printing them.
4. Create a timestamped production dump.
5. Create a timestamped pre-restore QA dump.
6. Restore the production dump into QA using `--clean --if-exists --no-owner --no-acl`.
7. Flush only the QA Redis database.
8. Verify QA GET endpoints and admin login.
9. Keep or securely dispose of temporary dumps according to the operator's retention policy.

Generic command shape:

```bash
PROD_URL=$(railway variables --project "$RAILWAY_PROJECT_ID" --environment production --service "$POSTGRES_SERVICE" --json | jq -r .DATABASE_PUBLIC_URL)
QA_URL=$(railway variables --project "$RAILWAY_PROJECT_ID" --environment "$QA_ENVIRONMENT" --service "$POSTGRES_SERVICE" --json | jq -r .DATABASE_PUBLIC_URL)

pg_dump --format=custom --no-owner --no-acl --file "$PROD_DUMP" "$PROD_URL"
pg_dump --format=custom --no-owner --no-acl --file "$QA_BACKUP" "$QA_URL"
pg_restore --clean --if-exists --no-owner --no-acl --dbname "$QA_URL" "$PROD_DUMP"
```

Resolve the QA Redis URL through authenticated Railway access and flush only that database. The
private per-clone runbook may contain the exact command, but the public repository must not.
