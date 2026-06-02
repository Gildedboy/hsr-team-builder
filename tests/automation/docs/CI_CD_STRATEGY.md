# CI/CD Strategy

Automation should run as a quality gate without blocking unrelated work unnecessarily.

Recommended suite mapping:

| Event             | Suite                         |
| ----------------- | ----------------------------- |
| Pull request      | typecheck, lint, smoke, API   |
| Frontend deploy   | smoke, frontend-critical E2E  |
| Backend deploy    | API and integration           |
| Weekly regression | full suite plus visual guards |

CI should upload Playwright reports, traces, screenshots, and videos on failure. Keep retries at `2` in CI and `0` locally.

Default CI targets:

- frontend: `https://hsr-team-builder.gilded.dev`
- backend API: `https://api.hsr-team-builder.gilded.dev`

Use local or staging URLs only when those environments have representative data for the suite being run.

`.github/workflows/automation-weekly.yml` runs the full regression suite at `08:30 UTC` every Monday.

## Current Repository Wiring

Frontend deploys are handled by `.github/workflows/deploy.yml`, which runs when a `v*` tag is pushed or when manually dispatched. `.github/workflows/automation-frontend-deploy.yml` listens for that deploy workflow to complete successfully, waits briefly for Pages/cache propagation, then runs production smoke and E2E checks against `https://hsr-team-builder.gilded.dev`.

Backend deploys are handled by Railway outside this repository. `.github/workflows/automation-api.yml` therefore supports three signals:

- pull requests touching `packages/backend`, `packages/shared`, or automation files
- pushes to `main` touching `packages/backend`, `packages/shared`, or automation files, with a short wait for Railway propagation
- `repository_dispatch` event type `railway-backend-deployed` for a true Railway post-deploy callback

Railway can trigger the post-deploy API suite by calling GitHub's repository dispatch API with:

```json
{
  "event_type": "railway-backend-deployed",
  "client_payload": {
    "backend_base_url": "https://api.hsr-team-builder.gilded.dev",
    "deploy_wait_seconds": "60"
  }
}
```
