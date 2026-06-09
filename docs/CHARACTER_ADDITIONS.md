# Character Addition Guide

Use this checklist when adding a character whose database records will be created manually through Yaak.

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

## Recommendation Research

Before drafting Yaak bodies for a new character, research current character guidance from build/team sites such as Prydwen and Game8. Use those sources to shape:

- teammate recommendation groups
- best-in-slot, generalist, and free-to-play team suggestions
- lightcone recommendations and notes
- role, archetype, and label choices

Do not invent teammate, lightcone, or team composition data from memory. Cross-check at least two sources when possible, and tell the user which sources informed the Yaak body. If reliable sources disagree or do not yet have complete guidance, leave uncertain recommendations empty or mark them for user confirmation instead of presenting them as final.

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

## Validation

After the repo changes and API records exist:

1. Confirm `GET /lightcones/reforged-in-hellfire` returns the lightcone.
2. Confirm `GET /characters/mortenax-blade` returns the character with the lightcone relation.
3. Open the frontend and verify the grid avatar, detail preview, and lightcone image render.
4. Run the frontend build from `packages/frontend` when Node/npm is available:

```bash
npm run build
```

## Version API

For a release that should appear as version 4.3, confirm `GET /versions/v4.3` before posting. If it returns 404, create the version record after the production-ready assets are merged and deployed.

POST `/versions`

```json
{
  "version": "v4.3",
  "title": "Mortenax Blade Update",
  "description": "Added Mortenax Blade asset support and the Reforged in Hellfire lightcone image mapping.",
  "releaseDate": "2026-06-01",
  "features": [
    "Added frontend image support for Mortenax Blade",
    "Added frontend image support for Reforged in Hellfire"
  ],
  "bugFixes": [],
  "breakingChanges": [],
  "knownIssues": [],
  "roadmapItems": [],
  "isActive": true,
  "isPrerelease": false
}
```
