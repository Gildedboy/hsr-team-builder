# Upload and Deploy Workflow

Use this process for both fixes and new features.

## Branch Model

- `main` is the source branch for completed application changes.
- `qa` is a mirror branch of `main` for the QA environment.
- In this repo, "mirror" means QA should receive the same product features, fixes, runtime behavior, and user-facing app changes as `main`. It does not require identical Git history.
- Git history matters on `main`; `qa` is only an environment branch for QA/student testing and can be recreated from `main` if needed.
- Do not develop directly on `qa`.
- Any feature or fix that reaches `main` should also reach `qa`.
- If work is accidentally started on `qa`, save the patch, restore `qa` to match its remote state, switch back to `main`, create a normal work branch, and apply the patch there.

## Normal Change Flow

1. Fetch the latest branches and tags.

   ```bash
   git fetch --prune --tags origin
   ```

2. Start from `main`.

   ```bash
   git switch main
   git pull --ff-only origin main
   git switch -c codex/change-description
   ```

3. Make the fix or feature.

4. Run validation for the changed area.

   For frontend-only changes, run at least:

   ```bash
   npm run type-check -w @hsr-team-builder/frontend
   npm run build -w @hsr-team-builder/frontend
   ```

   For backend changes, run the backend checks used by the package before merging.

5. Commit and push the branch.

   ```bash
   git add <changed-files>
   git commit -m "Describe the change"
   git push -u origin codex/change-description
   ```

6. Open a pull request into `main` and merge it after validation.

## Production Deploys

Frontend production deploys require a new version tag.

After the PR is merged, create the tag from the merged `main` commit:

```bash
git switch main
git pull --ff-only origin main
git tag v4.3.6
git push origin v4.3.6
```

Pushing a `v*` tag triggers the production frontend deploy workflow.

Backend production deploys are handled by Railway after backend changes reach the configured production branch. No frontend version tag is needed for backend-only changes unless the frontend also changed and needs a production deploy.

## Version API Updates

Update the backend Versions REST API for user-visible fixes and features so the app changelog/version metadata matches the release.

This section applies to the production Versions API. QA has its own version data and does not normally need manual version records for production releases.

The production API base URL is:

```text
https://api.hsr-team-builder.gilded.dev
```

Before creating or updating a version, ask the user to check whether the exact version already exists in Yaak:

```text
GET https://api.hsr-team-builder.gilded.dev/versions/v4.3.6
```

Important: `GET /versions/:version` can fall back to the latest version when the requested version is missing. Confirm the response body has the exact `version` value being released, such as `"version": "v4.3.6"`.

If the version does not exist, prepare a Yaak-ready JSON body for the user to send with authenticated `POST /versions`.

```text
POST https://api.hsr-team-builder.gilded.dev/versions
Authorization: Bearer <jwt>
Content-Type: application/json
```

Example body:

```json
{
  "version": "v4.3.6",
  "title": "Minor Fixes",
  "description": "Small improvements and fixes to keep the app experience consistent.",
  "releaseDate": "2026-06-09",
  "features": [],
  "bugFixes": [
    "Applied minor fixes and polish."
  ],
  "breakingChanges": [],
  "knownIssues": [],
  "roadmapItems": [],
  "isActive": true,
  "isPrerelease": false
}
```

Keep every part of the version body public-facing and non-technical, including `title`, `description`, `features`, `bugFixes`, `knownIssues`, and `roadmapItems`. Normal users read this copy in the app, so write it in clear English product language. Avoid code terms, implementation details, internal root causes, endpoint names, branch names, package names, and database details unless the user explicitly asks for that level of detail.

For feature releases, describe the user-visible capability or workflow improvement, not how it was built. For small fix releases, prefer broad phrasing such as "Minor Fixes", "Small improvements", or "Applied minor fixes and polish".

If the version exists and needs correction, prepare a Yaak-ready body for authenticated `PATCH /versions/:version` for partial changes or `PUT /versions/:version` to replace the full record.

## QA Deploys

QA deploys are handled by Railway from the `qa` branch for both frontend and backend changes.

After `main` has the merged feature or fix, update `qa` so QA receives the same application changes:

```bash
git switch qa
git pull --ff-only origin qa
git merge main
git push origin qa
```

Pushing `qa` triggers the Railway QA auto-deploy.

## Version Tags

- Use the next frontend version tag after the latest existing tag.
- Example: if the latest tag is `v4.3.5`, the next frontend deploy tag is `v4.3.6`.
- Create tags from the merged `main` commit, not from a feature branch or `qa`.

## Important Checks

- Confirm the branch before committing or tagging.
- Confirm `qa` receives every feature or fix that `main` receives.
- Do not force-push or reset `qa` unless the repo owner explicitly asks for it.
- If `qa` cannot merge `main` cleanly, stop and resolve the branch difference intentionally before pushing.
