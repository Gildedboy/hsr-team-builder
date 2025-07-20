import { CharacterBuilder } from '@/types/Character'

export const supportCharacters = [
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
    .addTeamComposition('Dr. Ratio Team', 'Debuffer', ['ratio', 'jiaoqiu', 'robin', 'aventurine'])
    .build(),

  new CharacterBuilder('asta', 'Asta')
    .element('Fire')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['SPD Amplifier', 'Burn', 'F2P', 'ATK Amplifier'])
    .addTeammateSection(
      'DPS',
      ['kafka', 'aglaea'],
      ['Any DPS as long as they can benefit from the SPD and ATK buffs'],
      [],
    )
    .addTeamComposition('Kafka Team', 'Buffer', ['kafka', 'black-swan', 'asta', 'huohuo'])
    .addTeamComposition('Aglaea Team', 'Buffer', ['aglaea', 'sunday', 'asta', 'huohuo'])
    .build(),

  new CharacterBuilder('yukong', 'Yukong')
    .element('Imaginary')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels([
      'ATK Amplifier',
      'Crit Rate Amplifier',
      'Crit DMG Amplifier ',
      'Imaginary DMG Amplifier',
      'F2P',
    ])
    .addTeammateSection(
      'DPS',
      ['dan-heng-il'],
      ['Any DPS as long as they can benefit from the ATK and Crit buffs'],
      [],
    )
    .addTeamComposition('Dan Heng IL Team', 'Buffer', [
      'dan-heng-il',
      'sparkle',
      'yukong',
      'huohuo',
    ])
    .build(),

  new CharacterBuilder('hanya', 'Hanya')
    .element('Physical')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['ATK Amplifier', 'SPD Amplifier', 'Recover Skill Points', 'Burden', 'F2P'])
    .addTeammateSection(
      'DPS',
      ['dan-heng-il', 'archer'],
      ['Any DPS as long as they can benefit from the ATK, SPD buffs and SP Recovery'],
      [],
    )
    .addTeamComposition('Dan Heng IL Team', 'Buffer', ['dan-heng-il', 'sunday', 'hanya', 'huohuo'])
    .addTeamComposition('Archer Team', 'Buffer', ['archer', 'silver-wolf', 'hanya', 'gallagher'])
    .build(),

  new CharacterBuilder('bronya', 'Bronya')
    .element('Wind')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels([
      'Self Action Advance',
      'Action Advance',
      'F2P',
      'Crit DMG Amplifier',
      'ATK Amplifier',
      'Cleanse on Skill',
      'DMG Amplifier',
    ])
    .addTeammateSection(
      'DPS',
      ['phainon', 'boothill'],
      ['Any DPS as long as they can benefit from the ATK, Crit, DMG buffs and Action Advance'],
    )
    .addTeamComposition('Phainon Team', 'Buffer', ['phainon', 'sunday', 'bronya', 'tribbie'])
    .addTeamComposition('Boothill Team', 'Buffer', [
      'boothill',
      'harmony-trailblazer',
      'bronya',
      'lingsha',
    ])
    .build(),

  new CharacterBuilder('harmony-trailblazer', 'Harmony TB')
    .element('Imaginary')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Break Effect Amplifier', 'Super Break', 'F2P'])
    .addTeammateSection(
      'DPS',
      ['boothill', 'firefly', 'rappa'],
      ['Any DPS as long as they can benefit from the Super Break buffs'],
    )
    .addTeamComposition('Boothill Team', 'Buffer', [
      'boothill',
      'harmony-trailblazer',
      'fugue',
      'lingsha',
    ])
    .addTeamComposition('Firefly Team', 'Buffer', [
      'firefly',
      'harmony-trailblazer',
      'fugue',
      'lingsha',
    ])
    .addTeamComposition('Rappa Team', 'Buffer', [
      'rappa',
      'harmony-trailblazer',
      'fugue',
      'lingsha',
    ])
    .build(),

  new CharacterBuilder('robin', 'Robin')
    .element('Physical')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels([
      'Follow-up Amplifier',
      'Action Advance',
      'DMG Amplifier',
      'ATK Amplifier',
      'Immune to Crowd Control on Concerto',
    ])
    .addTeammateSection(
      'DPS',
      ['feixiao', 'aglaea'],
      ['Any DPS as long as they can benefit from the ATK, DMG and Follow-up buffs'],
    )
    .addTeamComposition('Feixiao Team', 'Buffer', ['feixiao', 'cipher', 'robin', 'aventurine'])
    .addTeamComposition('Aglaea', 'Buffer', ['aglaea', 'sunday', 'robin', 'huohuo'])
    .build(),

  new CharacterBuilder('ruan-mei', 'Ruan Mei')
    .element('Ice')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels([
      'DMG Amplifier',
      'All-Type RES PEN Amplifier',
      'Weakness Break Efficiency',
      'SPD Amplifier',
      'Break Amplifier',
    ])
    .addTeammateSection(
      'DPS',
      ['boothill', 'firefly', 'rappa'],
      ['Any DPS as long as they can benefit from the DMG, SPD, and Break buffs'],
    )
    .addTeamComposition('Boothill Team', 'Buffer', ['boothill', 'ruan-mei', 'fugue', 'lingsha'])
    .addTeamComposition('Firefly Team', 'Buffer', ['firefly', 'ruan-mei', 'fugue', 'lingsha'])
    .addTeamComposition('Rappa Team', 'Buffer', ['rappa', 'ruan-mei', 'fugue', 'lingsha'])
    .build(),

  new CharacterBuilder('sparkle', 'Sparkle')
    .element('Quantum')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels([
      'Crit DMG Amplifier',
      'Action Advance',
      'Recover Skill Points',
      'DMG Amplifier',
      'ATK Amplifier',
      'Quantum ATK Amplifier',
    ])
    .addTeammateSection(
      'DPS',
      ['dan-heng-il', 'archer'],
      ['Any DPS as long as they can benefit from the DMG, ATK, Crit DMG buffs and SP Recovery'],
      [],
    )
    .addTeamComposition('Dan Heng IL Team', 'Buffer', [
      'dan-heng-il',
      'sparkle',
      'sunday',
      'huohuo',
    ])
    .addTeamComposition('Archer Team', 'Buffer', ['archer', 'sparkle', 'silver-wolf', 'gallagher'])
    .build(),

  new CharacterBuilder('sunday', 'Sunday')
    .element('Imaginary')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels([
      'Action Advance',
      'Summon DMG Amplifier',
      'Crit DMG Amplifier',
      'Crit Rate Amplifier',
      'DMG Amplifier',
      'SP Recovery',
      'Gives Energy',
      'Cleanse on Skill',
    ])
    .addTeammateSection(
      'DPS',
      ['phainon', 'aglaea'],
      [
        'Any DPS as long as they can benefit from the DMG, Summon DMG, Crit Rate, Crit DMG buffs, Energy Recovery and SP Recovery',
      ],
    )
    .addTeamComposition('Phainon', 'Buffer', ['phainon', 'sunday', 'bronya', 'tribbie'])
    .addTeamComposition('Aglaea Team', 'Buffer', ['aglaea', 'sunday', 'robin', 'huohuo'])
    .build(),

  new CharacterBuilder('tingyun', 'Tingyun')
    .element('Lightning')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['ATK Amplifier', 'Gives Energy', 'DMG Amplifier', 'F2P'])
    .addTeammateSection(
      'DPS',
      ['phainon', 'yunli'],
      ['Any DPS as long as they can benefit from the DMG, Attack buffs and Energy Recovery'],
    )
    .addTeamComposition('Phainon', 'Buffer', ['phainon', 'sunday', 'bronya', 'tingyun'])
    .addTeamComposition('Yunli Team', 'Buffer', ['yunli', 'sunday', 'tingyun', 'huohuo'])
    .build(),

  new CharacterBuilder('fugue', 'Fugue')
    .element('Fire')
    .path('Nihility')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels([
      'Foxian Prayer',
      'Break Effect Amplifier',
      'Exo-Toughness',
      'Reduce enemy DEF',
      'Ultimate ignores weakness',
      'Super Break',
    ])
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
    .archetype('Debuffer')
    .labels(['Amplifier', 'Follow-up Attack', 'Debuff', 'Vulnerability', 'True Damage'])
    .addTeammateSection('Debuffers', ['jiaoqiu', 'silver-wolf'], ['bronya'], ['pela'])
    .addTeammateSection('Sustain', ['aventurine'], ['fu-xuan', 'huohuo'], ['gallagher'])
    .build(),

  new CharacterBuilder('guinaifen', 'Guinaifen')
    .element('Fire')
    .path('Nihility')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('DoT', 'Debuffer')
    .labels(['DoT', 'Fire', 'F2P'])
    .build(),
]
