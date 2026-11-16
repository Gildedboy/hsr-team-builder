# Dependency security review — 2026-11-16

GitHub reported 67 open Dependabot alerts across the application and standalone
automation lockfiles. This is an advisory count; npm reports affected packages,
including packages affected through their dependencies, so the totals differ.

After refreshing both dependency trees and replacing vulnerable overrides:

| Audit | Before | After |
| --- | --- | --- |
| Application, all dependencies | 44 (3 critical, 14 high, 17 moderate, 10 low) | 9 low |
| Application, production dependencies | Not recorded | 0 |
| Standalone automation | 9 (2 high, 7 moderate) | 0 |

The nine remaining low findings all originate from
[deepmerge prototype poisoning](https://github.com/advisories/GHSA-gcqx-w48m-w2h4).
Its latest published version, 4.3.1, is affected. It is pulled in by Jest and the
Nest CLI's webpack type checker, not by production dependencies. npm's suggested
force fixes include unrelated major changes and old Jest versions; these were
not applied. Revisit when a patched deepmerge or compatible replacement is available.

The glob/minimatch overrides cross major versions to obtain patched releases.
Validation includes Nest compilation and TypeORM discovery/building of all four
entity metadata records without a database connection. Keep these checks when
updating or removing the overrides.

## Regression runner

The failed weekly run stopped during browser installation: Playwright 1.60.0
did not support the Ubuntu 26.04 image selected by `ubuntu-latest`. Browser jobs
now use `ubuntu-24.04`. Automation actions use verified, pinned releases with
Node 24 runtimes; application/test execution continues to use Node 22.
The refreshed automation lockfile resolves Playwright 1.65.1.

Use `localhost:4173` for browser tests against the local preview: the backend's
default CORS allowlist includes that origin, but not `127.0.0.1:4173`.

## Validation

- Clean `npm ci --ignore-scripts` in both dependency trees.
- Root `npm run type-check` and `npm run build:all`.
- Automation `npm run typecheck` and `npm run lint`.
- All 21 Playwright tests pass against production.
- All 21 tests also pass with `FRONTEND_BASE_URL=http://localhost:4173` against
  the updated frontend build and the production API.
- Production dependency audit reports zero vulnerabilities.

GitHub's alerts are recalculated after the updated lockfiles reach the default
branch. A local audit does not close those alerts or deploy the fixes.
