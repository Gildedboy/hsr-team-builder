import { CharacterBuilder } from '@/types/Character'

export const supportCharacters = [
  // Support Characters
  new CharacterBuilder('pela', 'Pela')
    .element('Ice')
    .path('Nihility')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels(['Debuff', 'Defense Reduction', 'Ice', 'F2P'])
    .build(),

  new CharacterBuilder('silver-wolf', 'Silver Wolf')
    .element('Quantum')
    .path('Nihility')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels(['Debuff', 'Weakness Implant', 'Defense Reduction', 'Quantum'])
    .build(),

  new CharacterBuilder('welt', 'Welt')
    .element('Imaginary')
    .path('Nihility')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels(['Debuff', 'Slow', 'Imaginary', 'AoE'])
    .build(),

  new CharacterBuilder('jiaoqiu', 'Jiaoqiu')
    .element('Fire')
    .path('Nihility')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels(['Debuff', 'Ultimate Vulnerability', 'Fire', 'DoT Support'])
    .build(),

  new CharacterBuilder('asta', 'Asta')
    .element('Fire')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Buffer', 'Speed Support', 'Fire', 'F2P'])
    .build(),

  new CharacterBuilder('yukong', 'Yukong')
    .element('Imaginary')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Buffer', 'Crit Support', 'Imaginary', 'F2P'])
    .build(),

  new CharacterBuilder('hanya', 'Hanya')
    .element('Physical')
    .path('Harmony')
    .rarity(4)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Buffer', 'Speed Support', 'Physical', 'F2P'])
    .build(),

  // Buffer Characters
  new CharacterBuilder('bronya', 'Bronya')
    .element('Wind')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Support', 'Buffer', 'Crit Support', 'Generalist'])
    .build(),

  new CharacterBuilder('harmony-trailblazer', 'Harmony TB')
    .element('Imaginary')
    .path('Harmony')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Buffer')
    .labels(['Buffer', 'Break Support', 'Super Break', 'F2P'])
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

  new CharacterBuilder('anaxa', 'Anaxa')
    .element('Fire')
    .path('Nihility')
    .rarity(5)
    .roles(['SUPPORT'])
    .archetype('Debuffer')
    .labels(['Debuff', 'Fire', 'DoT'])
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
