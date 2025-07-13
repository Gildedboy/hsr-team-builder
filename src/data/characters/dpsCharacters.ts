import { CharacterBuilder } from '@/types/Character'

export const dpsCharacters = [
  // DPS Characters
  new CharacterBuilder('seele', 'Seele')
    .element('Quantum')
    .path('Hunt')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Single Target', 'Extra Turn', 'Enhanced State', 'SP Unfriendly'])
    .addTeammateSection(
      'Amplifiers',
      ['sparkle', 'silver-wolf'],
      ['sunday', 'robin', 'cipher'],
      ['remembrance-trailblazer', 'bronya', 'tingyun', 'hanya', 'pela'],
    )
    .addTeammateSection('Sustain', ['fu-xuan'], ['huohuo'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['seele', 'sparkle', 'silver-wolf', 'fu-xuan'],
      ['seele', 'tingyun', 'hanya', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('jing-yuan', 'Jing Yuan')
    .element('Lightning')
    .path('Erudition')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Follow-up', 'Summon', 'Hypercarry')
    .labels(['AoE', 'Summon', 'Follow-up Attack'])
    .addTeammateSection(
      'Amplifiers',
      ['robin', 'sunday'],
      ['tribbie', 'cipher', 'sparkle', 'ruan-mei'],
      ['bronya', 'tingyun', 'pela'],
    )
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['hyacine'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['jing-yuan', 'robin', 'sunday', 'aventurine'],
      ['jing-yuan', 'tingyun', 'pela', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('clara', 'Clara')
    .element('Physical')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Counter')
    .labels(['Counter Attack', 'Blast', 'AoE', 'F2P'])
    .addTeammateSection('Dual DPS', ['yunli'], ['topaz'], [])
    .addTeammateSection(
      'Amplifiers',
      ['robin'],
      ['cipher', 'tribbie', 'silver-wolf', 'sunday', 'sparkle'],
      ['remembrance-trailblazer', 'pela'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['aventurine', 'luocha'], ['gallagher', 'lynx'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['clara', 'robin', 'sunday', 'huohuo'],
      ['clara', 'tingyun', 'remembrance-trailblazer', 'gallagher'],
    )
    .addTeamComposition(
      'Counter Duo',
      'Sub DPS',
      ['yunli', 'clara', 'robin', 'aventurine'],
      ['yunli', 'clara', 'pela', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('himeko', 'Himeko')
    .element('Fire')
    .path('Erudition')
    .rarity(5)
    .roles(['SUB_DPS'])
    .archetype('Follow-up', 'Break-DPS')
    .labels(['AoE', 'Blast', 'Follow-up Attack', 'F2P'])
    .addTeammateSection('Dual DPS', ['the-herta'], ['anaxa'], ['herta'])
    .addTeammateSection(
      'Dual Amplifiers',
      ['tribbie'],
      ['robin', 'ruan-mei', 'silver-wolf'],
      ['pela'],
    )
    .addTeammateSection(
      'Break Amplifiers',
      ['fugue', 'ruan-mei'],
      ['cipher'],
      ['harmony-trailblazer'],
    )
    .addTeammateSection('Sustain', ['lingsha'], ['hyacine', 'huohuo'], ['gallagher'])
    .addTeamComposition(
      'Dual DPS',
      'Sub DPS',
      ['himeko', 'the-herta', 'tribbie', 'lingsha'],
      ['himeko', 'herta', 'pela', 'gallagher'],
    )
    .addTeamComposition(
      'Break Team',
      'Main DPS',
      ['himeko', 'fugue', 'ruan-mei', 'lingsha'],
      ['himeko', 'harmony-trailblazer', 'pela', 'gallagher'],
    )

    .build(),

  new CharacterBuilder('yanqing', 'Yanqing')
    .element('Ice')
    .path('Hunt')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry', 'Follow-up')
    .labels(['Single Target', 'Follow-up Attack', 'F2P', 'Enhanced State'])
    .addTeammateSection(
      'Amplifiers',
      ['sunday'],
      ['sparkle', 'silver-wolf', 'cipher'],
      ['bronya', 'tingyun', 'pela', 'remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['aventurine'], [], ['gepard', 'march-7th'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['yanqing', 'sunday', 'bronya', 'aventurine'],
      ['yanqing', 'remembrance-trailblazer', 'tingyun', 'gepard'],
    )
    .build(),

  new CharacterBuilder('blade', 'Blade')
    .element('Wind')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS', 'SUB_DPS'])
    .archetype('HP-Scaling')
    .labels(['Follow-up Attack', 'HP Scaling', 'Self Damage', 'Self Taunt'])
    .addTeammateSection('Dual DPS', ['castorice'], ['jingliu'], [])
    .addTeammateSection(
      'Amplifiers',
      ['sunday', 'tribbie'],
      ['silver-wolf', 'cipher', 'ruan-mei'],
      ['bronya', 'remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['hyacine'], ['huohuo', 'luocha'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['blade', 'sunday', 'tribbie', 'hyacine'],
      ['blade', 'bronya', 'pela', 'gallagher'],
    )
    .addTeamComposition(
      'Dual DPS Team',
      'Sub-DPS',
      ['blade', 'castorice', 'tribbie', 'hyacine'],
      ['blade', 'hunt-march-7th', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('dan-heng-il', 'Dan Heng IL')
    .element('Imaginary')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Blast', 'AoE', 'Enhanced Basic Attack', 'SP Unfriendly'])
    .addTeammateSection(
      'Amplifiers',
      ['sparkle', 'sunday'],
      ['cipher', 'silver-wolf', 'ruan-mei', 'tribbie'],
      ['tingyun', 'hanya'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['luocha'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['dan-heng-il', 'sparkle', 'sunday', 'huohuo'],
      ['dan-heng-il', 'tingyun', 'hanya', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('jingliu', 'Jingliu')
    .element('Ice')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('HP-Scaling', 'Hypercarry')
    .labels(['Blast', 'Self Damage', 'Enhanced State', 'Action Advance', 'SP Friendly'])
    .addTeammateSection(
      'Amplifiers',
      ['tribbie', 'sunday'],
      ['cipher', 'silver-wolf', 'ruan-mei'],
      ['bronya', 'remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['hyacine'], ['huohuo', 'luocha'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['jingliu', 'sunday', 'tribbie', 'hyacine'],
      ['jingliu', 'bronya', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('argenti', 'Argenti')
    .element('Physical')
    .path('Erudition')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Ultimate-Based', 'Hypercarry')
    .labels(['AoE', 'Energy Hungry', 'Stackable Ultimate'])
    .addTeammateSection('Dual DPS', ['the-herta'], ['anaxa'], [])
    .addTeammateSection(
      'Amplifiers',
      ['tribbie', 'sunday'],
      ['robin', 'cipher', 'silver-wolf', 'ruan-mei'],
      ['remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['aventurine'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['argenti', 'sunday', 'silver-wolf', 'huohuo'],
      ['argenti', 'tingyun', 'pela', 'gallagher'],
    )
    .addTeamComposition(
      'Dual DPS Team',
      'Sub DPS',
      ['the-herta', 'argenti', 'tribbie', 'huohuo'],
      ['argenti', 'herta', 'pela', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('acheron', 'Acheron')
    .element('Lightning')
    .path('Nihility')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Ultimate-Based', 'Debuff DPS', 'Hypercarry')
    .labels(['AoE', 'Ultimate Based', 'Requires Nihility Partners', 'Debuff Synergy'])
    .addTeammateSection(
      'Debuffers',
      ['jiaoqiu', 'cipher'],
      ['silver-wolf', 'sunday', 'sparkle'],
      ['pela', 'guinaifen'],
    )
    .addTeammateSection('Sustain', ['aventurine'], ['fu-xuan', 'hyacine'], ['gallagher'])
    .addTeamComposition(
      'E0 Acheron Team',
      'Main DPS',
      ['acheron', 'jiaoqiu', 'cipher', 'aventurine'],
      ['acheron', 'pela', 'guinaifen', 'gallagher'],
    )
    .addTeamComposition(
      'E2 Acheron Team',
      'Main DPS',
      ['acheron', 'cipher', 'sunday', 'aventurine'],
      ['acheron', 'pela', 'bronya', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('yunli', 'Yunli')
    .element('Physical')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Counter', 'Ultimate-Based', 'Hypercarry')
    .labels(['Counter Attack', 'Blast', 'Stackable Ultimate', 'Self Taunt'])
    .addTeammateSection(
      'Amplifiers',
      ['robin', 'sunday'],
      ['cipher', 'silver-wolf', 'tribbie', 'sparkle'],
      ['tingyun', 'remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['aventurine', 'luocha'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['yunli', 'robin', 'sunday', 'huohuo'],
      ['yunli', 'tingyun', 'remembrance-trailblazer', 'gallagher'],
    )
    .addTeamComposition(
      'Counter Duo',
      'Sub DPS',
      ['yunli', 'clara', 'robin', 'aventurine'],
      ['yunli', 'clara', 'pela', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('topaz', 'Topaz')
    .element('Fire')
    .path('Hunt')
    .rarity(5)
    .roles(['SUB_DPS'])
    .archetype('Follow-up', 'Summon')
    .labels(['Follow-up Attack', 'SP Friendly', 'Single Target', 'Follow-up Support'])
    .addTeammateSection('DPS Partners', ['feixiao', 'ratio'], ['yunli'], ['moze', 'hunt-march-7th'])
    .addTeammateSection(
      'Dual Amplifiers',
      ['robin', 'tribbie'],
      ['silver-wolf', 'cipher', 'ruan-mei'],
      ['pela'],
    )
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['hyacine', 'fu-xuan'], ['gallagher'])
    .addTeamComposition(
      'Sub DPS Team',
      'Sub DPS',
      ['feixiao', 'topaz', 'robin', 'aventurine'],
      ['ratio', 'topaz', 'pela', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('ratio', 'Dr. Ratio')
    .element('Imaginary')
    .path('Hunt')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Follow-up', 'Debuff DPS', 'Hypercarry')
    .labels(['Follow-up Attack', 'Debuff Synergy'])
    .addTeammateSection('Sub-DPS Partners', ['topaz'], [], ['moze'])
    .addTeammateSection(
      'Amplifiers',
      ['robin', 'cipher'],
      ['jiaoqiu', 'silver-wolf', 'tribbie', 'sunday', 'sparkle'],
      ['pela', 'guinaifen'],
    )
    .addTeammateSection('Sustain', ['aventurine'], ['huohuo', 'lingsha'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['ratio', 'topaz', 'robin', 'aventurine'],
      ['ratio', 'moze', 'pela', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('jade', 'Jade')
    .element('Quantum')
    .path('Erudition')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Follow-up')
    .labels(['Follow-up Attack', 'AoE', 'Follow-up Support', 'Requires Partner'])
    .addTeammateSection('Dual DPS Partners', ['the-herta'], ['blade', 'himeko', 'anaxa'], ['herta'])
    .addTeammateSection('Amplifiers', ['tribbie'], ['robin'], ['remembrance-trailblazer'])
    .addTeammateSection(
      'Sustain',
      ['aventurine', 'huohuo'],
      ['fu-xuan', 'hyacine', 'lingsha'],
      ['gallagher'],
    )
    .addTeamComposition(
      'Dual DPS Team',
      'Sub DPS',
      ['jade', 'the-herta', 'tribbie', 'hyacine'],
      ['jade', 'herta', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('kafka', 'Kafka')
    .element('Lightning')
    .path('Nihility')
    .rarity(5)
    .roles(['DPS', 'SUPPORT'])
    .archetype('DoT')
    .labels(['Shock', 'DoT Enabler', 'Follow-up Attack'])
    .addTeammateSection('DoT Partners', ['black-swan'], ['jiaoqiu'], ['sampo', 'serval'])
    .addTeammateSection('Amplifiers', ['ruan-mei'], ['tribbie', 'cipher'], ['guinaifen'])
    .addTeammateSection('Sustain', ['huohuo'], ['hyacine'], ['gallagher'])
    .addTeamComposition(
      'DoT Team',
      'Main DPS',
      ['kafka', 'black-swan', 'ruan-mei', 'huohuo'],
      ['kafka', 'sampo', 'guinaifen', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('black-swan', 'Black Swan')
    .element('Wind')
    .path('Nihility')
    .rarity(5)
    .roles(['DPS', 'SUPPORT'])
    .archetype('DoT')
    .labels(['DoT', 'Arcana', 'DoT Amplifier', 'Blast', 'AoE'])
    .addTeammateSection('DoT Partners', ['kafka'], ['jiaoqiu'], ['sampo', 'serval'])
    .addTeammateSection('Amplifiers', ['ruan-mei'], ['tribbie', 'cipher'], ['guinaifen'])
    .addTeammateSection('Sustain', ['huohuo'], ['hyacine'], ['gallagher'])
    .addTeamComposition(
      'DoT Team',
      'Main DPS',
      ['black-swan', 'kafka', 'ruan-mei', 'huohuo'],
      ['black-swan', 'sampo', 'guinaifen', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('sampo', 'Sampo')
    .element('Wind')
    .path('Nihility')
    .rarity(4)
    .roles(['SUB_DPS'])
    .archetype('DoT')
    .labels(['DoT', 'Wind Shear', 'F2P', 'Bounce', 'AoE'])
    .addTeammateSection('DoT Partners', ['kafka'], ['jiaoqiu'], ['serval'])
    .addTeammateSection('Amplifiers', ['ruan-mei'], ['tribbie', 'cipher'], ['guinaifen'])
    .addTeammateSection('Sustain', ['huohuo'], ['hyacine'], ['gallagher'])
    .addTeamComposition(
      'DoT Team',
      'Main DPS',
      ['sampo', 'kafka', 'ruan-mei', 'huohuo'],
      ['sampo', 'kafka', 'guinaifen', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('luka', 'Luka')
    .element('Physical')
    .path('Nihility')
    .rarity(4)
    .roles(['DPS'])
    .archetype('DoT')
    .labels(['DoT', 'Bleed', 'F2P', 'Break', 'Single Target'])
    .addTeammateSection('DoT Partners', ['fugue'], ['kafka'], ['sushang'])
    .addTeammateSection(
      'Amplifiers',
      ['ruan-mei'],
      ['silver-wolf', 'cipher'],
      ['tingyun', 'guinaifen'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['hyacine'], ['gallagher'])
    .addTeamComposition(
      'DoT Team',
      'Main DPS',
      ['luka', 'fugue', 'ruan-mei', 'huohuo'],
      ['luka', 'tingyun', 'guinaifen', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('destruction-trailblazer', 'Destruction TB')
    .element('Physical')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Break-DPS')
    .labels(['Bleed', 'F2P', 'Break', 'Blast'])
    .addTeammateSection(
      'Amplifiers',
      ['fugue', 'ruan-mei'],
      ['sunday', 'cipher', 'silver-wolf'],
      ['pela', 'tingyun', 'bronya'],
    )
    .addTeammateSection('Sustain', ['lingsha'], ['hyacine', 'fu-xuan', 'huohuo'], ['gallagher'])
    .addTeamComposition(
      'Break Team',
      'Main DPS',
      ['destruction-trailblazer', 'fugue', 'ruan-mei', 'lingsha'],
      ['destruction-trailblazer', 'ruan-mei', 'tingyun', 'gallagher'],
    )
    .build(),

  // Break DPS Characters
  new CharacterBuilder('boothill', 'Boothill')
    .element('Physical')
    .path('Hunt')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Break-DPS')
    .labels(['Break DPS', 'Single Target', 'Implant Weakness'])
    .addTeammateSection(
      'Amplifiers',
      ['fugue', 'ruan-mei'],
      ['sunday'],
      ['bronya', 'harmony-trailblazer'],
    )
    .addTeammateSection('Sustain', ['lingsha'], ['hyacine', 'fu-xuan', 'huohuo'], ['gallagher'])
    .addTeamComposition(
      'Break Team',
      'Main DPS',
      ['boothill', 'fugue', 'ruan-mei', 'lingsha'],
      ['boothill', 'harmony-trailblazer', 'bronya', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('firefly', 'Firefly')
    .element('Fire')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Break-DPS')
    .labels([
      'Break DPS',
      'Super Break',
      'Implant Weakness',
      'Action Advance',
      'Blast',
      'Enhanced State',
    ])
    .addTeammateSection('Amplifiers', ['fugue', 'ruan-mei'], ['cipher'], ['harmony-trailblazer'])
    .addTeammateSection('Sustain', ['lingsha'], ['huohuo', 'aventurine'], ['gallagher'])
    .addTeamComposition(
      'Break Team',
      'Main DPS',
      ['firefly', 'fugue', 'ruan-mei', 'lingsha'],
      ['firefly', 'harmony-trailblazer', 'bronya', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('rappa', 'Rappa')
    .element('Imaginary')
    .path('Erudition')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Break-DPS')
    .labels(['Break DPS', 'AoE', 'Blast', 'Super Break'])
    .addTeammateSection('Amplifiers', ['fugue', 'ruan-mei'], ['tribbie'], ['harmony-trailblazer'])
    .addTeammateSection('Sustain', ['lingsha'], ['huohuo'], ['gallagher'])
    .addTeamComposition(
      'Break Team',
      'Main DPS',
      ['rappa', 'fugue', 'ruan-mei', 'lingsha'],
      ['rappa', 'harmony-trailblazer', 'bronya', 'gallagher'],
    )
    .build(),

  // Misc DPS Characters
  new CharacterBuilder('dan-heng', 'Dan Heng')
    .element('Wind')
    .path('Hunt')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Single Target', 'F2P', 'Applies Slow'])
    .addTeammateSection(
      'Amplifiers',
      ['sunday'],
      ['tribbie', 'sparkle', 'ruan-mei', 'silver-wolf', 'cipher'],
      ['bronya', 'remembrance-trailblazer', 'tingyun'],
    )
    .addTeammateSection('Sustain', ['huohuo', 'hyacine'], ['fu-xuan'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['dan-heng', 'sunday', 'silver-wolf', 'huohuo'],
      ['dan-heng', 'bronya', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('arlan', 'Arlan')
    .element('Lightning')
    .path('Destruction')
    .rarity(4)
    .roles(['DPS'])
    .archetype('HP-Scaling')
    .labels(['Self Damage', 'F2P', 'HP-Scaling'])
    .addTeammateSection(
      'Amplifiers',
      ['tribbie', 'sunday'],
      ['sparkle', 'ruan-mei', 'silver-wolf', 'cipher'],
      ['bronya', 'remembrance-trailblazer', 'tingyun'],
    )
    .addTeammateSection('Sustain', ['hyacine', 'aventurine'], ['gepard'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['arlan', 'sunday', 'cipher', 'aventurine'],
      ['arlan', 'bronya', 'remembrance-trailblazer', 'gallagher'],
    )
    .addTeamComposition(
      'Castorice Partner',
      'Sub DPS',
      ['castorice', 'arlan', 'tribbie', 'hyacine'],
      ['castorice', 'arlan', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('serval', 'Serval')
    .element('Lightning')
    .path('Erudition')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Ultimate-Based')
    .labels(['AoE', 'Shock', 'DoT', 'F2P'])
    .addTeammateSection(
      'Amplifiers',
      ['sunday', 'sparkle'],
      ['cipher', 'silver-wolf', 'ruan-mei'],
      ['bronya', 'tingyun', 'remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['huohuo', 'hyacine'], ['fu-xuan', 'luocha'], ['gallagher'])
    .addTeamComposition(
      'The Herta Partner',
      'Sub DPS',
      ['the-herta', 'serval', 'tribbie', 'huohuo'],
      ['the-herta', 'serval', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('hook', 'Hook')
    .element('Fire')
    .path('Destruction')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Single Target', 'Enhanced Skill', 'F2P'])
    .addTeammateSection(
      'Amplifiers',
      ['sunday', 'tribbie'],
      ['cipher', 'silver-wolf', 'ruan-mei'],
      ['bronya', 'tingyun', 'remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['fu-xuan', 'luocha'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['hook', 'sunday', 'tribbie', 'huohuo'],
      ['hook', 'tingyun', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('qingque', 'Qingque')
    .element('Quantum')
    .path('Erudition')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels([
      'AoE',
      'Enhanced Basic Attack',
      'F2P',
      'SP Unfriendly',
      'Follow-up Attack on Eidolon',
      'Energy Hungry',
    ])
    .addTeammateSection(
      'Amplifiers',
      ['sparkle'],
      ['silver-wolf', 'cipher', 'sunday'],
      ['tingyun', 'hanya'],
    )
    .addTeammateSection('Sustain', ['fu-xuan', 'huohuo'], ['aventurine'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['qingque', 'sparkle', 'tribbie', 'fu-xuan'],
      ['qingque', 'hanya', 'tingyun', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('sushang', 'Sushang')
    .element('Physical')
    .path('Hunt')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Break-DPS')
    .labels(['Single Target', 'Action Advance', 'F2P', 'Break DPS'])
    .addTeammateSection(
      'Amplifiers',
      ['fugue', 'ruan-mei'],
      ['sunday', 'silver-wolf'],
      ['bronya', 'harmony-trailblazer'],
    )
    .addTeammateSection('Sustain', ['lingsha'], ['huohuo'], ['gallagher'])
    .addTeamComposition(
      'Break Team',
      'Main DPS',
      ['sushang', 'fugue', 'ruan-mei', 'lingsha'],
      ['sushang', 'harmony-trailblazer', 'bronya', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('herta', 'Herta')
    .element('Ice')
    .path('Erudition')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Follow-up')
    .labels(['AoE', 'Follow-up Attack', 'F2P'])
    .addTeammateSection('Dual DPS', ['the-herta'], ['jade'], ['himeko'])
    .addTeammateSection(
      'Amplifiers',
      ['robin', 'tribbie'],
      ['cipher', 'silver-wolf', 'ruan-mei'],
      ['bronya', 'tingyun', 'remembrance-trailblazer'],
    )
    .addTeammateSection(
      'Sustain',
      ['huohuo', 'aventurine'],
      ['hyacine', 'lingsha', 'fu-xuan'],
      ['gallagher'],
    )
    .addTeamComposition(
      'The Herta Partner',
      'Sub DPS',
      ['the-herta', 'herta', 'tribbie', 'huohuo'],
      ['the-herta', 'herta', 'remembrance-trailblazer', 'gallagher'],
    )
    .addTeamComposition(
      'Himeko Partner',
      'Sub DPS',
      ['himeko', 'herta', 'robin', 'aventurine'],
      ['himeko', 'herta', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('xueyi', 'Xueyi')
    .element('Quantum')
    .path('Destruction')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Break-DPS')
    .labels([
      'Break DPS',
      'Follow-up Attack',
      'F2P',
      'Blast',
      'Single Target',
      'Ultimate Ignores Weakness',
      'Karma',
    ])
    .addTeammateSection(
      'Amplifiers',
      ['fugue', 'ruan-mei'],
      ['cipher', 'silver-wolf', 'sunday', 'sparkle', 'tribbie'],
      ['harmony-trailblazer'],
    )
    .addTeammateSection('Sustain', ['lingsha'], ['huohuo'], ['gallagher'])
    .addTeamComposition(
      'Break Team',
      'Main DPS',
      ['xueyi', 'fugue', 'ruan-mei', 'lingsha'],
      ['xueyi', 'harmony-trailblazer', 'ruan-mei', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('misha', 'Misha')
    .element('Ice')
    .path('Destruction')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Ultimate-Based')
    .labels(['AoE', 'Blast', 'Ice', 'Ultimate Based', 'F2P', 'Stackable Ultimate', 'Freeze'])
    .addTeammateSection(
      'Amplifiers',
      ['sunday', 'sparkle'],
      ['cipher', 'silver-wolf'],
      ['bronya', 'remembrance-trailblazer', 'pela'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['luocha'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['misha', 'sunday', 'sparkle', 'huohuo'],
      ['misha', 'bronya', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('feixiao', 'Feixiao')
    .element('Wind')
    .path('Hunt')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Follow-up')
    .labels(['Follow-up Attack', 'Stackable Ultimate', 'Ultimate Ignores Weakness'])
    .addTeammateSection(
      'DPS Partners',
      ['cipher'],
      ['topaz', 'ratio', 'yunli'],
      ['moze', 'hunt-march-7th'],
    )
    .addTeammateSection(
      'Amplifiers',
      ['robin'],
      ['sunday', 'silver-wolf'],
      ['bronya', 'remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['aventurine'], ['lingsha', 'hyacine'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['feixiao', 'cipher', 'robin', 'aventurine'],
      ['feixiao', 'moze', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('hunt-march-7th', 'Hunt March 7th')
    .element('Imaginary')
    .path('Hunt')
    .rarity(4)
    .roles(['SUB_DPS'])
    .archetype('Follow-up')
    .labels(['Follow-up Attack or Break DPS', 'Shifu', 'F2P'])
    .addTeammateSection('DPS Partners', ['feixiao'], ['topaz', 'yunli'], ['clara'])
    .addTeammateSection(
      'Amplifiers',
      ['robin', 'fugue'],
      ['sunday', 'silver-wolf', 'ruan-mei', 'tribbie'],
      ['harmony-trailblazer', 'remembrance-trailblazer'],
    )
    .addTeammateSection(
      'Sustain',
      ['aventurine', 'huohuo'],
      ['lingsha', 'hyacine', 'luocha'],
      ['gallagher'],
    )
    .addTeamComposition(
      'Follow-up Team',
      'Sub DPS',
      ['feixiao', 'hunt-march-7th', 'robin', 'aventurine'],
      ['feixiao', 'hunt-march-7th', 'remembrance-trailblazer', 'gallagher'],
    )
    .addTeamComposition(
      'Break Team',
      'Sub DPS',
      ['hunt-march-7th', 'fugue', 'ruan-mei', 'huohuo'],
      ['hunt-march-7th', 'ruan-mei', 'harmony-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('moze', 'Moze')
    .element('Lightning')
    .path('Hunt')
    .rarity(4)
    .roles(['SUB_DPS'])
    .archetype('Follow-up')
    .labels(['Follow-up Attack', 'Prey', 'Departed', 'Action Advance', 'F2P'])
    .addTeammateSection('DPS Partners', ['feixiao'], ['ratio', 'topaz'], [])
    .addTeammateSection(
      'Amplifiers',
      ['robin'],
      ['tribbie', 'silver-wolf', 'cipher'],
      ['remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['aventurine'], ['luocha', 'hyacine'], ['gallagher'])
    .addTeamComposition(
      'Follow-up Team',
      'Main DPS',
      ['feixiao', 'moze', 'robin', 'aventurine'],
      ['feixiao', 'moze', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('the-herta', 'The Herta')
    .element('Ice')
    .path('Erudition')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Ultimate-Based')
    .labels(['AoE', 'Requires Erudition Partner', 'Action Advance', 'Enhanced Skill'])
    .addTeammateSection('DPS Partners', ['anaxa'], ['jade', 'argenti'], ['herta', 'serval'])
    .addTeammateSection(
      'Amplifiers',
      ['tribbie'],
      ['robin', 'ruan-mei', 'sunday'],
      ['remembrance-trailblazer'],
    )
    .addTeammateSection(
      'Sustain',
      ['hyacine', 'huohuo'],
      ['lingsha', 'aventurine', 'fu-xuan'],
      ['gallagher'],
    )
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['the-herta', 'anaxa', 'tribbie', 'huohuo'],
      ['the-herta', 'herta', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('aglaea', 'Aglaea')
    .element('Lightning')
    .path('Remembrance')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Summon', 'Hypercarry')
    .labels([
      'Action Advance',
      'Enhanced State',
      'Enhanced Basic Attack',
      'Memosprite',
      'Energy Hungry',
      'SP Friendly',
    ])
    .addTeammateSection(
      'Amplifiers',
      ['sunday', 'robin'],
      ['tribbie', 'silver-wolf'],
      ['bronya', 'remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['fu-xuan'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['aglaea', 'sunday', 'robin', 'huohuo'],
      ['aglaea', 'bronya', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('castorice', 'Castorice')
    .element('Quantum')
    .path('Remembrance')
    .rarity(5)
    .roles(['DPS'])
    .archetype('HP-Scaling', 'Summon', 'Hypercarry')
    .labels(['AoE', 'Self Damage', 'Memosprite', 'Action Advance', 'Global Passive'])
    .addTeammateSection(
      'Amplifiers',
      ['tribbie', 'remembrance-trailblazer'],
      ['sunday', 'ruan-mei', 'cipher', 'silver-wolf'],
      [],
    )
    .addTeammateSection('Sustain', ['hyacine'], ['luocha'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['castorice', 'remembrance-trailblazer', 'tribbie', 'hyacine'],
      ['castorice', 'ruan-mei', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('mydei', 'Mydei')
    .element('Imaginary')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('HP-Scaling')
    .labels(['Enhanced Skill', 'Self Damage', 'Taunt', 'Blast', 'Vendetta'])
    .addTeammateSection(
      'Amplifiers',
      ['sunday', 'tribbie'],
      ['sparkle', 'ruan-mei', 'silver-wolf', 'cipher'],
      ['remembrance-trailblazer', 'tingyun'],
    )
    .addTeammateSection('Sustain', ['hyacine', 'huohuo'], ['luocha'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['mydei', 'sunday', 'tribbie', 'hyacine'],
      ['mydei', 'ruan-mei', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('phainon', 'Phainon')
    .element('Physical')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels([
      'Enhanced State',
      'Self Sufficient',
      'Action Advance',
      'Blast',
      'Aoe',
      'Counter',
      'Self Cleanse',
      'Deploys territory',
      'Implant Weakness',
    ])
    .addTeammateSection(
      'Amplifiers',
      ['sunday', 'bronya'],
      ['ruan-mei', 'tribbie', 'cipher'],
      ['remembrance-trailblazer', 'tingyun'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['aventurine', 'luocha'], ['gallagher'])
    .addTeamComposition(
      'Sustainless',
      'Main DPS',
      ['phainon', 'sunday', 'bronya', 'tribbie'],
      ['phainon', 'bronya', 'remembrance-trailblazer', 'tingyun'],
    )
    .addTeamComposition(
      'With Sustain',
      'Main DPS',
      ['phainon', 'sunday', 'bronya', 'huohuo'],
      ['phainon', 'bronya', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('saber', 'Saber')
    .element('Wind')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Energy Hungry', 'Action Advance', 'Blast', 'Aoe'])
    .addTeammateSection(
      'Amplifiers',
      ['sunday'],
      ['tribbie', 'robin', 'ruan-mei', 'silver-wolf'],
      ['bronya', 'tingyun'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['hyacine'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['saber', 'sunday', 'robin', 'huohuo'],
      ['saber', 'bronya', 'tingyun', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('archer', 'Archer')
    .element('Quantum')
    .path('Hunt')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['SP Unfriendly', 'Single Target', 'Extra Skill'])
    .addTeammateSection(
      'Amplifiers',
      ['sparkle'],
      ['ruan-mei', 'cipher', 'silver-wolf', 'tribbie'],
      ['hanya', 'tingyun'],
    )
    .addTeammateSection('Sustain', ['gallagher'], ['luocha', 'aventurine'], [])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['archer', 'sparkle', 'silver-wolf', 'gallagher'],
      ['archer', 'hanya', 'tingyun', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('anaxa', 'Anaxa')
    .element('Wind')
    .path('Erudition')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Weakness Implant', 'Bounce', 'Extra Skill', 'Hypercarry or Dual DPS'])
    .addTeammateSection('Dual DPS Partners', ['the-herta'], ['jade'], ['himeko'])
    .addTeammateSection(
      'Amplifiers',
      ['tribbie'],
      ['sunday', 'ruan-mei', 'cipher', 'silver-wolf', 'robin'],
      ['bronya', 'tingyun', 'remembrance-trailblazer', 'pela'],
    )
    .addTeammateSection('Sustain', ['hyacine', 'huohuo'], ['aventurine'], ['gallagher'])
    .addTeamComposition(
      'Dual DPS Team',
      'Main DPS',
      ['the-herta', 'anaxa', 'tribbie', 'huohuo'],
      ['himeko', 'anaxa', 'remembrance-trailblazer', 'gallagher'],
    )

    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['anaxa', 'robin', 'sunday', 'huohuo'],
      ['anaxa', 'remembrance-trailblazer', 'tingyun', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('welt', 'Welt')
    .element('Imaginary')
    .path('Nihility')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Bounce', 'Slow', 'Imprison', 'AoE'])
    .addTeammateSection(
      'Amplifiers',
      ['sunday'],
      ['tribbie', 'ruan-mei', 'cipher', 'silver-wolf'],
      ['bronya', 'tingyun', 'remembrance-trailblazer', 'pela'],
    )
    .addTeammateSection('Sustain', ['huohuo'], ['hyacine'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['welt', 'sunday', 'silver-wolf', 'huohuo'],
      ['welt', 'remembrance-trailblazer', 'tingyun', 'gallagher'],
    )
    .build(),
]
