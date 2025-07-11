import type { Character as OldCharacter } from '@/types/Character'
import { CharacterBuilder, type Archetype, type Role } from '@/types/NewCharacter'

// Migration utility to convert old characters to new system
export function migrateCharacter(oldChar: OldCharacter) {
  const builder = new CharacterBuilder(oldChar.id, oldChar.name)
    .element(oldChar.element)
    .path(oldChar.path)
    .rarity(oldChar.rarity)
    .labels(oldChar.labels)

  // Convert mainArchetype to roles and archetype
  const roles = convertToRoles(oldChar.mainArchetype, oldChar.labels)
  const archetype = convertToArchetype(oldChar.labels, oldChar.name)
  
  builder.roles(roles).archetype(archetype)

  // Convert team recommendations to flexible sections
  if (oldChar.teamRecommendations) {
    const { teamRecommendations } = oldChar

    // Add Sub-DPS section if exists
    if (teamRecommendations.subDPS) {
      builder.addTeammateSection('Sub-DPS Partners',
        teamRecommendations.subDPS.bis,
        teamRecommendations.subDPS.generalist,
        teamRecommendations.subDPS.f2p
      )
    }

    // Add Amplifier section
    if (teamRecommendations.amplifier) {
      builder.addTeammateSection('Amplifiers',
        teamRecommendations.amplifier.bis,
        teamRecommendations.amplifier.generalist,
        teamRecommendations.amplifier.f2p
      )
    }

    // Add Sustain section
    if (teamRecommendations.sustain) {
      builder.addTeammateSection('Sustain',
        teamRecommendations.sustain.bis,
        teamRecommendations.sustain.generalist,
        teamRecommendations.sustain.f2p
      )
    }

    // Create basic team compositions
    if (teamRecommendations.amplifier && teamRecommendations.sustain) {
      // Main DPS team
      const bisTeam = [
        oldChar.id,
        teamRecommendations.amplifier.bis[0] || teamRecommendations.amplifier.generalist[0],
        teamRecommendations.subDPS?.bis[0] || teamRecommendations.amplifier.bis[1] || teamRecommendations.amplifier.generalist[1],
        teamRecommendations.sustain.bis[0] || teamRecommendations.sustain.generalist[0]
      ].filter(Boolean)

      const f2pTeam = [
        oldChar.id,
        teamRecommendations.amplifier.f2p[0] || teamRecommendations.amplifier.generalist[0],
        teamRecommendations.subDPS?.f2p[0] || teamRecommendations.amplifier.f2p[1] || teamRecommendations.amplifier.generalist[1],
        teamRecommendations.sustain.f2p[0] || teamRecommendations.sustain.generalist[0]
      ].filter(Boolean)

      builder.addTeamComposition('Main DPS Team', 'Main DPS', bisTeam, f2pTeam)

      // Sub-DPS team if character can be sub-DPS
      if (roles.includes('SUB_DPS') && teamRecommendations.subDPS) {
        const subDpsBisTeam = [
          teamRecommendations.subDPS.bis[0] || 'jingliu', // placeholder main DPS
          oldChar.id,
          teamRecommendations.amplifier.bis[0] || teamRecommendations.amplifier.generalist[0],
          teamRecommendations.sustain.bis[0] || teamRecommendations.sustain.generalist[0]
        ].filter(Boolean)

        const subDpsF2pTeam = [
          teamRecommendations.subDPS.f2p[0] || 'jingliu', // placeholder main DPS
          oldChar.id,
          teamRecommendations.amplifier.f2p[0] || teamRecommendations.amplifier.generalist[0],
          teamRecommendations.sustain.f2p[0] || teamRecommendations.sustain.generalist[0]
        ].filter(Boolean)

        builder.addTeamComposition('Sub-DPS Team', 'Sub-DPS', subDpsBisTeam, subDpsF2pTeam)
      }
    }
  }

  return builder.build()
}

function convertToRoles(mainArchetype: string, labels: string[]): Role[] {
  const roles: Role[] = []
  
  if (mainArchetype === 'DPS' || labels.includes('DPS')) {
    roles.push('DPS')
  }
  
  if (labels.includes('Sub-DPS')) {
    roles.push('SUB_DPS')
  }
  
  if (mainArchetype === 'Support' || labels.includes('Support')) {
    roles.push('SUPPORT')
  }
  
  if (mainArchetype === 'Sustain' || labels.includes('Sustain')) {
    roles.push('SUSTAIN')
  }

  return roles.length > 0 ? roles : ['DPS'] // default to DPS
}

function convertToArchetype(labels: string[], name: string): Archetype {
  // HP Scaling characters
  if (labels.includes('HP Scaling') || name === 'Blade') {
    return 'HP-Scaling'
  }
  
  // Follow-up characters
  if (labels.includes('Follow-up Attack')) {
    return 'Follow-up'
  }
  
  // Ultimate based
  if (labels.includes('Ultimate Based')) {
    return 'Ultimate-Based'
  }
  
  // Counter characters
  if (labels.includes('Counter Attack')) {
    return 'Counter'
  }
  
  // Energy hungry
  if (labels.includes('Energy Hungry')) {
    return 'Energy-Hungry'
  }
  
  // Debuff stackers
  if (labels.includes('Debuff Stacking')) {
    return 'Ultimate-Based' // Acheron-like
  }
  
  // Default to hypercarry for most DPS
  return 'Hypercarry'
}