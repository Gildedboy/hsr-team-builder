# Lightcone Images Directory

This folder contains all lightcone images for the HSR Team Builder.

## Structure

```
lightcones/
├── README.md           # This file
├── icons/             # Small lightcone icons (24x24 or similar)
└── [asset-id].webp    # Full-size lightcone images
```

## File Naming Convention

Use the asset IDs from `/src/data/lightcones.ts` for the image filenames:

### 5-Star Lightcones (21xxx series)

- `21000.webp` - Night on the Milky Way
- `21001.webp` - In the Name of the World
- `21002.webp` - Moment of Victory
- `21003.webp` - Something Irreplaceable
- `21004.webp` - But the Battle Isn't Over
- `21005.webp` - In the Night
- `21006.webp` - On the Fall of an Aeon
- `21007.webp` - Sleep Like the Dead
- `21008.webp` - Time Waits for No One
- `21009.webp` - I Shall Be My Own Sword
- `21010.webp` - Brighter Than the Sun
- `21011.webp` - Worrisome, Blissful
- `21012.webp` - An Instant Before a Gaze
- `21013.webp` - Patience Is All You Need
- `21014.webp` - Baptism of Pure Thought
- `21015.webp` - Earthly Escapade
- `21016.webp` - Reforged Remembrance
- `21017.webp` - Inherently Unjust Destiny
- `21018.webp` - Yet Hope Is Priceless
- `21019.webp` - Whereabouts Should Dreams Rest
- `21020.webp` - Flowing Nightglow
- `21021.webp` - Sailing Towards a Second Life
- `21022.webp` - Along the Passing Shore
- `21023.webp` - Those Many Springs
- `21024.webp` - Eternal Calculus
- `21025.webp` - Scent Alone Stays True

### 4-Star Lightcones (20xxx series)

- `20000.webp` - Good Night and Sleep Well
- `20001.webp` - Day One of My New Life
- `20002.webp` - Only Silence Remains
- `20003.webp` - Memories of the Past
- `20004.webp` - The Moles Welcome You
- `20005.webp` - The Birth of the Self
- `20006.webp` - Shared Feeling
- `20007.webp` - Eyes of the Prey
- `20008.webp` - Landau's Choice
- `20009.webp` - Swordplay
- `20010.webp` - Planetary Rendezvous
- `20011.webp` - A Secret Vow
- `20012.webp` - Make the World Clamor
- `20013.webp` - Perfect Timing
- `20014.webp` - Resolution Shines as Pearls of Sweat
- `20015.webp` - Trend of the Universal Market
- `20016.webp` - Subscribe for More!
- `20017.webp` - Dance! Dance! Dance!
- `20018.webp` - Under the Blue Sky
- `20019.webp` - Geniuses' Repose
- `20020.webp` - Quid Pro Quo
- `20021.webp` - Fermata
- `20022.webp` - We Are Wildfire
- `20023.webp` - River Flows in Spring
- `20024.webp` - Past and Future
- `20025.webp` - Woof! Walk Time!
- `20026.webp` - The Seriousness of Breakfast
- `20027.webp` - Warmth Shortens Cold Nights
- `20028.webp` - We Will Meet Again
- `20029.webp` - This Is Me!
- `20030.webp` - Return to Darkness
- `20031.webp` - Carve the Moon, Weave the Clouds
- `20032.webp` - Novel Methods
- `20033.webp` - Final Victor
- `20034.webp` - Flames Afar
- `20035.webp` - Destiny's Weaver
- `20036.webp` - Boundless Choreo

### 3-Star Lightcones (10xxx series)

- `10000.webp` - Arrows
- `10001.webp` - Cornucopia
- `10002.webp` - Collapsing Sky
- `10003.webp` - Amber
- `10004.webp` - Void
- `10005.webp` - Chorus
- `10006.webp` - Data Bank
- `10007.webp` - Darting Arrow
- `10008.webp` - Fine Fruit
- `10009.webp` - Shattered Home
- `10010.webp` - Defense
- `10011.webp` - Loop
- `10012.webp` - Meshing Cogs
- `10013.webp` - Passkey
- `10014.webp` - Adversarial
- `10015.webp` - Multiplication
- `10016.webp` - Mutual Demise
- `10017.webp` - Pioneering
- `10018.webp` - Hidden Shadow
- `10019.webp` - Mediation
- `10020.webp` - Sagacity

## Image Requirements

- **Format**: WebP (preferred) or PNG
- **Full Images**: Recommended size 512x512 or higher
- **Icons**: Recommended size 64x64 or 128x128
- **Quality**: High quality for best user experience

## Fallback

If an image is not found, the system will automatically fall back to:

- `anime-satania.gif` (because Satania is love, Satania is life! XD)

## Usage

The images will be automatically loaded by the application using the lightcone ID to asset ID mapping defined in `/src/data/lightcones.ts`

Note: Missing lightcone images will show our beloved Satania instead - a delightful surprise for users! 😈✨
