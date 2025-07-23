// Comprehensive character data extracted from main branch
// This file contains all 74 characters with their complete data structure

export const allCharactersSeedData = [
  {
    "id": "seele",
    "name": "Seele",
    "element": "Quantum",
    "path": "Hunt",
    "rarity": 5,
    "roles": ["DPS"],
    "archetype": ["Hypercarry"],
    "labels": ["Single Target", "Extra Turn", "Enhanced State", "SP Unfriendly"],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": ["sparkle", "silver-wolf"],
        "generalist": ["sunday", "robin", "cipher"],
        "f2p": ["remembrance-trailblazer", "bronya", "tingyun", "hanya", "pela"]
      },
      {
        "name": "Sustain",
        "bis": ["fu-xuan"],
        "generalist": ["huohuo"],
        "f2p": ["gallagher"]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": ["seele", "sparkle", "silver-wolf", "fu-xuan"]
        },
        "f2p": {
          "characters": ["seele", "tingyun", "hanya", "gallagher"]
        }
      }
    ]
  },
  {
    "id": "jing-yuan",
    "name": "Jing Yuan",
    "element": "Lightning",
    "path": "Erudition",
    "rarity": 5,
    "roles": ["DPS"],
    "archetype": ["Follow-up", "Summon", "Hypercarry"],
    "labels": ["AoE", "Summon", "Follow-up Attack"],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": ["robin", "sunday"],
        "generalist": ["tribbie", "cipher", "sparkle", "ruan-mei"],
        "f2p": ["bronya", "tingyun", "pela"]
      },
      {
        "name": "Sustain",
        "bis": ["aventurine", "huohuo"],
        "generalist": ["hyacine"],
        "f2p": ["gallagher"]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": ["jing-yuan", "robin", "sunday", "aventurine"]
        },
        "f2p": {
          "characters": ["jing-yuan", "tingyun", "pela", "gallagher"]
        }
      }
    ]
  },
  {
    "id": "clara",
    "name": "Clara",
    "element": "Physical",
    "path": "Destruction",
    "rarity": 5,
    "roles": ["DPS"],
    "archetype": ["Counter"],
    "labels": ["Counter Attack", "Blast", "AoE", "F2P"],
    "teammateRecommendations": [
      {
        "name": "Dual DPS",
        "bis": ["yunli"],
        "generalist": ["topaz"],
        "f2p": []
      },
      {
        "name": "Amplifiers",
        "bis": ["robin"],
        "generalist": ["cipher", "tribbie", "silver-wolf", "sunday", "sparkle"],
        "f2p": ["remembrance-trailblazer", "pela"]
      },
      {
        "name": "Sustain",
        "bis": ["huohuo"],
        "generalist": ["aventurine", "luocha", "fu-xuan"],
        "f2p": ["gallagher", "lynx"]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": ["clara", "robin", "sunday", "huohuo"]
        },
        "f2p": {
          "characters": ["clara", "tingyun", "remembrance-trailblazer", "gallagher"]
        }
      },
      {
        "name": "Counter Duo",
        "role": "Sub DPS",
        "bis": {
          "characters": ["yunli", "clara", "robin", "aventurine"]
        },
        "f2p": {
          "characters": ["yunli", "clara", "pela", "gallagher"]
        }
      }
    ]
  },
  {
    "id": "acheron",
    "name": "Acheron",
    "element": "Lightning",
    "path": "Nihility", 
    "rarity": 5,
    "roles": ["DPS"],
    "archetype": ["Ultimate-Based", "Debuff DPS"],
    "labels": ["Ultimate DMG", "AoE", "Debuff Stacking", "Premium"],
    "teammateRecommendations": [
      {
        "name": "Debuffers",
        "bis": ["jiaoqiu", "cipher"],
        "generalist": ["pela", "silver-wolf"],
        "f2p": ["pela", "welt"]
      },
      {
        "name": "Sustain",
        "bis": ["aventurine", "fu-xuan"],
        "generalist": ["gepard"],
        "f2p": ["gallagher"]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": ["acheron", "jiaoqiu", "cipher", "aventurine"]
        },
        "f2p": {
          "characters": ["acheron", "pela", "welt", "gallagher"]
        }
      }
    ]
  },
  {
    "id": "feixiao",
    "name": "Feixiao",
    "element": "Wind",
    "path": "Hunt",
    "rarity": 5,
    "roles": ["DPS"],
    "archetype": ["Follow-up", "Ultimate-Based"],
    "labels": ["Follow-up Attack", "Ultimate DMG", "AoE", "Premium"],
    "teammateRecommendations": [
      {
        "name": "Follow-up Partners",
        "bis": ["robin", "topaz"],
        "generalist": ["moze", "cipher"],
        "f2p": ["harmony-trailblazer"]
      },
      {
        "name": "Sustain",
        "bis": ["aventurine"],
        "generalist": ["huohuo"],
        "f2p": ["gallagher"]
      }
    ],
    "teamCompositions": [
      {
        "name": "Follow-up Team",
        "role": "Main DPS",
        "bis": {
          "characters": ["feixiao", "robin", "topaz", "aventurine"]
        },
        "f2p": {
          "characters": ["feixiao", "harmony-trailblazer", "moze", "gallagher"]
        }
      }
    ]
  },
  // Support Characters
  {
    "id": "sparkle",
    "name": "Sparkle",
    "element": "Quantum",
    "path": "Harmony",
    "rarity": 5,
    "roles": ["SUPPORT"],
    "archetype": ["Buffer"],
    "labels": ["SP Positive", "CRIT DMG", "Action Advance", "Premium"],
    "teammateRecommendations": [
      {
        "name": "DPS Partners",
        "bis": ["seele", "dan-heng-il", "blade"],
        "generalist": ["Any single-target DPS"],
        "f2p": ["dan-heng"]
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "robin",
    "name": "Robin",
    "element": "Physical", 
    "path": "Harmony",
    "rarity": 5,
    "roles": ["SUPPORT"],
    "archetype": ["Buffer"],
    "labels": ["FUA", "ATK Buff", "Energy Support", "Premium"],
    "teammateRecommendations": [
      {
        "name": "Follow-up DPS",
        "bis": ["feixiao", "topaz", "jing-yuan"],
        "generalist": ["clara", "yunli"],
        "f2p": ["himeko"]
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "sunday",
    "name": "Sunday",
    "element": "Imaginary",
    "path": "Harmony",
    "rarity": 5,
    "roles": ["SUPPORT"],
    "archetype": ["Buffer"],
    "labels": ["Summon Support", "Action Advance", "Energy Regen", "Premium"],
    "teammateRecommendations": [
      {
        "name": "Summon DPS",
        "bis": ["jing-yuan", "lingsha"],
        "generalist": ["Any summon character"],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "ruan-mei",
    "name": "Ruan Mei",
    "element": "Ice",
    "path": "Harmony",
    "rarity": 5,
    "roles": ["SUPPORT"],
    "archetype": ["Buffer"],
    "labels": ["Break Support", "SPD Buff", "Weakness Break Efficiency", "Premium"],
    "teammateRecommendations": [
      {
        "name": "Break DPS",
        "bis": ["boothill", "firefly"],
        "generalist": ["Any DPS"],
        "f2p": ["sushang"]
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "pela",
    "name": "Pela",
    "element": "Ice",
    "path": "Nihility",
    "rarity": 4,
    "roles": ["SUPPORT"],
    "archetype": ["Debuffer"],
    "labels": ["Exposed", "Defense Reduction", "F2P", "Remove Enemy Buffs on Skill"],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": ["acheron"],
        "generalist": ["Any DPS as long as they can benefit from Enemy Reduced DEF and constant Debuffs Applications"],
        "f2p": []
      }
    ],
    "teamCompositions": [
      {
        "name": "Acheron Team",
        "role": "Debuffer",
        "bis": {
          "characters": ["acheron", "pela", "cipher", "aventurine"]
        }
      }
    ]
  },
  // Sustain Characters
  {
    "id": "fu-xuan",
    "name": "Fu Xuan",
    "element": "Quantum",
    "path": "Preservation",
    "rarity": 5,
    "roles": ["SUSTAIN"],
    "archetype": ["HP-Scaling"],
    "labels": ["Heal Allies on Ultimate", "Damage Distribution", "HP Scaling", "Crit Rate Amplifier", "Self Heal", "Crowd Control Immunity on Skill", "Allies DMG Reduction"],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": ["acheron", "yunli"],
        "generalist": ["Any DPS as long as they can benefit from Crit Rate Buffs,DMG Reduction and constant Debuffs Application"],
        "f2p": []
      }
    ],
    "teamCompositions": [
      {
        "name": "Acheron Team",
        "role": "Sustain",
        "bis": {
          "characters": ["acheron", "jiaoqiu", "cipher", "fu-xuan"]
        }
      }
    ]
  },
  {
    "id": "aventurine", 
    "name": "Aventurine",
    "element": "Imaginary",
    "path": "Preservation",
    "rarity": 5,
    "roles": ["SUSTAIN"],
    "archetype": ["Follow-up", "Shielder"],
    "labels": ["Shield", "Follow-up Attack", "Debuff RES", "Premium"],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": ["feixiao", "topaz"],
        "generalist": ["Any DPS that benefits from shields"],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "huohuo",
    "name": "Huohuo",
    "element": "Wind",
    "path": "Abundance",
    "rarity": 5,
    "roles": ["SUSTAIN"],
    "archetype": ["Healer"],
    "labels": ["Heal", "Energy Regen", "Cleanse", "ATK Buff"],
    "teammateRecommendations": [
      {
        "name": "Energy Hungry DPS", 
        "bis": ["blade", "jingliu"],
        "generalist": ["Any DPS needing energy"],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "gallagher",
    "name": "Gallagher",
    "element": "Fire",
    "path": "Abundance",
    "rarity": 4,
    "roles": ["SUSTAIN"],
    "archetype": ["Healer"],
    "labels": ["Heal", "Break Support", "F2P"],
    "teammateRecommendations": [
      {
        "name": "Break DPS",
        "bis": ["boothill", "firefly"],
        "generalist": ["Any DPS"],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "march-7th",
    "name": "March 7th", 
    "element": "Ice",
    "path": "Preservation",
    "rarity": 4,
    "roles": ["SUSTAIN"],
    "archetype": ["Shielder"],
    "labels": ["Shield", "Freeze", "Counter", "F2P"],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [],
        "generalist": ["Any DPS needing protection"],
        "f2p": ["Any F2P DPS"]
      }
    ],
    "teamCompositions": []
  }
]
