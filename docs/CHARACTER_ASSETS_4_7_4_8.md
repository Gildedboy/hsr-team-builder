# Character assets: 4.7 and future 4.8 content

## Released content: Aha (4.7)

| API slug | Name | Game asset ID |
| --- | --- | --- |
| `aha` | Aeon ★ Aha | `1511` |
| `upon-the-first-echo-of-aha` | Upon the First Echo of "Aha" | `23065` |
| `see-you-at-the-worlds-end` | See You at the World's End! | `22009` |

Source: [Fribbels commit 26d633d](https://github.com/fribbels/hsr-optimizer/tree/26d633d747717647d76e175e248acf6a584e3852/public/assets).
Character avatars use `icon/avatar`, previews use `image/character_preview`,
lightcone portraits use `image/light_cone_portrait`, and icons use `icon/light_cone`.

Research checked on 2026-11-16:

- [Prydwen Aha guide](https://www.prydwen.gg/star-rail/characters/aha), updated for 4.7:
  Quantum/Elation support, signature and Mushy Shroomy's Adventures recommendations,
  and explicit synergies with Elation damage dealers and Elation Trailblazer.
- [HoyoBuild Aha guide](https://hoyobuild.com/en/hsr/characters/aeon-aha):
  additional lightcone alternatives and exact teams with Yao Guang/Pearl or
  Aventurine Waveflair/Ashveil/Hyacine. Its cheaper Trailblazer variant replaces
  the damage dealer; it is not an entirely free team.
- Video linked by Prydwen: https://www.youtube.com/watch?v=tRbp8PsSym8.
- No current Aha guide was found on Game8; older Game8 pages are not evidence for this addition.

Deploy these images and mappings before creating Aha's API records. Preserve
existing character arrays when adding reciprocal recommendations and teams.

## Future assets only: 4.8v1

Requested source: [Fribbels commit a7c1588](https://github.com/fribbels/hsr-optimizer/commit/a7c1588d1a45a51efa78f4cbec9bcc36304d237e).

| Reserved API slug | Name | Game asset ID |
| --- | --- | --- |
| `ellen` | Ellen | `1514` |
| `astra-yao` | Astra Yao | `1515` |
| `no-shifts-on-rainy-days` | No Shifts on Rainy Days | `23066` |
| `shine-bright-like-her` | Shine Bright Like Her | `23067` |

Only images and slug mappings are included for these four entries. Do not create
API records or add them to live recommendations as part of the Aha release.
Names and IDs reflect that exact upstream prerelease commit and should be
rechecked before their eventual release. Optimizer code, kits, relic changes,
eidolon textures, and changelog artwork from the upstream commit are not imported.

All fourteen downloaded WebP files returned HTTP 200 and decoded successfully:
avatars/icons are 128×128, previews 376×512, and cone portraits 904×1260.
