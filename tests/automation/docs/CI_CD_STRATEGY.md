# CI/CD Strategy

Automation should run as a quality gate without blocking unrelated work unnecessarily.

Recommended suite mapping:

| Event | Suite |
| --- | --- |
| Pull request | typecheck, lint, smoke, API |
| Frontend deploy | smoke, frontend-critical E2E |
| Backend deploy | API and integration |
| Nightly | full suite plus visual guards |

CI should upload Playwright reports, traces, screenshots, and videos on failure. Keep retries at `2` in CI and `0` locally.

Default CI targets:

- frontend: `https://hsr-team-builder.gilded.dev`
- backend API: `https://api.hsr-team-builder.gilded.dev`

Use local or staging URLs only when those environments have representative data for the suite being run.
