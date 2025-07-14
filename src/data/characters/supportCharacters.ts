import { CharacterBuilder } from '@/types/Character'

export const supportCharacters = [
  // Support Characters
  new CharacterBuilder('pela', 'Pela')
    .element('Ice')
    .path('Nihility')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels([
      'Exposed',
      'Defense Reduction',
      'F2P',
      'Remove Buffs on Skill',
      'Single Target',
      'AoE',
    ])
    .addTeammateSection('DPS', ['acheron'], ['castorice', 'ratio'], ['yanqing'])
    .addTeamComposition('Acheron Team', 'Debuffer', ['acheron', 'pela', 'cipher', 'aventurine'])
    .addTeamComposition('Castorice Team', 'Debuffer', ['castorice', 'pela', 'tribbie', 'hyacine'])
    .build(),

  new CharacterBuilder('silver-wolf', 'Silver Wolf')
    .element('Quantum')
    .path('Nihility')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels([
      'Attack Reduction',
      'Speed Reduction',
      'Defense Reduction',
      'Weakness Implant',
      'Weakness RES Reduction',
      'Defense Reduction',
      'Single Target',
      'AoE',
      'Generalist Debuffer',
    ])
    .addTeammateSection('DPS', ['acheron'], ['ratio'], ['archer'])
    .addTeamComposition('Acheron Team', 'Debuffer', [
      'acheron',
      'silver-wolf',
      'cipher',
      'aventurine',
    ])
    .addTeamComposition('Archer Team', 'Debuffer', [
      'archer',
      'silver-wolf',
      'sparkle',
      'gallagher',
    ])
    .build(),

  new CharacterBuilder('jiaoqiu', 'Jiaoqiu')
    .element('Fire')
    .path('Nihility')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels(['Ashen Roast', 'Vulnerability', 'Ultimate Vulnerability', 'Blast', 'AoE'])
    .addTeammateSection('DPS', ['acheron'], ['ratio', 'kafka', 'black-swan'], [])
    .addTeamComposition('Acheron Team', 'Debuffer', ['acheron', 'jiaoqiu', 'cipher', 'aventurine'])
    .addTeamComposition('Dr. Ratio Team', 'Main DPS', ['ratio', 'jiaoqiu', 'robin', 'aventurine'])
    .build(),

  new CharacterBuilder('asta', 'Asta')
    .element('Fire')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Speed Amplifier', 'Burn', 'F2P', 'Attack Amplifier', 'Bounce'])
    .build(),

  new CharacterBuilder('yukong', 'Yukong')
    .element('Imaginary')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels([
      'Attack Amplifier',
      'Crit Rate Amplifier',
      'Crit DMG Amplifier ',
      'F2P',
      'Single Target',
    ])
    .build(),

  new CharacterBuilder('hanya', 'Hanya')
    .element('Physical')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Attack Amplifier', 'Speed Amplifier', 'Recover Skill Points', 'Burden', 'F2P'])
    .addTeammateSection('DPS', ['dan-heng-il'], ['archer'], [])
    .addTeamComposition('Dan Heng IL Team', 'Debuffer', [
      'dan-heng-il',
      'hanya',
      'tingyun',
      'gallagher',
    ])
    .addTeamComposition('Archer Team', 'Main DPS', ['archer', 'hanya', 'tingyun', 'gallagher'])
    .build(),

  // Buffer Characters
  new CharacterBuilder('bronya', 'Bronya')
    .element('Wind')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels([
      'Action Advancer',
      'Action Advance',
      'F2P',
      'Crit DMG Amplifier',
      'Attack Amplifier',
      'Generalist',
      'Cleanse on Skill',
      'DMG Amplifier',
    ])
    .addTeammateSection('DPS', ['phainon'], ['boothill'], [])
    .addTeamComposition('Phainon Team', 'Support', ['phainon', 'sunday', 'bronya', 'tribbie'])
    .addTeamComposition('Boothill Team', 'Support', [
      'boothill',
      'harmony-trailblazer',
      'bronya',
      'gallagher',
    ])
    .build(),

  new CharacterBuilder('harmony-trailblazer', 'Harmony TB')
    .element('Imaginary')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Break Amplifier', 'Super Break', 'F2P'])
    .addTeammateSection('DPS', ['boothill', 'firefly', 'rappa'], [], [])
    .build(),

  new CharacterBuilder('robin', 'Robin')
    .element('Physical')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Buffer', 'Follow-up Support', 'Action Advance'])
    .build(),

  new CharacterBuilder('ruan-mei', 'Ruan Mei')
    .element('Ice')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Buffer', 'Break Support', 'Generalist'])
    .build(),

  new CharacterBuilder('sparkle', 'Sparkle')
    .element('Quantum')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Support', 'Buffer', 'Crit Support', 'Generalist'])
    .build(),

  new CharacterBuilder('sunday', 'Sunday')
    .element('Imaginary')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Buffer', 'Summon Support', 'Energy Support'])
    .build(),

  new CharacterBuilder('tingyun', 'Tingyun')
    .element('Lightning')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Support', 'Buffer', 'Energy Support', 'Generalist', 'F2P'])
    .build(),

  // New Support Characters
  new CharacterBuilder('fugue', 'Fugue')
    .element('Fire')
    .path('Nihility')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Buffer', 'Break Support', 'Exo-Toughness', 'Fire'])
    .build(),

  new CharacterBuilder('remembrance-trailblazer', 'Remembrance TB')
    .element('Ice')
    .path('Remembrance')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Support', 'Summon', 'Ice', 'F2P'])
    .build(),

  new CharacterBuilder('tribbie', 'Tribbie')
    .element('Quantum')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Buffer', 'Quantum', 'Follow-up Support'])
    .build(),

  new CharacterBuilder('cipher', 'Cipher')
    .element('Quantum')
    .path('Hunt')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels([
      'Amplifier',
      'Follow-up Attack',
      'Debuff',
      'Vulnerability',
      'True Damage',
      'Generalist',
    ])
    .addTeammateSection('Debuffers', ['jiaoqiu', 'silver-wolf'], ['bronya'], ['pela'])
    .addTeammateSection('Sustain', ['aventurine'], ['fu-xuan', 'huohuo'], ['gallagher'])
    .build(),

  new CharacterBuilder('guinaifen', 'Guinaifen')
    .element('Fire')
    .path('Nihility')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('DoT')
    .labels(['DoT', 'Fire', 'F2P'])
    .build(),
]
