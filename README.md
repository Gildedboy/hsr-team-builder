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
- **Dynamic Data** - Real-time character data powered by NestJS backend API

## Architecture

This project supports two deployment modes:

### 🔸 **Static Version (Main Branch)**

- Frontend-only deployment with static character data
- Deployed to GitHub Pages from `main` branch
- URL: [hsr-team-builder.gilded.dev](https://hsr-team-builder.gilded.dev)

### 🔸 **API-Powered Version (Feature Branch)**

- Full-stack application with NestJS backend
- Real-time data updates via REST API
- Deployed from `feature/nestjs-backend` branch
- Frontend: [gildedboy.github.io/hsr-team-builder](https://gildedboy.github.io/hsr-team-builder)
- Backend API: [api.hsr-team-builder.gilded.dev](https://api.hsr-team-builder.gilded.dev)

## Tech Stack

### Frontend

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Bootstrap 5** for responsive components
- **Vite** for fast development and building
- **Custom CSS** with modern design patterns

### Backend (Feature Branch)

- **NestJS** with TypeScript
- **PostgreSQL** database with TypeORM
- **Redis** for caching
- **JWT Authentication** for admin access
- **Railway** hosting platform
- **Swagger** API documentation

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

## API Endpoints (Feature Branch Only)

The backend API provides comprehensive character management capabilities:

### 🔓 **Public Endpoints**

- `GET /characters` - Get all characters
- `GET /characters/:id` - Get character by ID
- `GET /characters/search?query=` - Search characters

### 🔒 **Protected Endpoints** (Admin Only)

_Authentication required via JWT token_

- `POST /auth/login` - Admin authentication
- `POST /characters/seed` - Seed database with character data
- `DELETE /characters/clear` - Clear all characters
- `POST /characters` - Create new character
- `PUT /characters/:id` - Update character
- `DELETE /characters/:id` - Delete character

### Authentication

The backend uses JWT authentication with **personal admin access only**. The login credentials are configured for the project owner's exclusive use for data management.

```bash
# Example: Get JWT token (admin only)
curl -X POST "https://api.hsr-team-builder.gilded.dev/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"[ADMIN_USER]","password":"[ADMIN_PASS]"}'

# Example: Update character data
curl -X PUT "https://api.hsr-team-builder.gilded.dev/characters/seele" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rarity": 5, "path": "Hunt"}'
```

### 📚 API Documentation

**Interactive Swagger UI**: [https://api.hsr-team-builder.gilded.dev/api](https://api.hsr-team-builder.gilded.dev/api)

The API includes comprehensive Swagger documentation with:

- **Interactive endpoint testing** - Try all API endpoints directly from the browser
- **Request/response schemas** - Complete data structure documentation
- **Authentication examples** - JWT token usage examples
- **Real-time API exploration** - Test character CRUD operations live

## Usage

### For Players

1. **Browse Characters** - Characters are organized by their primary roles
2. **Select a Character** - Click on any character to see team recommendations
3. **Use Filters** - Filter characters by element, path, rarity, or archetype
4. **Search** - Use the search bar to quickly find specific characters
5. **View Recommendations** - See BiS, Generalist, and F2P teammate suggestions

### For Data Management (API Version)

The API-powered version allows real-time character data updates:

1. **Authenticate** - Obtain JWT token via admin login
2. **Update Characters** - Use PUT endpoints to modify character data
3. **Bulk Operations** - Clear and re-seed database when needed
4. **Instant Changes** - Updates reflect immediately without redeployment

## Character Data Management

### Data Sources

Character data is extracted from the main branch and can be managed through two approaches:

#### 🔸 **Static Data (Main Branch)**

- Characters defined in TypeScript files under `src/data/characters/`
- Data is bundled with the frontend application
- Updates require code changes and redeployment

#### 🔸 **API-Powered Data (Feature Branch)**

- Character data stored in PostgreSQL database
- Real-time updates via REST API endpoints
- No redeployment needed for data changes
- Admin-only access for data modifications

### Character Data Structure

The app includes comprehensive character data with:

- Character stats and rarities
- Element and path classifications
- Role-based categorization (DPS, Support, Sustain)
- Flexible teammate recommendations with custom sections
- Custom team compositions
- Character labels and archetypes

### Updating Character Data (API Version)

For the API-powered version, character data can be updated instantly via API calls without redeploying:

```bash
# Update a character's rarity
curl -X PUT "https://api.hsr-team-builder.gilded.dev/characters/gepard" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rarity": 5}'

# Add team compositions
curl -X PUT "https://api.hsr-team-builder.gilded.dev/characters/seele" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "teamCompositions": [
      {
        "name": "Hypercarry Team",
        "role": "Main DPS",
        "bis": {
          "characters": ["seele", "sparkle", "silver-wolf", "fu-xuan"]
        }
      }
    ]
  }'
```

### Adding Characters (Static Version)

For the static version, add characters to the appropriate TypeScript files:

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

### Code Contributions

- Improving the UI/UX components
- Adding new features to the frontend
- Enhancing the backend API functionality
- Writing tests and documentation

### Data Contributions (Static Version)

- Adding new characters using the CharacterBuilder pattern
- Updating team recommendations and teammate sections
- Adding new archetypes or roles
- Updating character labels and classifications

### Feedback & Issues

- Reporting bugs or suggesting features
- Providing feedback on team recommendations
- Suggesting improvements to the user interface

**Note**: Character data updates for the API version are managed through the admin interface and do not require pull requests.

## Credits

- **Character Images & Game Data**: [mar-7th/starrailres](https://github.com/mar-7th/starrailres) GitHub repository
- **Team Building Data**: Gouba https://www.youtube.com/@guobacertified and Prydwen https://www.prydwen.gg/star-rail/
- **UI Framework**: Bootstrap 5
- **Development**: Vue 3 + TypeScript + Vite
- **Special Thanks**: To all community members who contribute character data and team recommendations
