import { CharacterBuilder } from '@/types/Character'

export const sustainCharacters = [
  // Sustain Characters
  new CharacterBuilder('gepard', 'Gepard')
    .element('Ice')
    .path('Preservation')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Shielder')
    .labels(['Shielder', 'Ice', 'Freeze', 'Taunt'])
    .build(),

  new CharacterBuilder('fu-xuan', 'Fu Xuan')
    .element('Quantum')
    .path('Preservation')
    .rarity(5)
    .roles(['SUSTAIN'])
    .archetype('Shielder')
    .labels(['Shielder', 'HP Redistribution', 'Quantum', 'Crit Support'])
    .build(),

  new CharacterBuilder('march-7th', 'March 7th')
    .element('Ice')
    .path('Preservation')
    .rarity(4)
    .roles(['SUSTAIN'])
    .archetype('Shielder')
    .labels(['Shielder', 'Ice', 'Counter', 'F2P'])
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
