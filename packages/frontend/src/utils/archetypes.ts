export const canonicalizeArchetype = (archetype: string) => {
  const normalized = archetype.trim().toLowerCase()

  switch (normalized) {
    case 'shield':
    case 'shields':
    case 'shielder':
    case 'shielders':
      return 'Shielder'
    case 'break dps':
    case 'break-dps':
      return 'Break-DPS'
    case 'follow up':
    case 'follow-up':
      return 'Follow-up'
    case 'ultimate based':
    case 'ultimate-based':
      return 'Ultimate-Based'
    case 'hp scaling':
    case 'hp-scaling':
      return 'HP-Scaling'
    default:
      return archetype
  }
}

export const canonicalizeArchetypes = (archetypes: string[]) =>
  archetypes.map(canonicalizeArchetype)
