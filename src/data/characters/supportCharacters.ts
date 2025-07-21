import { CharacterBuilder } from '@/types/Character'

export const supportCharacters = [
  new CharacterBuilder('pela', 'Pela')
    .element('Ice')
    .path('Nihility')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels(['Exposed', 'Defense Reduction', 'F2P', 'Remove Enemy Buffs on Skill'])
    .addTeammateSection(
      'DPS',
      ['acheron'],
      [
        'Any DPS as long as they can benefit from Enemy Reduced DEF and constant Debuffs Applications',
      ],
      [],
    )
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
    ])
    .addTeammateSection(
      'DPS',
      ['acheron', 'archer'],
      [
        'Any DPS as long as they can benefit from Enemy Reduced DEF, SPD, ATK, Weakness RES and constant Debuffs Applications',
      ],
      [],
    )
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
    .archetype('DoT', 'Debuffer')
    .labels(['Ashen Roast', 'Vulnerability', 'Ultimate Vulnerability', 'DoT'])
    .addTeammateSection(
      'DPS',
      ['acheron'],
      [
        'Any DPS as long as they can benefit from Enemy Increased DMG Taken, Ultimate DMG Taken and constant Debuffs Applications',
      ],
      [],
    )
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
      [
        'Any DPS as long as they can benefit from the DMG, ATK, Crit DMG buffs, Action Advance and SP Recovery',
      ],
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
        'Any DPS as long as they can benefit from the DMG, Summon DMG, Crit Rate, Crit DMG buffs, Energy Recovery, Action Advance and SP Recovery',
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
    .labels(['ATK Amplifier', 'Gives Energy', 'DMG Amplifier', 'F2P', 'Self Taunt'])
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
      'Self Taunt',
    ])
    .addTeammateSection(
      'DPS',
      ['boothill', 'firefly', 'rappa'],
      ['Any DPS as long as they can benefit from the Super Break buffs and Exo-Toughness'],
    )
    .addTeamComposition('Boothill Team', 'Buffer', ['boothill', 'fugue', 'ruan-mei', 'lingsha'])
    .addTeamComposition('Firefly Team', 'Buffer', ['firefly', 'fugue', 'ruan-mei', 'lingsha'])
    .addTeamComposition('Rappa Team', 'Buffer', ['rappa', 'fugue', 'ruan-mei', 'lingsha'])
    .build(),

  new CharacterBuilder('remembrance-trailblazer', 'Remembrance TB')
    .element('Ice')
    .path('Remembrance')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['True DMG Amplifier', 'Summon', 'Crit Rate Amplifier', 'Crit DMG Amplifier', 'F2P'])
    .addTeammateSection(
      'DPS',
      ['castorice'],
      ['Any DPS as long as they can benefit from the True DMG, Crit Rate and Crit DMG buffs'],
    )
    .addTeamComposition('Castorice Team', 'Buffer', [
      'castorice',
      'remembrance-trailblazer',
      'tribbie',
      'hyacine',
    ])
    .build(),

  new CharacterBuilder('tribbie', 'Tribbie')
    .element('Quantum')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels([
      'All-Type RES PEN Amplifier',
      'Increase DMG Taken by enemies',
      'Follow-up ATK',
      'HP Scaling ',
    ])
    .addTeammateSection(
      'DPS',
      ['the-herta', 'castorice'],
      [
        'Any DPS as long as they can benefit from the All-Type RES PEN Amplifier buffs and Follow-up attacks',
      ],
    )
    .addTeamComposition('Castorice Team', 'Buffer', [
      'castorice',
      'remembrance-trailblazer',
      'tribbie',
      'hyacine',
    ])
    .addTeamComposition('The Herta Team', 'Buffer', ['the-herta', 'anaxa', 'tribbie', 'huohuo'])
    .build(),

  new CharacterBuilder('cipher', 'Cipher')
    .element('Quantum')
    .path('Hunt')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels(['Follow-up Attack', 'Reduce Enemy DMG Done', 'Vulnerability', 'True Damage'])
    .addTeammateSection(
      'DPS',
      ['feixiao', 'acheron'],
      [
        'Any DPS as long as they can benefit from follow-up attacks and constant Debuffs Application',
      ],
      [],
    )
    .addTeamComposition('Acheron Team', 'Debuffer', ['acheron', 'cipher', 'jiaoqiu', 'aventurine'])
    .addTeamComposition('Feixiao Team', 'Debuffer', ['feixiao', 'cipher', 'robin', 'aventurine'])
    .build(),

  new CharacterBuilder('guinaifen', 'Guinaifen')
    .element('Fire')
    .path('Nihility')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('DoT', 'Debuffer')
    .labels(['DoT', 'Burn', 'F2P', 'Firekiss', 'Increase DMG to Burned Enemies'])
    .addTeammateSection(
      'DPS',
      ['acheron', 'kafka'],
      ['Any DPS as long as they can benefit from DoT and constant Debuffs Application'],
      [],
    )
    .addTeamComposition('Acheron Team', 'Debuffer', [
      'acheron',
      'jiaoqiu',
      'guinaifen',
      'aventurine',
    ])
    .addTeamComposition('Kafka Team', 'Debuffer', ['kafka', 'black-swan', 'guinaifen', 'huohuo'])
    .build(),
]
