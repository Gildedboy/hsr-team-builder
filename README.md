# Honkai Star Rail Team Builder

A comprehensive team building tool for Honkai: Star Rail that helps players discover optimal team compositions and character synergies.

## Features

- **Interactive Character Grid** - Browse all characters organized by role (DPS, Support, Sustain)
- **Smart Team Recommendations** - Get BiS (Best in Slot), Generalist, and F2P team suggestions
- **Advanced Filtering** - Filter by element, path, rarity, and archetype
- **Character Search** - Quick search with autocomplete suggestions
- **Detailed Tooltips** - Hover over characters to see their stats and labels
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Dark theme with glassmorphism effects and smooth animations

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Bootstrap 5** for responsive components
- **Vite** for fast development and building
- **Custom CSS** with modern design patterns

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Usage

1. **Browse Characters** - Characters are organized by their primary roles
2. **Select a Character** - Click on any character to see team recommendations
3. **Use Filters** - Filter characters by element, path, rarity, or archetype
4. **Search** - Use the search bar to quickly find specific characters
5. **View Recommendations** - See BiS, Generalist, and F2P teammate suggestions

## Character Data

The app includes comprehensive character data with:
- Character stats and rarities
- Element and path classifications
- Role-based categorization (DPS, Support, Sustain)
- Flexible teammate recommendations with custom sections
- Custom team compositions
- Character labels and archetypes

## Adding/Updating Characters

### File Structure
Characters are organized by their primary role:
- **DPS Characters**: `src/data/characters/dpsCharacters.ts`
- **Support Characters**: `src/data/characters/supportCharacters.ts`
- **Sustain Characters**: `src/data/characters/sustainCharacters.ts`

### Adding a New Character

1. **Choose the correct file** based on the character's primary role
2. **Add the character** using the CharacterBuilder pattern:

```typescript
new CharacterBuilder('character-id', 'Character Name')
  .element('Fire')                    // Physical, Fire, Ice, Lightning, Wind, Quantum, Imaginary
  .path('Destruction')                // Destruction, Hunt, Erudition, Harmony, Nihility, Preservation, Abundance, Remembrance
  .rarity(5)                          // 4 or 5
  .roles(['DPS'])                     // ['DPS'], ['SUPPORT'], ['SUSTAIN'], or combinations like ['DPS', 'SUB_DPS']
  .archetype('Hypercarry')            // Hypercarry, Follow-up, Counter, HP-Scaling, Ultimate-Based, Break-DPS, Buffer, Debuffer, Healer, Shielder
  .labels(['Single Target', 'Fire'])  // Descriptive labels
  .addTeammateSection('Amplifiers', ['sunday', 'bronya'], ['sparkle'], ['tingyun'])
  .addTeammateSection('Sustain', ['aventurine'], ['huohuo'], ['gallagher'])
  .addTeamComposition('Main DPS Team', 'Main DPS',
    ['character-name', 'sunday', 'bronya', 'aventurine'],  // BiS team
    ['character-name', 'tingyun', 'pela', 'gallagher']     // F2P team
  )
  .build(),
```

### Teammate Sections
Create custom teammate sections with descriptive names:
- **'Amplifiers'** - Buffers and supports
- **'Sub-DPS Partners'** - Characters that work as sub-DPS
- **'Debuffers'** - Characters that apply debuffs
- **'Sustain'** - Healers and shielders

Each section has three tiers: `bis`, `generalist`, `f2p`

### Team Compositions
Create custom team compositions:
- **First parameter**: Display name (e.g., 'Main DPS Team', 'DoT Team', 'FUA Team')
- **Second parameter**: Role description (e.g., 'Main DPS', 'Sub-DPS')
- **Third parameter**: BiS team (4 character IDs)
- **Fourth parameter**: F2P team (4 character IDs)

### Character Roles & Grid Placement
- **`roles: ['DPS']`** → Appears in DPS column
- **`roles: ['SUPPORT']`** → Appears in Support column
- **`roles: ['SUSTAIN']`** → Appears in Sustain column
- **`roles: ['DPS', 'SUB_DPS']`** → Appears in DPS column (first role determines placement)

### Archetypes & Subcategories
Archetypes determine subcategories within each column:
- **DPS**: Break-DPS, Counter, Follow-up, HP-Scaling, Hypercarry, Ultimate-Based
- **Support**: Buffer, Debuffer
- **Sustain**: Healer, Shielder

### Example: Adding a New DPS Character

```typescript
// Add to src/data/characters/dpsCharacters.ts
new CharacterBuilder('new-dps', 'New DPS')
  .element('Lightning')
  .path('Hunt')
  .rarity(5)
  .roles(['DPS'])
  .archetype('Hypercarry')
  .labels(['Single Target', 'Lightning', 'Crit'])
  .addTeammateSection('Amplifiers', ['sparkle', 'bronya'], ['tingyun'], ['asta'])
  .addTeammateSection('Sustain', ['aventurine', 'fu-xuan'], ['huohuo'], ['gallagher'])
  .addTeamComposition('Hypercarry Team', 'Main DPS',
    ['new-dps', 'sparkle', 'bronya', 'aventurine'],
    ['new-dps', 'tingyun', 'asta', 'gallagher']
  )
  .build(),
```

### Character Avatar
Add character avatar image to `public/images/characters/[character-id].webp`

## Contributing

Feel free to contribute by:
- Adding new characters using the guide above
- Updating team recommendations and teammate sections
- Adding new archetypes or roles
- Improving the UI/UX
- Reporting bugs or suggesting features through the in-app contact form
