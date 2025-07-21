import { CharacterBuilder } from '@/types/Character'

export const sustainCharacters = [
  new CharacterBuilder('gepard', 'Gepard')
    .element('Ice')
    .path('Preservation')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Shielder')
    .labels(['AoE Shield', 'Freeze', 'Self Revive', 'Self Taunt', 'F2P'])
    .addTeammateSection(
      'DPS',
      ['acheron', 'yanqing'],
      [
        'Any DPS as long as they can benefit from Shields, Evade Aggro and constant Debuffs Application with Trend of the Universal Market Lightcone',
      ],
      [],
    )
    .addTeamComposition('Acheron Team', 'Sustain', ['acheron', 'jiaoqiu', 'cipher', 'gepard'])
    .build(),

  new CharacterBuilder('fu-xuan', 'Fu Xuan')
    .element('Quantum')
    .path('Preservation')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Damage Distribution')
    .labels([
      'Heal Allies on Ultimate',
      'Damage Distribution',
      'HP Scaling',
      'Crit Rate Amplifier',
      'Self Heal',
      'Crowd Control Immunity on Skill',
      'Allies Damage Reduction',
    ])
    .addTeammateSection(
      'DPS',
      ['acheron', 'archer', 'yunli'],
      [
        'Any DPS as long as they can benefit from Crit Rate Buffs,DMG Reduction and constant Debuffs Application with Trend of the Universal Market Lightcone',
      ],
      [],
    )
    .addTeamComposition('Acheron Team', 'Sustain', ['acheron', 'jiaoqiu', 'cipher', 'fu-xuan'])
    .addTeamComposition('Archer Team', 'Sustain', ['archer', 'sparkle', 'silver-wolf', 'fu-xuan'])
    .addTeamComposition('Yunli Team', 'Sustain', ['yunli', 'sunday', 'robin', 'fu-xuan'])
    .build(),

  new CharacterBuilder('march-7th', 'March 7th')
    .element('Ice')
    .path('Preservation')
    .rarity(4)
    .roles(['SUSTAIN'])
    .archetype('Shielder')
    .labels(['Single Target Shield', 'Freeze', 'Counter', 'F2P', 'Taunt on Skill'])
    .addTeammateSection(
      'DPS',
      ['acheron'],
      [
        'Any DPS as long as they can benefit from Shields, Follow-ups and constant Debuffs Application with Trend of the Universal Market Lightcone',
      ],
      [],
    )
    .addTeamComposition('Acheron Team', 'Sustain', ['acheron', 'jiaoqiu', 'cipher', 'march-7th'])
    .addTeamComposition('Feixiao Team', 'Sustain', ['feixiao', 'cipher', 'robin', 'march-7th'])
    .build(),

  new CharacterBuilder('fire-trailblazer', 'Fire TB')
    .element('Fire')
    .path('Preservation')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Shielder')
    .labels(['Shielder', 'Fire', 'Taunt', 'F2P'])
    .build(),

  new CharacterBuilder('natasha', 'Natasha')
    .element('Physical')
    .path('Abundance')
    .rarity(4)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels(['Healer', 'Physical', 'Cleanse', 'F2P'])
    .build(),

  new CharacterBuilder('bailu', 'Bailu')
    .element('Lightning')
    .path('Abundance')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels(['Healer', 'Lightning', 'Revive', 'Damage Reduction'])
    .build(),

  new CharacterBuilder('luocha', 'Luocha')
    .element('Imaginary')
    .path('Abundance')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels(['Healer', 'Imaginary', 'Auto Heal', 'Cleanse'])
    .build(),

  new CharacterBuilder('huohuo', 'Huohuo')
    .element('Wind')
    .path('Abundance')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels(['Healer', 'Energy Support', 'Wind', 'Cleanse'])
    .build(),

  new CharacterBuilder('lynx', 'Lynx')
    .element('Quantum')
    .path('Abundance')
    .rarity(4)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels(['Healer', 'Quantum', 'Cleanse', 'F2P'])
    .build(),

  new CharacterBuilder('gallagher', 'Gallagher')
    .element('Fire')
    .path('Abundance')
    .rarity(4)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels(['Healer', 'Break Support', 'Debuff', 'Generalist'])
    .build(),

  new CharacterBuilder('lingsha', 'Lingsha')
    .element('Fire')
    .path('Abundance')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels(['Healer', 'Break Support', 'Follow-up Attack'])
    .build(),

  new CharacterBuilder('aventurine', 'Aventurine')
    .element('Imaginary')
    .path('Preservation')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Shielder')
    .labels(['Shielder', 'Follow-up Attack', 'Crit Support'])
    .build(),

  new CharacterBuilder('hyacine', 'Hyacine')
    .element('Wind')
    .path('Remembrance')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels(['Healer', 'Wind', 'Energy Support'])
    .build(),
]
