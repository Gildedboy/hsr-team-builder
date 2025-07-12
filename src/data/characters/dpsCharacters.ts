import { CharacterBuilder } from '@/types/Character'

export const dpsCharacters = [
  // DPS Characters
  new CharacterBuilder('seele', 'Seele')
    .element('Quantum')
    .path('Hunt')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Single Target', 'Extra Turn', 'Buffed State', 'SP Unfriendly'])
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
    .archetype('Follow-up', 'Summon')
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
    .addTeammateSection('Dual DPS', ['yunli'], ['cipher', 'topaz'], [])
    .addTeammateSection(
      'Amplifiers',
      ['robin'],
      ['tribbie', 'silver-wolf', 'sunday', 'sparkle'],
      ['remembrance-trailblazer', 'pela'],
    )
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['luocha'], ['gallagher', 'lynx'])
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
    .archetype('Hypercarry')
    .labels(['Single Target', 'Follow-up Attack', 'F2P'])
    .addTeammateSection('Amplifiers', ['bronya', 'sparkle'], ['tingyun'], ['tingyun'])
    .addTeammateSection('Sustain', ['gepard', 'luocha'], ['bailu'], ['natasha'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['yanqing', 'bronya', 'sparkle', 'gepard'],
      ['yanqing', 'tingyun', 'pela', 'natasha'],
    )
    .build(),

  new CharacterBuilder('blade', 'Blade')
    .element('Wind')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS', 'SUB_DPS'])
    .archetype('HP-Scaling')
    .labels(['Follow-up Attack', 'HP Scaling', 'Self Damage'])
    .addTeammateSection('Sub-DPS Partners', ['castorice'], ['jingliu'], ['remembrance-trailblazer'])
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
      ['blade', 'sunday', 'jingliu', 'hyacine'],
      ['blade', 'bronya', 'pela', 'gallagher'],
    )
    .addTeamComposition(
      'Sub-DPS Team',
      'Sub-DPS',
      ['castorice', 'blade', 'tribbie', 'hyacine'],
      ['jingliu', 'blade', 'remembrance-trailblazer', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('dan-heng-il', 'Dan Heng IL')
    .element('Imaginary')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Single Target', 'Imaginary', 'Enhanced Basic'])
    .addTeammateSection('Amplifiers', ['sparkle', 'bronya'], ['tingyun'], ['tingyun'])
    .addTeammateSection('Sustain', ['fu-xuan', 'luocha'], ['bailu'], ['natasha'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['dan-heng-il', 'sparkle', 'bronya', 'fu-xuan'],
      ['dan-heng-il', 'tingyun', 'pela', 'natasha'],
    )
    .build(),

  new CharacterBuilder('jingliu', 'Jingliu')
    .element('Ice')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('HP-Scaling')
    .labels(['AoE', 'HP Consumption', 'Enhanced State'])
    .addTeammateSection('Amplifiers', ['bronya', 'sparkle'], ['tingyun'], ['tingyun'])
    .addTeammateSection('Sustain', ['luocha', 'bailu'], ['fu-xuan'], ['natasha'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['jingliu', 'bronya', 'sparkle', 'luocha'],
      ['jingliu', 'tingyun', 'pela', 'natasha'],
    )
    .build(),

  new CharacterBuilder('argenti', 'Argenti')
    .element('Physical')
    .path('Erudition')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Ultimate-Based')
    .labels(['AoE', 'Ultimate Based', 'Energy Hungry'])
    .addTeammateSection('Amplifiers', ['tingyun', 'huohuo'], ['bronya'], ['tingyun'])
    .addTeammateSection('Sustain', ['huohuo', 'luocha'], ['bailu'], ['natasha'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['argenti', 'tingyun', 'huohuo', 'luocha'],
      ['argenti', 'tingyun', 'pela', 'natasha'],
    )
    .build(),

  new CharacterBuilder('acheron', 'Acheron')
    .element('Lightning')
    .path('Nihility')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Ultimate-Based')
    .labels(['AoE', 'Debuff Stacking', 'Ultimate Based'])
    .addTeammateSection('Debuffers', ['jiaoqiu'], ['pela', 'silver-wolf'], ['pela'])
    .addTeammateSection('Sustain', ['aventurine', 'fu-xuan'], ['huohuo'], ['gallagher'])
    .addTeamComposition(
      'Debuff Team',
      'Main DPS',
      ['acheron', 'jiaoqiu', 'pela', 'aventurine'],
      ['acheron', 'pela', 'guinaifen', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('yunli', 'Yunli')
    .element('Physical')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Counter')
    .labels(['Counter Attack', 'Physical', 'Ultimate Based'])
    .addTeammateSection('Amplifiers', ['tingyun', 'bronya'], ['sparkle'], ['tingyun'])
    .addTeammateSection('Sustain', ['huohuo', 'aventurine'], ['fu-xuan'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['yunli', 'tingyun', 'bronya', 'huohuo'],
      ['yunli', 'tingyun', 'pela', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('topaz', 'Topaz')
    .element('Fire')
    .path('Hunt')
    .rarity(5)
    .roles(['DPS', 'SUB_DPS'])
    .archetype('Follow-up')
    .labels(['Follow-up Attack', 'Debt', 'Fire'])
    .addTeammateSection('Amplifiers', ['robin', 'aventurine'], ['bronya'], ['tingyun'])
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['fu-xuan'], ['gallagher'])
    .addTeamComposition(
      'FUA Team',
      'Main DPS',
      ['topaz', 'robin', 'aventurine', 'huohuo'],
      ['topaz', 'tingyun', 'pela', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('ratio', 'Dr. Ratio')
    .element('Imaginary')
    .path('Hunt')
    .rarity(5)
    .roles(['DPS', 'SUB_DPS'])
    .archetype('Follow-up')
    .labels(['Follow-up Attack', 'Debuff Synergy'])
    .addTeammateSection('Sub-DPS Partners', ['topaz'], [], ['moze'])
    .addTeammateSection(
      'Debuffers',
      ['robin', 'cipher'],
      ['jiaoqiu', 'silver-wolf', 'tribbie', 'sunday'],
      ['pela', 'guinaifen'],
    )
    .addTeammateSection('Sustain', ['aventurine'], ['huohuo', 'lingsha'], ['gallagher'])
    .addTeamComposition(
      'FUA Team',
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
    .labels(['Follow-up Attack', 'Debt', 'AoE'])
    .addTeammateSection('Amplifiers', ['sparkle', 'bronya'], ['tingyun'], ['tingyun'])
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['fu-xuan'], ['gallagher'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['jade', 'sparkle', 'bronya', 'aventurine'],
      ['jade', 'tingyun', 'pela', 'gallagher'],
    )
    .build(),

  new CharacterBuilder('kafka', 'Kafka')
    .element('Lightning')
    .path('Nihility')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Ultimate-Based')
    .labels(['DoT', 'Lightning', 'Shock'])
    .addTeammateSection('Sub-DPS Partners', ['black-swan'], ['sampo'], ['sampo'])
    .addTeammateSection('Amplifiers', ['ruan-mei', 'jiaoqiu'], ['tingyun'], ['tingyun'])
    .addTeammateSection('Sustain', ['huohuo', 'fu-xuan'], ['bailu'], ['lynx'])
    .addTeamComposition(
      'DoT Team',
      'Main DPS',
      ['kafka', 'black-swan', 'ruan-mei', 'huohuo'],
      ['kafka', 'sampo', 'tingyun', 'lynx'],
    )
    .build(),

  new CharacterBuilder('black-swan', 'Black Swan')
    .element('Wind')
    .path('Nihility')
    .rarity(5)
    .roles(['DPS', 'SUB_DPS'])
    .archetype('Ultimate-Based')
    .labels(['DoT', 'Wind', 'Arcana'])
    .addTeammateSection('Amplifiers', ['ruan-mei', 'jiaoqiu'], ['tingyun'], ['tingyun'])
    .addTeammateSection('Sustain', ['huohuo', 'fu-xuan'], ['bailu'], ['lynx'])
    .addTeamComposition(
      'DoT Team',
      'Main DPS',
      ['black-swan', 'kafka', 'ruan-mei', 'huohuo'],
      ['black-swan', 'sampo', 'tingyun', 'lynx'],
    )
    .build(),

  new CharacterBuilder('sampo', 'Sampo')
    .element('Wind')
    .path('Nihility')
    .rarity(4)
    .roles(['DPS', 'SUB_DPS'])
    .archetype('Ultimate-Based')
    .labels(['DoT', 'Wind', 'F2P'])
    .build(),

  new CharacterBuilder('guinaifen', 'Guinaifen')
    .element('Fire')
    .path('Nihility')
    .rarity(4)
    .roles(['DPS', 'SUB_DPS'])
    .archetype('Ultimate-Based')
    .labels(['DoT', 'Fire', 'F2P'])
    .build(),

  new CharacterBuilder('luka', 'Luka')
    .element('Physical')
    .path('Nihility')
    .rarity(4)
    .roles(['DPS', 'SUB_DPS'])
    .archetype('Ultimate-Based')
    .labels(['DoT', 'Physical', 'F2P'])
    .build(),

  new CharacterBuilder('destruction-trailblazer', 'Destruction TB')
    .element('Physical')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Physical', 'Taunt', 'F2P'])
    .addTeammateSection('Amplifiers', ['tingyun', 'bronya'], ['asta'], ['tingyun'])
    .addTeammateSection('Sustain', ['gepard', 'fu-xuan'], ['bailu'], ['natasha'])
    .addTeamComposition(
      'Main DPS Team',
      'Main DPS',
      ['destruction-trailblazer', 'tingyun', 'bronya', 'gepard'],
      ['destruction-trailblazer', 'tingyun', 'asta', 'natasha'],
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
      'Buffed State',
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
    .labels(['Single Target', 'Wind', 'F2P'])
    .addTeammateSection('Amplifiers', ['tingyun', 'bronya'], ['asta'], ['tingyun'])
    .addTeammateSection('Sustain', ['gepard', 'fu-xuan'], ['bailu'], ['natasha'])
    .build(),

  new CharacterBuilder('arlan', 'Arlan')
    .element('Lightning')
    .path('Destruction')
    .rarity(4)
    .roles(['DPS'])
    .archetype('HP-Scaling')
    .labels(['HP Scaling', 'Lightning', 'F2P'])
    .addTeammateSection('Amplifiers', ['tingyun', 'bronya'], ['asta'], ['tingyun'])
    .addTeammateSection('Sustain', ['gepard', 'fu-xuan'], ['bailu'], ['natasha'])
    .build(),

  new CharacterBuilder('serval', 'Serval')
    .element('Lightning')
    .path('Erudition')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Ultimate-Based')
    .labels(['AoE', 'Lightning', 'DoT', 'F2P'])
    .addTeammateSection('Amplifiers', ['tingyun', 'asta'], ['bronya'], ['tingyun'])
    .addTeammateSection('Sustain', ['gepard', 'fu-xuan'], ['bailu'], ['natasha'])
    .build(),

  new CharacterBuilder('hook', 'Hook')
    .element('Fire')
    .path('Destruction')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Single Target', 'Fire', 'Enhanced Basic', 'F2P'])
    .addTeammateSection('Amplifiers', ['tingyun', 'asta'], ['bronya'], ['tingyun'])
    .addTeammateSection('Sustain', ['gepard', 'fu-xuan'], ['bailu'], ['natasha'])
    .build(),

  new CharacterBuilder('qingque', 'Qingque')
    .element('Quantum')
    .path('Erudition')
    .rarity(4)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['AoE', 'Quantum', 'Enhanced Basic', 'F2P'])
    .addTeammateSection('Amplifiers', ['sparkle', 'bronya'], ['tingyun'], ['tingyun'])
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
    .archetype('Hypercarry')
    .labels(['Summon', 'Lightning', 'Remembrance'])
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
    .path('Erudition')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['AoE', 'Quantum'])
    .addTeammateSection('Amplifiers', ['sparkle', 'bronya'], ['sunday'], ['tingyun'])
    .addTeammateSection('Sustain', ['aventurine', 'fu-xuan'], ['huohuo'], ['gallagher'])
    .build(),

  new CharacterBuilder('mydei', 'Mydei')
    .element('Imaginary')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('HP-Scaling')
    .labels(['Imaginary', 'HP Scaling'])
    .addTeammateSection('Amplifiers', ['sunday', 'bronya'], ['sparkle'], ['tingyun'])
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['fu-xuan'], ['gallagher'])
    .build(),

  new CharacterBuilder('phainon', 'Phainon')
    .element('Fire')
    .path('Destruction')
    .rarity(5)
    .roles(['DPS'])
    .archetype('Hypercarry')
    .labels(['Fire', 'Self Sufficient'])
    .addTeammateSection('Amplifiers', ['sunday', 'ruan-mei'], ['bronya'], ['harmony-trailblazer'])
    .addTeammateSection('Sustain', ['aventurine', 'huohuo'], ['fu-xuan'], ['gallagher'])
    .build(),
]
