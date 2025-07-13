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
      ['yanqing', 'bronya', 'tingyun', 'march-7th'],
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
      'Quantum',
      'Enhanced Basic Attack',
      'F2P',
      'SP Unfriendly',
      'Follow-up Attack on Eidolon',
    ])
    .addTeammateSection('Amplifiers', ['sparkle'], ['silver-wolf', 'cipher', 'sunday'], ['tingyun'])
    .addTeammateSection('Sustain', ['fu-xuan', 'gepard'], ['bailu'], ['natasha'])
    .build(),

  new CharacterBuilder('sushang', 'Sushang')
    .element('Physical')
    .path('Hunt')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Single Target', 'Physical', 'Action Advance', 'F2P'])
    .addTeammateSection('Amplifiers', ['tingyun', 'bronya'], ['asta'], ['tingyun'])
    .addTeammateSection('Sustain', ['gepard', 'fu-xuan'], ['bailu'], ['natasha'])
    .build(),

  new CharacterBuilder('herta', 'Herta')
    .element('Ice')
    .path('Erudition')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Follow-up')
    .labels(['AoE', 'Ice', 'Follow-up Attack', 'F2P'])
    .addTeammateSection('Amplifiers', ['tingyun', 'bronya'], ['asta'], ['tingyun'])
    .addTeammateSection('Sustain', ['gepard', 'fu-xuan'], ['bailu'], ['natasha'])
    .build(),

  new CharacterBuilder('xueyi', 'Xueyi')
    .element('Quantum')
    .path('Destruction')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Break-DPS')
    .labels(['Break DPS', 'Quantum', 'Toughness Damage', 'F2P'])
    .addTeammateSection(
      'Amplifiers',
      ['ruan-mei', 'harmony-trailblazer'],
      ['bronya'],
      ['harmony-trailblazer'],
    )
    .addTeammateSection('Sustain', ['fu-xuan', 'huohuo'], ['bailu'], ['lynx'])
    .build(),

  new CharacterBuilder('misha', 'Misha')
    .element('Ice')
    .path('Destruction')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Ultimate-Based')
    .labels(['AoE', 'Ice', 'Ultimate Based', 'F2P'])
    .addTeammateSection('Amplifiers', ['tingyun', 'bronya'], ['huohuo'], ['tingyun'])
    .addTeammateSection('Sustain', ['gepard', 'huohuo'], ['bailu'], ['lynx'])
    .build(),

  new CharacterBuilder('hunt-march-7th', 'Hunt March 7th')
    .element('Imaginary')
    .path('Hunt')
    .rarity(4)
    .roles(['DPS', 'SUB_DPS'])
    .archetype('Follow-up')
    .labels(['Follow-up Attack', 'Imaginary', 'F2P'])
    .build(),

  new CharacterBuilder('moze', 'Moze')
    .element('Lightning')
    .path('Hunt')
    .rarity(4)
    .roles(['DPS', 'SUB_DPS'])
    .archetype('Follow-up')
    .labels(['Follow-up Attack', 'Lightning', 'F2P'])
    .build(),

  // New Characters
  new CharacterBuilder('the-herta', 'The Herta')
    .element('Ice')
    .path('Erudition')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Ultimate-Based')
    .labels(['AoE', 'Ice', 'Ultimate Based'])
    .addTeammateSection('Amplifiers', ['sunday', 'bronya'], ['sparkle'], ['tingyun'])
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['fu-xuan'], ['gallagher'])
    .build(),

  new CharacterBuilder('aglaea', 'Aglaea')
    .element('Lightning')
    .path('Remembrance')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Summon')
    .labels(['Action Advance', 'Enhanced Basic Attack'])
    .addTeammateSection(
      'Amplifiers',
      ['sunday', 'remembrance-trailblazer'],
      ['bronya'],
      ['remembrance-trailblazer'],
    )
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['fu-xuan'], ['gallagher'])
    .build(),

  new CharacterBuilder('castorice', 'Castorice')
    .element('Quantum')
    .path('Remembrance')
    .rarity(5)
    .roles(['DPS'])
    .archetype('HP-Scaling', 'Summon')
    .labels(['AoE'])
    .addTeammateSection('Amplifiers', ['sparkle', 'bronya'], ['sunday'], ['tingyun'])
    .addTeammateSection('Sustain', ['aventurine', 'fu-xuan'], ['huohuo'], ['gallagher'])
    .build(),

  new CharacterBuilder('mydei', 'Mydei')
    .element('Imaginary')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('HP-Scaling')
    .labels(['HP Scaling'])
    .addTeammateSection('Amplifiers', ['sunday', 'bronya'], ['sparkle'], ['tingyun'])
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['fu-xuan'], ['gallagher'])
    .build(),

  new CharacterBuilder('phainon', 'Phainon')
    .element('Physical')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Enhanced State', 'Self Sufficient'])
    .addTeammateSection('Amplifiers', ['sunday', 'ruan-mei'], ['bronya'], ['harmony-trailblazer'])
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['fu-xuan'], ['gallagher'])
    .build(),
]
