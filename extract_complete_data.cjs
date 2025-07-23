const fs = require('fs');

// Read the main branch files
const dpsData = fs.readFileSync('/tmp/dps_main.ts', 'utf8');
const supportData = fs.readFileSync('/tmp/support_main.ts', 'utf8');
const sustainData = fs.readFileSync('/tmp/sustain_main.ts', 'utf8');

function extractCharacters(fileContent) {
  const characters = [];

  // Find all CharacterBuilder instances
  const builderPattern = /new CharacterBuilder\('([^']+)',\s*'([^']+)'\)([\s\S]*?)\.build\(\)/g;

  let match;
  while ((match = builderPattern.exec(fileContent)) !== null) {
    const [, id, name, chain] = match;

    const character = {
      id,
      name,
      element: extractProperty(chain, 'element'),
      path: extractProperty(chain, 'path'),
      rarity: parseInt(extractProperty(chain, 'rarity')) || 0,
      roles: extractArray(chain, 'roles'),
      archetype: extractArchetype(chain),
      labels: extractArray(chain, 'labels'),
      teammateRecommendations: extractTeammateRecommendations(chain),
      teamCompositions: extractTeamCompositions(chain)
    };

    characters.push(character);
  }

  return characters;
}

function extractProperty(chain, propName) {
  // Handle both quoted and unquoted values
  let match = chain.match(new RegExp(`\\.${propName}\\('([^']+)'\\)`)); // quoted
  if (match) return match[1];
  
  match = chain.match(new RegExp(`\\.${propName}\\(([^)]+)\\)`)); // unquoted
  return match ? match[1] : '';
}

function extractArray(chain, propName) {
  const match = chain.match(new RegExp(`\\.${propName}\\(\\[([\\s\\S]*?)\\]\\)`));
  if (!match) return [];

  return match[1]
    .split(',')
    .map(item => item.trim().replace(/['"]/g, ''))
    .filter(item => item.length > 0);
}

function extractArchetype(chain) {
  const match = chain.match(/\.archetype\((.*?)\)/);
  if (!match) return [];

  const content = match[1];
  if (content.includes('[')) {
    return extractArray(chain, 'archetype');
  }
  return [content.trim().replace(/['"]/g, '')];
}

function extractTeammateRecommendations(chain) {
  const recommendations = [];
  // Match multiline addTeammateSection with proper array parsing
  const pattern = /\.addTeammateSection\(\s*'([^']+)',\s*\[([\s\S]*?)\],\s*\[([\s\S]*?)\],\s*\[([\s\S]*?)\],?\s*\)/g;

  let match;
  while ((match = pattern.exec(chain)) !== null) {
    const [, name, bisStr, genStr, f2pStr] = match;

    recommendations.push({
      name,
      bis: parseArrayContent(bisStr),
      generalist: parseArrayContent(genStr),
      f2p: parseArrayContent(f2pStr)
    });
  }

  return recommendations;
}

function extractTeamCompositions(chain) {
  const compositions = [];
  
  // Match addTeamComposition with 4 parameters: name, role, bisTeam, f2pTeam
  const pattern4 = /\.addTeamComposition\(\s*'([^']+)',\s*'([^']+)',\s*\[([\s\S]*?)\],\s*\[([\s\S]*?)\],?\s*\)/g;
  
  // Match addTeamComposition with 3 parameters: name, role, team (sustain characters format)
  const pattern3 = /\.addTeamComposition\(\s*'([^']+)',\s*'([^']+)',\s*\[([\s\S]*?)\]\s*\)/g;

  let match;
  
  // Try 4-parameter format first
  while ((match = pattern4.exec(chain)) !== null) {
    const [, teamName, role, bisTeam] = match;

    compositions.push({
      name: teamName,
      role: role,
      bis: {
        characters: parseArrayContent(bisTeam)
      }
    });
  }
  
  // Then try 3-parameter format (sustain characters)
  chain.replace(pattern4, ''); // Remove already matched 4-parameter patterns
  while ((match = pattern3.exec(chain)) !== null) {
    const [, teamName, role, team] = match;

    compositions.push({
      name: teamName,
      role: role,
      bis: {
        characters: parseArrayContent(team)
      }
    });
  }

  return compositions;
}

function parseArrayContent(str) {
  if (!str || str.trim() === '') return [];

  const items = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = null;
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    if ((char === '"' || char === "'") && !inQuotes) {
      inQuotes = true;
      quoteChar = char;
    } else if (char === quoteChar && inQuotes) {
      inQuotes = false;
      if (current.trim()) {
        items.push(current.trim());
        current = '';
      }
      quoteChar = null;
    } else if (inQuotes) {
      current += char;
    } else if (char === ',' && !inQuotes) {
      if (current.trim() && !current.includes('"') && !current.includes("'")) {
        // This is a non-quoted item
        items.push(current.trim());
        current = '';
      }
    } else if (!inQuotes && char !== ' ' && char !== '\n' && char !== '\r') {
      current += char;
    }
  }
  
  // Add last item if any
  if (current.trim()) {
    items.push(current.trim());
  }

  return items.filter(item => item.length > 0);
}


// Extract all characters
console.log('🔄 Extracting enhanced character data...');

const dpsChars = extractCharacters(dpsData);
const supportChars = extractCharacters(supportData);
const sustainChars = extractCharacters(sustainData);

const allCharacters = [...dpsChars, ...supportChars, ...sustainChars];

console.log(`✅ Extracted ${allCharacters.length} characters:`);
console.log(`   - DPS: ${dpsChars.length}`);
console.log(`   - Support: ${supportChars.length}`);
console.log(`   - Sustain: ${sustainChars.length}`);

// Quality check
const withCompositions = allCharacters.filter(c => c.teamCompositions.length > 0).length;
const withRecommendations = allCharacters.filter(c => c.teammateRecommendations.length > 0).length;

console.log(`📊 Data Quality:`);
console.log(`   - With team compositions: ${withCompositions}`);
console.log(`   - With teammate recommendations: ${withRecommendations}`);

// Save the data
const tsContent = `// Enhanced character data with complete teammate recommendations and team compositions
// Extracted from main branch on ${new Date().toISOString()}

export const allCharactersSeedData = ${JSON.stringify(allCharacters, null, 2)};`;

fs.writeFileSync('packages/backend/src/data/allCharactersData.ts', tsContent);
console.log('\n✅ Enhanced data saved to backend!');

console.log('\nSample character data:');
console.log(JSON.stringify(allCharacters[0], null, 2));
