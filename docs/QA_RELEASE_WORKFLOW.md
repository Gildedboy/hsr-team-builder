# QA and Frontend Release Workflow

Use this workflow for fixes that need to reach production frontend and the QA Railway environment.

## Branch Rules

- Treat `qa` as a mirror branch for the QA environment.
- Do not make direct fix commits on `qa`.
- Start fixes from `main` on a short-lived branch, for example `fix/roster-startup-state` or `codex/fix-roster-startup-state`.
- If a fix is accidentally started on `qa`, save the patch, restore `qa` to match `origin/qa`, switch to `main`, create the fix branch, and apply the patch there.

## Release Steps

1. Fetch current branches and tags.

   ```bash
   git fetch --prune --tags origin
   ```

2. Create the fix branch from `main`.

   ```bash
   git switch main
   git pull --ff-only origin main
   git switch -c codex/fix-description
   ```

3. Make the fix and run the necessary validation for the changed area.

   For frontend-only fixes, run at least:

   ```bash
   npm run type-check -w @hsr-team-builder/frontend
   npm run build -w @hsr-team-builder/frontend
   ```

4. Commit and open a PR into `main`.

   ```bash
   git add <changed-files>
   git commit -m "Fix description"
   git push -u origin codex/fix-description
   ```

5. Merge the PR into `main`.

6. Tag the merged `main` commit with the next frontend version.

   ```bash
   git switch main
   git pull --ff-only origin main
   git tag v4.3.6
   git push origin v4.3.6
   ```

   Pushing a `v*` tag triggers the frontend GitHub Pages deploy workflow.

7. Update `qa` after `main` contains the merged fix.

   ```bash
   git switch qa
   git pull --ff-only origin qa
   git merge --ff-only main
   git push origin qa
   ```

   Pushing `qa` triggers the Railway QA auto-deploy.

## Notes

- If `qa` cannot fast-forward to `main`, stop and inspect the branch history before merging. `qa` should remain a deploy mirror, not an independent development branch.
- Use the next semver-style frontend tag after the latest existing tag. For example, if the latest tag is `v4.3.5`, the next patch release is `v4.3.6`.
