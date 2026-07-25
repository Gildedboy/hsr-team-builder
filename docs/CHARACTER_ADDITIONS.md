# Character Addition Guide

Use this checklist when adding a character whose database records will be created manually through
Yaak, Swagger, or another API client. Complete repository asset work through `main` as described in
`docs/UPLOAD_AND_DEPLOY_WORKFLOW.md`; do not develop directly on `qa`.

## Plan the Addition

Collect and confirm these identifiers before making changes:

- character slug and game asset ID
- signature lightcone slug and game asset ID
- character element, path, rarity, roles, archetypes, and labels
- Prydwen URL and video guide URL
- game version and release date

Slugs are API relationship keys and must be consistent across frontend mappings, API records,
teammate recommendations, and team compositions. Game asset IDs are used only for image mappings.

## Repo Changes First

1. Create or switch to a feature branch.
2. Add the character image assets under `packages/frontend/public/images`:
   - avatar: `avatar/<asset-id>.webp`
   - detail preview: `previews/<asset-id>.webp`
3. Add the lightcone image asset:
   - lightcone: `lightcones/<asset-id>.webp`
4. Map the character slug to the character asset ID in `packages/frontend/src/data/avatars.ts`.
5. Map the lightcone slug to the lightcone asset ID in `packages/frontend/src/data/lightcones.ts`.

For Mortenax Blade:

```ts
// packages/frontend/src/data/avatars.ts
'mortenax-blade': '1507',

// packages/frontend/src/data/lightcones.ts
'reforged-in-hellfire': '23059',
```

The character and lightcone IDs used in Yaak must match these slugs exactly. Otherwise the API data will load but the UI will fall back to placeholder images.

When downloading images from a public repository, use the upstream raw file rather than the GitHub
HTML page. Confirm every avatar, preview, and lightcone URL returns HTTP 200 and inspect the files or
dimensions before committing them.

## Recommendation Research

Before drafting Yaak bodies for a new character, research current character guidance from build/team sites such as Prydwen and Game8. Use those sources to shape:

- teammate recommendation groups
- best-in-slot, generalist, and free-to-play team suggestions
- lightcone recommendations and notes
- role, archetype, and label choices

Do not invent teammate, lightcone, or team composition data from memory. Cross-check at least two
current sources when possible, and record which sources support the proposed data before drafting a
request body. Recommended source order is:

1. Current Prydwen character guide and calculations.
2. Current Game8 guide, when one exists for the released character.
3. Another maintained guide such as Icy Veins or Mobalytics.
4. Focused community theorycrafting guides as supporting evidence, not the only authority.

Search results can expose stale pre-release or older-character pages. Confirm the page names the
new character and current game version. If Game8 has no current page, state that instead of treating
an older related guide as evidence.

Separate these concepts during research:

- **Explicit synergy:** the guide directly recommends the two characters together.
- **Example team:** the guide shows the exact four-character composition.
- **Mechanical compatibility:** the kits appear compatible, but no guide recommends the pairing.

Only the first two are sufficient for final database recommendations by default. If reliable sources
disagree or do not have complete guidance, leave uncertain recommendations empty or request user
confirmation. Do not turn a general mechanical observation such as "likes frequent attackers" into
a list of named teammates without guide support.

Keep specialized sub-DPS characters in their primary role. A character who mainly supports one
named partner should not receive the global `SUPPORT` or `AMPLIFIER` role unless the guides establish
that broader role. A team composition can still label the character's job in that specific team.

## Yaak API Order

Create the lightcone before creating or updating the character, because character lightcone links reference an existing lightcone ID.

POST `/lightcones`

```json
{
  "id": "reforged-in-hellfire",
  "name": "Reforged in Hellfire",
  "rarity": 5,
  "path": "Destruction"
}
```

POST `/characters`

```json
{
  "id": "mortenax-blade",
  "name": "Mortenax Blade",
  "element": "Wind",
  "path": "Destruction",
  "rarity": 5,
  "roles": ["DPS"],
  "archetype": ["HP-Scaling"],
  "labels": [],
  "teammateRecommendations": [],
  "teamCompositions": [],
  "lightcones": [
    {
      "id": "reforged-in-hellfire",
      "note": "Signature"
    }
  ]
}
```

Adjust `element`, `path`, `roles`, `archetype`, labels, recommendations, and teams to the final character details before sending.

## Complete the Direct Character Record

After creation, prepare one direct `PATCH /characters/:id` body containing the complete reviewed
values for:

- `roles` and `archetype`
- ranked lightcones with concise notes such as `Signature`, `F2P S5`, or `Battle Pass S5`
- teammate recommendation sections
- named team compositions

The character PATCH replaces complete arrays such as `lightcones`, `teammateRecommendations`, and
`teamCompositions`. Always GET the current record first and include everything that must remain.
Sending only one new lightcone or team can remove the existing list.

Store larger request bodies as raw JSON under the ignored `tmp/` directory and validate them before
sending:

```bash
jq empty /absolute/path/to/request.json
```

Use an absolute path when sharing a `cat` command because API-client terminals may start outside the
repository:

```bash
cat /absolute/path/to/request.json
```

After the PATCH returns success, perform an independent GET. Do not rely only on the mutation
response. Verify the returned roles, archetypes, lightcone IDs and notes, recommendation buckets,
team names, character slots, and team-specific role labels.

## Reciprocal Character Updates

Adding a new character also affects existing character records. After the direct character record is
verified, identify reciprocal updates from the approved recommendations and exact team compositions.

Use these rules:

- Add the new character to an existing character's teammate recommendations only when the pairing is
  supported by the researched guides.
- Propagate a named team only to characters actually present in that four-character team.
- Use the recipient's role in that team: for example `Main DPS`, `Sub DPS`, `Amplifier`, `Specialist`,
  or `Sustain`.
- Preserve existing section names and tiers unless the research specifically requires a correction.
- Sustain records commonly use generic teammate prose. Add named team compositions to those records
  without replacing the generic `DPS` or `Supports` descriptions.
- Do not add a specialized partner to general amplifier/support lists merely because their kit buffs
  one named character.

Prefer `PATCH /characters/bulk` with `mode: "append_unique"` for reciprocal additions. Start with
`dryRun: true`:

```json
{
  "dryRun": true,
  "operations": [
    {
      "type": "upsert_teammate_recommendation",
      "characterIds": ["existing-character"],
      "sectionName": "DPS Partners",
      "bucket": "bis",
      "teammateIds": ["new-character"],
      "mode": "append_unique"
    },
    {
      "type": "upsert_team_composition",
      "characterIds": ["existing-character"],
      "teamComposition": {
        "name": "New Character - Premium Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "existing-character",
            "new-character",
            "amplifier",
            "sustain"
          ]
        }
      },
      "mode": "append_unique"
    }
  ]
}
```

Review the dry-run response before applying it. Confirm:

- HTTP 200
- every intended character appears in `updatedCharacterIds`
- `skippedCharacterIds` is empty
- details show preserved existing values plus the intended additions
- no unrelated character or recommendation bucket is modified

Then change only `dryRun` to `false`, resend the identical operations, and GET all affected
characters. Count and inspect both reciprocal recommendation references and named team entries.

The bulk API supports replacing an entire recommendation bucket, not removing one item directly. For
corrections, use `mode: "replace"` only after GETting the current bucket and constructing the complete
list that should remain. This is particularly important when a bucket contains generic prose entries.

## Validation

After the repo changes and API records exist:

1. Confirm `GET /lightcones/reforged-in-hellfire` returns the lightcone.
2. Confirm `GET /characters/mortenax-blade` returns the complete character record.
3. Confirm every reciprocal character contains only its intended recommendation and team additions.
4. Open the frontend and verify the grid avatar, detail preview, lightcone image, links, teams, and
   recommendations render.
5. Run frontend validation from the repository root when Node/npm is available:

```bash
npm run type-check -w @hsr-team-builder/frontend
npm run build-only -w @hsr-team-builder/frontend
```

Also confirm the production image URLs return HTTP 200 after the tagged frontend deployment.

## Version API

Create the version record only after the assets, direct records, and reciprocal updates are complete.
Before posting, call `GET /versions/<version>` and compare the response body's `version` field with
the requested version. This endpoint can fall back to the latest version when the requested record is
missing, so an HTTP 200 alone does not prove the version exists.

Keep character-release entries minimal and public-facing:

POST `/versions`

```json
{
  "version": "v4.4",
  "title": "Version 4.4 Character Update",
  "description": "Added the new characters with their lightcones, teams, and teammate suggestions.",
  "releaseDate": "2026-07-25",
  "features": [
    "Added new character data, lightcones, teams, and teammate suggestions"
  ]
}
```

Optional arrays default to empty and activation defaults are supplied by the backend, so omit them
when a minimal record is requested. After POST returns HTTP 201, GET the exact version and verify the
body again.

## Production Checklist

1. Assets and slug mappings are merged to `main` through a PR.
2. The release tag is created from the merged `main` commit and the frontend deployment succeeds.
3. Every production asset URL returns HTTP 200.
4. Lightcones are created before characters that reference them.
5. Direct character PATCH bodies are source-reviewed, JSON-valid, applied, and independently GET-verified.
6. Reciprocal bulk operations pass a dry run with zero skips before apply.
7. All affected characters are GET-verified after the bulk apply.
8. The exact version record is created last and GET-verified.
9. Rotate any JWT that was exposed outside the API client's secure storage.
