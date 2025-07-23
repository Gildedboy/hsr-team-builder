const fs = require('fs');

// Get the main branch character data files
const getDpsData = () => {
  try {
    return fs.readFileSync('src/data/characters/dpsCharacters.ts', 'utf8');
  } catch {
    console.log('⚠️  DPS file not found, fetching from main branch...');
    return '';
  }
};

const getSupportData = () => {
  try {
    return fs.readFileSync('src/data/characters/supportCharacters.ts', 'utf8');
  } catch {
    console.log('⚠️  Support file not found, fetching from main branch...');
    return '';
  }
};

const getSustainData = () => {
  try {
    return fs.readFileSync('src/data/characters/sustainCharacters.ts', 'utf8');
  } catch {
    console.log('⚠️  Sustain file not found, fetching from main branch...');
    return '';
  }
};

// Enhanced parsing function that handles both character IDs and custom text
function parseTeammateArray(arrayContent) {
  const items = [];
  let current = '';
  let inQuotes = false;
  let depth = 0;

  for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];

    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
      current += char;
    } else if (char === '[') {
      depth++;
      current += char;
    } else if (char === ']') {
      depth--;
      current += char;
    } else if (char === ',' && depth === 0 && !inQuotes) {
      const item = current.trim().replace(/^['"]|['"]$/g, '');
      if (item) items.push(item);
      current = '';
    } else {
      current += char;
    }
  }

  // Add the last item
  const item = current.trim().replace(/^['"]|['"]$/g, '');
  if (item) items.push(item);

  return items;
}

// Enhanced extraction that captures both teammate recommendations and team compositions
function extractCharacterData(fileContent) {
  const characters = [];

  // Match CharacterBuilder patterns with everything including team compositions
  const characterPattern = /new CharacterBuilder\('([^']+)',\s*'([^']+)'\)([\s\S]*?)\.build\(\)/g;

  let match;
  while ((match = characterPattern.exec(fileContent)) !== null) {
    const [, id, name, builderChain] = match;

    const character = {
      id,
      name,
      element: '',
      path: '',
      rarity: 0,
      roles: [],
      archetype: [],
      labels: [],
      teammateRecommendations: [],
      teamCompositions: []
    };

    // Extract basic properties
    const elementMatch = builderChain.match(/\.element\('([^']+)'\)/);
    if (elementMatch) character.element = elementMatch[1];

    const pathMatch = builderChain.match(/\.path\('([^']+)'\)/);
    if (pathMatch) character.path = pathMatch[1];

    const rarityMatch = builderChain.match(/\.rarity\((\d+)\)/);
    if (rarityMatch) character.rarity = parseInt(rarityMatch[1]);

    // Extract roles array
    const rolesMatch = builderChain.match(/\.roles\(\[(.*?)\]\)/);
    if (rolesMatch) {
      character.roles = rolesMatch[1].split(',').map(r => r.trim().replace(/['"]/g, ''));
    }

    // Extract archetype (can be single or multiple)
    const archetypeMatch = builderChain.match(/\.archetype\((.*?)\)/);
    if (archetypeMatch) {
      const archetypeContent = archetypeMatch[1];
      if (archetypeContent.includes('[')) {
        // Array format
        const arrayContent = archetypeContent.match(/\[(.*?)\]/)[1];
        character.archetype = arrayContent.split(',').map(a => a.trim().replace(/['"]/g, ''));
      } else {
        // Single value format
        character.archetype = [archetypeContent.trim().replace(/['"]/g, '')];
      }
    }

    // Extract labels array
    const labelsMatch = builderChain.match(/\.labels\(\[([\s\S]*?)\]\)/);
    if (labelsMatch) {
      character.labels = parseTeammateArray(labelsMatch[1]);
    }

    // Extract teammate recommendations (with proper custom text handling)
    const teammatePattern = /\.addTeammateSection\(\s*'([^']+)',\s*\[([\s\S]*?)\],\s*\[([\s\S]*?)\],\s*\[([\s\S]*?)\]\s*\)/g;
    let teammateMatch;
    while ((teammateMatch = teammatePattern.exec(builderChain)) !== null) {
      const [, sectionName, bisContent, generalistContent, f2pContent] = teammateMatch;

      character.teammateRecommendations.push({
        name: sectionName,
        bis: parseTeammateArray(bisContent),
        generalist: parseTeammateArray(generalistContent),
        f2p: parseTeammateArray(f2pContent)
      });
    }

    // Extract team compositions
    const teamPattern = /\.addTeamComposition\(\s*'([^']+)',\s*'([^']+)',\s*\[([\s\S]*?)\](?:,\s*\[([\s\S]*?)\])?(?:,\s*'([^']*)')?(?:,\s*'([^']*)')?\s*\)/g;
    let teamMatch;
    while ((teamMatch = teamPattern.exec(builderChain)) !== null) {
      const [, teamName, role, bisTeam, f2pTeam, bisDesc, f2pDesc] = teamMatch;

      const composition = {
        name: teamName,
        role: role,
        bis: {
          characters: parseTeammateArray(bisTeam),
          description: bisDesc || undefined
        }
      };

      if (f2pTeam) {
        composition.f2p = {
          characters: parseTeammateArray(f2pTeam),
          description: f2pDesc || undefined
        };
      }

      character.teamCompositions.push(composition);
    }

    characters.push(character);
  }

  return characters;
}

// Main execution
console.log('🔄 Starting enhanced character data extraction...');

// Get data from all character files
const dpsData = getDpsData();
const supportData = getSupportData();
const sustainData = getSustainData();

let allCharacters = [];

if (dpsData) {
  const dpsCharacters = extractCharacterData(dpsData);
  console.log(`✅ Extracted ${dpsCharacters.length} DPS characters`);
  allCharacters = allCharacters.concat(dpsCharacters);
}

if (supportData) {
  const supportCharacters = extractCharacterData(supportData);
  console.log(`✅ Extracted ${supportCharacters.length} Support characters`);
  allCharacters = allCharacters.concat(supportCharacters);
}

if (sustainData) {
  const sustainCharacters = extractCharacterData(sustainData);
  console.log(`✅ Extracted ${sustainCharacters.length} Sustain characters`);
  allCharacters = allCharacters.concat(sustainCharacters);
}

console.log(`\n🎉 Total characters extracted: ${allCharacters.length}`);

// Validate data quality
const withTeamCompositions = allCharacters.filter(c => c.teamCompositions.length > 0).length;
const withTeammateRecs = allCharacters.filter(c => c.teammateRecommendations.length > 0).length;

console.log(`📊 Quality Report:`);
console.log(`   - Characters with team compositions: ${withTeamCompositions}`);
console.log(`   - Characters with teammate recommendations: ${withTeammateRecs}`);

// Save the complete dataset
const output = `// Enhanced character data extracted from main branch with complete data
// Includes teammate recommendations with custom text and team compositions
// Generated on ${new Date().toISOString()}

export const allCharactersSeedData = ${JSON.stringify(allCharacters, null, 2)};`;

fs.writeFileSync('enhanced_characters_complete.js', output);
console.log('\n✅ Enhanced data saved to enhanced_characters_complete.js');

// Also save as TypeScript for backend
const tsOutput = `// Enhanced character data extracted from main branch with complete data
// Includes teammate recommendations with custom text and team compositions
// Generated on ${new Date().toISOString()}

export const allCharactersSeedData = ${JSON.stringify(allCharacters, null, 2)};`;

fs.writeFileSync('packages/backend/src/data/allCharactersData.ts', tsOutput);
console.log('✅ Enhanced data saved to packages/backend/src/data/allCharactersData.ts');
