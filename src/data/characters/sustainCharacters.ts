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
      'Allies DMG Reduction',
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
    .labels([
      'AoE Shield',
      'Allies DMG Reduction',
      'Self Taunt',
      'Self Heal',
      'Self Shield',
      'Enhanced Basic Attack',
      'F2P',
    ])
    .addTeammateSection(
      'DPS',
      ['acheron'],
      [
        'Any DPS as long as they can benefit from Shields and constant Debuffs Application with Trend of the Universal Market Lightcone',
      ],
      [],
    )
    .addTeamComposition('Acheron Team', 'Sustain', ['acheron', 'jiaoqiu', 'cipher', 'march-7th'])
    .build(),

  new CharacterBuilder('natasha', 'Natasha')
    .element('Physical')
    .path('Abundance')
    .rarity(4)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels(['Heal on Skill and Ultimate', 'Cleanse on Skill', 'F2P'])
    .addTeammateSection(
      'DPS',
      [],
      ['Any DPS as long as they can benefit from Healing and Cleanse'],
      [],
    )
    .addTeamComposition('Aglaea Team', 'Sustain', ['aglaea', 'sunday', 'robin', 'natasha'])
    .build(),

  new CharacterBuilder('bailu', 'Bailu')
    .element('Lightning')
    .path('Abundance')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels(['Bounce Heal', 'Heal on Ultimate', 'Revive', 'Invigoration', 'Allies DMG Reduction'])
    .addTeammateSection('DPS', [], ['Any DPS as long as they can benefit from Healing'], [])
    .addTeamComposition('Phainon Team', 'Sustain', ['phainon', 'sunday', 'bronya', 'bailu'])
    .build(),

  new CharacterBuilder('luocha', 'Luocha')
    .element('Imaginary')
    .path('Abundance')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels([
      'Auto Heal',
      'Cleanse on Direct Heal',
      'Remove Enemy Buffs on Ultimate',
      'Deploys Heal Field',
    ])
    .addTeammateSection(
      'DPS',
      ['castorice'],
      ['Any DPS as long as they can benefit from Healing and Auto Heals when HP is low'],
      [],
    )
    .addTeamComposition('Castorice Team', 'Sustain', [
      'castorice',
      'remembrance-trailblazer',
      'tribbie',
      'luocha',
    ])
    .build(),

  new CharacterBuilder('huohuo', 'Huohuo')
    .element('Wind')
    .path('Abundance')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels([
      'Energy Recovery',
      'Cleanse on Heal',
      'Blast Heal',
      'Attack Amplifier',
      'Cleanse on Skill',
    ])
    .addTeammateSection(
      'DPS',
      ['aglaea'],
      ['Any DPS as long as they can benefit from Energy Recovery and ATK Buffs'],
    )
    .addTeamComposition('Aglaea Team', 'Sustain', [
      'aglaea',
      'sunday',
      'remembrance-trailblazer',
      'huohuo',
    ])
    .build(),

  new CharacterBuilder('lynx', 'Lynx')
    .element('Quantum')
    .path('Abundance')
    .rarity(4)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels([
      'Taunt on Skill (Destruction & Preservation)',
      'Healing over time',
      'Cleanse on Ultimate',
      'F2P',
    ])
    .addTeammateSection(
      'DPS',
      ['castorice', 'blade'],
      ['Any DPS as long as they can benefit from Self Taunt and HP Scaling DPS'],
    )
    .addTeamComposition('Castorice Team', 'Sustain', [
      'castorice',
      'tribbie',
      'remembrance-trailblazer',
      'lynx',
    ])
    .addTeamComposition('Blade Team', 'Sustain', ['blade', 'sunday', 'tribbie', 'lynx'])
    .build(),

  new CharacterBuilder('gallagher', 'Gallagher')
    .element('Fire')
    .path('Abundance')
    .rarity(4)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels([
      'Self Action Advance',
      'Break DMG Amplifier',
      'Reduce Enemies Attack',
      'Besotted',
      'Enchanced Basic Attack',
      'Cleanse on Skill',
      'F2P',
      'Best 4 Star',
    ])
    .addTeammateSection(
      'DPS',
      ['acheron', 'Any Break DPS'],
      ['Any DPS as long as they can benefit from Break and constant Debuffs application'],
    )
    .addTeamComposition('Acheron Team', 'Sustain', ['acheron', 'cipher', 'jiaoqiu', 'gallagher'])
    .addTeamComposition('Firefly Team', 'Sustain', ['firefly', 'fugue', 'ruan-mei', 'gallagher'])
    .build(),

  new CharacterBuilder('lingsha', 'Lingsha')
    .element('Fire')
    .path('Abundance')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels([
      'Action Advance Pet',
      'Break DMG Amplifier',
      'Pet',
      'Follow-up Attack',
      ' Heal on Follow-up Attack',
    ])
    .addTeammateSection(
      'DPS',
      ['the-herta', 'feixiao', 'Any Break DPS'],
      ['Any DPS as long as they can benefit from Break and constant Follow-up Attacks'],
    )
    .addTeamComposition('The Herta Team', 'Sustain', ['the-herta', 'anaxa', 'tribbie', 'lingsha'])
    .addTeamComposition('Feixiao Team', 'Sustain', ['feixiao', 'cipher', 'robin', 'lingsha'])
    .addTeamComposition('Firefly Team', 'Sustain', ['firefly', 'fugue', 'ruan-mei', 'lingsha'])
    .build(),

  new CharacterBuilder('aventurine', 'Aventurine')
    .element('Imaginary')
    .path('Preservation')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Shielder')
    .labels([
      'Shield on Skill',
      'Shield on Follow-up Attack',
      'Effect RES Amplifier',
      'Unnerved - Enemies take Increased Crit DMG on Ultimate',
      'Stackable Shield',
      'Self Crit Rate Buff',
    ])
    .addTeammateSection(
      'DPS',
      ['feixiao', 'the-herta', 'acheron'],
      [
        'Any DPS as long as they can benefit from Shields, Debuff Applications and constant Follow-up Attacks',
      ],
    )
    .addTeamComposition('Feixiao Team', 'Sustain', ['feixiao', 'cipher', 'robin', 'aventurine'])
    .addTeamComposition('The Herta Team', 'Sustain', [
      'the-herta',
      'anaxa',
      'tribbie',
      'aventurine',
    ])
    .addTeamComposition('Acheron Team', 'Sustain', ['acheron', 'jiaoqiu', 'cipher', 'aventurine'])
    .build(),

  new CharacterBuilder('hyacine', 'Hyacine')
    .element('Wind')
    .path('Remembrance')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Healer')
    .labels([
      'Fat Fuck',
      'HP Scaling',
      'Memosprite',
      'Memosprite Immune to Crowd Control',
      'Cleanse on Skill and Ultimate',
    ])
    .addTeammateSection(
      'DPS',
      ['castorice', 'the-herta'],
      ['Any DPS as long as they can benefit from HP Scaling and Constant AoE Attacks'],
    )
    .addTeamComposition('Castorice Team', 'Sustain', [
      'castorice',
      'remembrance-trailblazer',
      'tribbie',
      'hyacine',
    ])
    .addTeamComposition('The Herta Team', 'Sustain', ['the-herta', 'anaxa', 'tribbie', 'hyacine'])
    .build(),
]
