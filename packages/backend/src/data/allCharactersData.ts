// Enhanced character data with complete teammate recommendations and team compositions
// Extracted from main branch on 2025-07-23T08:05:11.280Z

export const allCharactersSeedData = [
  {
    "id": "seele",
    "name": "Seele",
    "element": "Quantum",
    "path": "Hunt",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry"
    ],
    "labels": [
      "Single Target",
      "Extra Turn",
      "Enhanced State",
      "SP Unfriendly"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sparkle",
          "silver-wolf"
        ],
        "generalist": [
          "sunday",
          "robin",
          "cipher"
        ],
        "f2p": [
          "remembrance-trailblazer",
          "bronya",
          "tingyun",
          "hanya",
          "pela"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "fu-xuan"
        ],
        "generalist": [
          "huohuo"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "seele",
            "sparkle",
            "silver-wolf",
            "fu-xuan"
          ]
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
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Follow-up, Summon, Hypercarry"
    ],
    "labels": [
      "AoE",
      "Summon",
      "Follow-up Attack"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "robin",
          "sunday"
        ],
        "generalist": [
          "tribbie",
          "cipher",
          "sparkle",
          "ruan-mei"
        ],
        "f2p": [
          "bronya",
          "tingyun",
          "pela"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "aventurine",
          "huohuo"
        ],
        "generalist": [
          "hyacine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "jing-yuan",
            "robin",
            "sunday",
            "aventurine"
          ]
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
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Counter"
    ],
    "labels": [
      "Counter Attack",
      "Blast",
      "AoE",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "Dual DPS",
        "bis": [
          "yunli"
        ],
        "generalist": [
          "topaz"
        ],
        "f2p": []
      },
      {
        "name": "Amplifiers",
        "bis": [
          "robin"
        ],
        "generalist": [
          "cipher",
          "tribbie",
          "silver-wolf",
          "sunday",
          "sparkle"
        ],
        "f2p": [
          "remembrance-trailblazer",
          "pela"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "aventurine",
          "luocha",
          "fu-xuan"
        ],
        "f2p": [
          "gallagher",
          "lynx"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "clara",
            "robin",
            "sunday",
            "huohuo"
          ]
        }
      },
      {
        "name": "Counter Duo",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "yunli",
            "clara",
            "robin",
            "aventurine"
          ]
        }
      }
    ]
  },
  {
    "id": "himeko",
    "name": "Himeko",
    "element": "Fire",
    "path": "Erudition",
    "rarity": 5,
    "roles": [
      "SUB_DPS"
    ],
    "archetype": [
      "Follow-up, Break-DPS"
    ],
    "labels": [
      "AoE",
      "Blast",
      "Follow-up Attack",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "Dual DPS",
        "bis": [
          "the-herta"
        ],
        "generalist": [
          "anaxa"
        ],
        "f2p": [
          "herta"
        ]
      },
      {
        "name": "Dual Amplifiers",
        "bis": [
          "tribbie"
        ],
        "generalist": [
          "robin",
          "ruan-mei",
          "silver-wolf"
        ],
        "f2p": [
          "pela"
        ]
      },
      {
        "name": "Break Amplifiers",
        "bis": [
          "fugue",
          "ruan-mei"
        ],
        "generalist": [
          "cipher"
        ],
        "f2p": [
          "harmony-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "lingsha"
        ],
        "generalist": [
          "hyacine",
          "huohuo"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Dual DPS",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "himeko",
            "the-herta",
            "tribbie",
            "lingsha"
          ]
        }
      },
      {
        "name": "Break Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "himeko",
            "fugue",
            "ruan-mei",
            "lingsha"
          ]
        }
      }
    ]
  },
  {
    "id": "yanqing",
    "name": "Yanqing",
    "element": "Ice",
    "path": "Hunt",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry, Follow-up"
    ],
    "labels": [
      "Single Target",
      "Follow-up Attack",
      "F2P",
      "Enhanced State"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sunday"
        ],
        "generalist": [
          "sparkle",
          "silver-wolf",
          "cipher"
        ],
        "f2p": [
          "bronya",
          "tingyun",
          "pela",
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "aventurine"
        ],
        "generalist": [],
        "f2p": [
          "gepard",
          "march-7th"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "yanqing",
            "sunday",
            "bronya",
            "aventurine"
          ]
        }
      }
    ]
  },
  {
    "id": "blade",
    "name": "Blade",
    "element": "Wind",
    "path": "Destruction",
    "rarity": 5,
    "roles": [
      "DPS",
      "SUB_DPS"
    ],
    "archetype": [
      "HP-Scaling"
    ],
    "labels": [
      "Follow-up Attack",
      "HP Scaling",
      "Self Damage",
      "Self Taunt"
    ],
    "teammateRecommendations": [
      {
        "name": "Dual DPS",
        "bis": [
          "castorice"
        ],
        "generalist": [
          "jingliu"
        ],
        "f2p": []
      },
      {
        "name": "Amplifiers",
        "bis": [
          "sunday",
          "tribbie"
        ],
        "generalist": [
          "silver-wolf",
          "cipher",
          "ruan-mei"
        ],
        "f2p": [
          "bronya",
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "hyacine"
        ],
        "generalist": [
          "huohuo",
          "luocha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "blade",
            "sunday",
            "tribbie",
            "hyacine"
          ]
        }
      },
      {
        "name": "Dual DPS Team",
        "role": "Sub-DPS",
        "bis": {
          "characters": [
            "blade",
            "castorice",
            "tribbie",
            "hyacine"
          ]
        }
      }
    ]
  },
  {
    "id": "dan-heng-il",
    "name": "Dan Heng IL",
    "element": "Imaginary",
    "path": "Destruction",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry"
    ],
    "labels": [
      "Blast",
      "AoE",
      "Enhanced Basic Attack",
      "SP Unfriendly"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sparkle",
          "sunday"
        ],
        "generalist": [
          "cipher",
          "silver-wolf",
          "ruan-mei",
          "tribbie"
        ],
        "f2p": [
          "tingyun",
          "hanya"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "luocha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "dan-heng-il",
            "sparkle",
            "sunday",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "jingliu",
    "name": "Jingliu",
    "element": "Ice",
    "path": "Destruction",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "HP-Scaling, Hypercarry"
    ],
    "labels": [
      "Blast",
      "Self Damage",
      "Enhanced State",
      "Action Advance",
      "SP Friendly"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "tribbie",
          "sunday"
        ],
        "generalist": [
          "cipher",
          "silver-wolf",
          "ruan-mei"
        ],
        "f2p": [
          "bronya",
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "hyacine"
        ],
        "generalist": [
          "huohuo",
          "luocha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "jingliu",
            "sunday",
            "tribbie",
            "hyacine"
          ]
        }
      }
    ]
  },
  {
    "id": "argenti",
    "name": "Argenti",
    "element": "Physical",
    "path": "Erudition",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Ultimate-Based, Hypercarry"
    ],
    "labels": [
      "AoE",
      "Energy Hungry",
      "Stackable Ultimate"
    ],
    "teammateRecommendations": [
      {
        "name": "Dual DPS",
        "bis": [
          "the-herta"
        ],
        "generalist": [
          "anaxa"
        ],
        "f2p": []
      },
      {
        "name": "Amplifiers",
        "bis": [
          "tribbie",
          "sunday"
        ],
        "generalist": [
          "robin",
          "cipher",
          "silver-wolf",
          "ruan-mei"
        ],
        "f2p": [
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "aventurine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "argenti",
            "sunday",
            "silver-wolf",
            "huohuo"
          ]
        }
      },
      {
        "name": "Dual DPS Team",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "the-herta",
            "argenti",
            "tribbie",
            "huohuo"
          ]
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
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Ultimate-Based, Debuff DPS, Hypercarry"
    ],
    "labels": [
      "AoE",
      "Ultimate Based",
      "Requires Nihility Partners",
      "Debuff Synergy"
    ],
    "teammateRecommendations": [
      {
        "name": "Debuffers",
        "bis": [
          "jiaoqiu",
          "cipher"
        ],
        "generalist": [
          "silver-wolf",
          "sunday",
          "sparkle"
        ],
        "f2p": [
          "pela",
          "guinaifen"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "aventurine"
        ],
        "generalist": [
          "fu-xuan",
          "hyacine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "E0 Acheron Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "acheron",
            "jiaoqiu",
            "cipher",
            "aventurine"
          ]
        }
      },
      {
        "name": "E2 Acheron Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "acheron",
            "cipher",
            "sunday",
            "aventurine"
          ]
        }
      }
    ]
  },
  {
    "id": "yunli",
    "name": "Yunli",
    "element": "Physical",
    "path": "Destruction",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Counter, Ultimate-Based, Hypercarry"
    ],
    "labels": [
      "Counter Attack",
      "Blast",
      "Stackable Ultimate",
      "Self Taunt"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "robin",
          "sunday"
        ],
        "generalist": [
          "cipher",
          "silver-wolf",
          "tribbie",
          "sparkle"
        ],
        "f2p": [
          "tingyun",
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "aventurine",
          "luocha",
          "fu-xuan"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "yunli",
            "robin",
            "sunday",
            "huohuo"
          ]
        }
      },
      {
        "name": "Counter Duo",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "yunli",
            "clara",
            "robin",
            "aventurine"
          ]
        }
      }
    ]
  },
  {
    "id": "topaz",
    "name": "Topaz",
    "element": "Fire",
    "path": "Hunt",
    "rarity": 5,
    "roles": [
      "SUB_DPS"
    ],
    "archetype": [
      "Follow-up, Summon"
    ],
    "labels": [
      "Follow-up Attack",
      "SP Friendly",
      "Single Target",
      "Follow-up Support"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS Partners",
        "bis": [
          "feixiao",
          "ratio"
        ],
        "generalist": [
          "yunli"
        ],
        "f2p": [
          "moze",
          "hunt-march-7th"
        ]
      },
      {
        "name": "Dual Amplifiers",
        "bis": [
          "robin",
          "tribbie"
        ],
        "generalist": [
          "silver-wolf",
          "cipher",
          "ruan-mei"
        ],
        "f2p": [
          "pela"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "aventurine",
          "huohuo"
        ],
        "generalist": [
          "hyacine",
          "fu-xuan"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Sub DPS Team",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "feixiao",
            "topaz",
            "robin",
            "aventurine"
          ]
        }
      }
    ]
  },
  {
    "id": "ratio",
    "name": "Dr. Ratio",
    "element": "Imaginary",
    "path": "Hunt",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Follow-up, Debuff DPS, Hypercarry"
    ],
    "labels": [
      "Follow-up Attack",
      "Debuff Synergy"
    ],
    "teammateRecommendations": [
      {
        "name": "Sub-DPS Partners",
        "bis": [
          "topaz"
        ],
        "generalist": [],
        "f2p": [
          "moze"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "robin",
          "cipher"
        ],
        "generalist": [
          "jiaoqiu",
          "silver-wolf",
          "tribbie",
          "sunday",
          "sparkle"
        ],
        "f2p": [
          "pela",
          "guinaifen"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "aventurine"
        ],
        "generalist": [
          "huohuo",
          "lingsha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "ratio",
            "topaz",
            "robin",
            "aventurine"
          ]
        }
      }
    ]
  },
  {
    "id": "jade",
    "name": "Jade",
    "element": "Quantum",
    "path": "Erudition",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Follow-up"
    ],
    "labels": [
      "Follow-up Attack",
      "AoE",
      "Follow-up Support",
      "Requires Partner"
    ],
    "teammateRecommendations": [
      {
        "name": "Dual DPS Partners",
        "bis": [
          "the-herta"
        ],
        "generalist": [
          "blade",
          "himeko",
          "anaxa"
        ],
        "f2p": [
          "herta"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "tribbie"
        ],
        "generalist": [
          "robin"
        ],
        "f2p": [
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "aventurine",
          "huohuo"
        ],
        "generalist": [
          "fu-xuan",
          "hyacine",
          "lingsha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Dual DPS Team",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "jade",
            "the-herta",
            "tribbie",
            "hyacine"
          ]
        }
      }
    ]
  },
  {
    "id": "kafka",
    "name": "Kafka",
    "element": "Lightning",
    "path": "Nihility",
    "rarity": 5,
    "roles": [
      "DPS",
      "SUPPORT"
    ],
    "archetype": [
      "DoT"
    ],
    "labels": [
      "Shock",
      "DoT Enabler",
      "Follow-up Attack"
    ],
    "teammateRecommendations": [
      {
        "name": "DoT Partners",
        "bis": [
          "black-swan"
        ],
        "generalist": [
          "jiaoqiu"
        ],
        "f2p": [
          "sampo",
          "serval"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "ruan-mei"
        ],
        "generalist": [
          "tribbie",
          "cipher"
        ],
        "f2p": [
          "guinaifen"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "hyacine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "DoT Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "kafka",
            "black-swan",
            "ruan-mei",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "black-swan",
    "name": "Black Swan",
    "element": "Wind",
    "path": "Nihility",
    "rarity": 5,
    "roles": [
      "DPS",
      "SUPPORT"
    ],
    "archetype": [
      "DoT"
    ],
    "labels": [
      "DoT",
      "Arcana",
      "DoT Amplifier",
      "Blast",
      "AoE"
    ],
    "teammateRecommendations": [
      {
        "name": "DoT Partners",
        "bis": [
          "kafka"
        ],
        "generalist": [
          "jiaoqiu"
        ],
        "f2p": [
          "sampo",
          "serval"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "ruan-mei"
        ],
        "generalist": [
          "tribbie",
          "cipher"
        ],
        "f2p": [
          "guinaifen"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "hyacine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "DoT Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "black-swan",
            "kafka",
            "ruan-mei",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "sampo",
    "name": "Sampo",
    "element": "Wind",
    "path": "Nihility",
    "rarity": 4,
    "roles": [
      "SUB_DPS"
    ],
    "archetype": [
      "DoT"
    ],
    "labels": [
      "DoT",
      "Wind Shear",
      "F2P",
      "Bounce",
      "AoE"
    ],
    "teammateRecommendations": [
      {
        "name": "DoT Partners",
        "bis": [
          "kafka"
        ],
        "generalist": [
          "jiaoqiu"
        ],
        "f2p": [
          "serval"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "ruan-mei"
        ],
        "generalist": [
          "tribbie",
          "cipher"
        ],
        "f2p": [
          "guinaifen"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "hyacine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "DoT Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "sampo",
            "kafka",
            "ruan-mei",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "luka",
    "name": "Luka",
    "element": "Physical",
    "path": "Nihility",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "DoT"
    ],
    "labels": [
      "DoT",
      "Bleed",
      "F2P",
      "Break",
      "Single Target"
    ],
    "teammateRecommendations": [
      {
        "name": "DoT Partners",
        "bis": [
          "fugue"
        ],
        "generalist": [
          "kafka"
        ],
        "f2p": [
          "sushang"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "ruan-mei"
        ],
        "generalist": [
          "silver-wolf",
          "cipher"
        ],
        "f2p": [
          "tingyun",
          "guinaifen"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "hyacine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "DoT Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "luka",
            "fugue",
            "ruan-mei",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "destruction-trailblazer",
    "name": "Destruction TB",
    "element": "Physical",
    "path": "Destruction",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Break-DPS"
    ],
    "labels": [
      "Bleed",
      "F2P",
      "Break",
      "Blast"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "fugue",
          "ruan-mei"
        ],
        "generalist": [
          "sunday",
          "cipher",
          "silver-wolf"
        ],
        "f2p": [
          "pela",
          "tingyun",
          "bronya"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "lingsha"
        ],
        "generalist": [
          "hyacine",
          "fu-xuan",
          "huohuo"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Break Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "destruction-trailblazer",
            "fugue",
            "ruan-mei",
            "lingsha"
          ]
        }
      }
    ]
  },
  {
    "id": "boothill",
    "name": "Boothill",
    "element": "Physical",
    "path": "Hunt",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Break-DPS"
    ],
    "labels": [
      "Break DPS",
      "Single Target",
      "Implant Weakness"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "fugue",
          "ruan-mei"
        ],
        "generalist": [
          "sunday"
        ],
        "f2p": [
          "bronya",
          "harmony-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "lingsha"
        ],
        "generalist": [
          "hyacine",
          "fu-xuan",
          "huohuo"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Break Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "boothill",
            "fugue",
            "ruan-mei",
            "lingsha"
          ]
        }
      }
    ]
  },
  {
    "id": "firefly",
    "name": "Firefly",
    "element": "Fire",
    "path": "Destruction",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Break-DPS"
    ],
    "labels": [
      "Break DPS",
      "Super Break",
      "Implant Weakness",
      "Action Advance",
      "Blast",
      "Enhanced State"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "fugue",
          "ruan-mei"
        ],
        "generalist": [
          "cipher"
        ],
        "f2p": [
          "harmony-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "lingsha"
        ],
        "generalist": [
          "huohuo",
          "aventurine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Break Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "firefly",
            "fugue",
            "ruan-mei",
            "lingsha"
          ]
        }
      }
    ]
  },
  {
    "id": "rappa",
    "name": "Rappa",
    "element": "Imaginary",
    "path": "Erudition",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Break-DPS"
    ],
    "labels": [
      "Break DPS",
      "AoE",
      "Blast",
      "Super Break"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "fugue",
          "ruan-mei"
        ],
        "generalist": [
          "tribbie"
        ],
        "f2p": [
          "harmony-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "lingsha"
        ],
        "generalist": [
          "huohuo"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Break Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "rappa",
            "fugue",
            "ruan-mei",
            "lingsha"
          ]
        }
      }
    ]
  },
  {
    "id": "dan-heng",
    "name": "Dan Heng",
    "element": "Wind",
    "path": "Hunt",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry"
    ],
    "labels": [
      "Single Target",
      "F2P",
      "Applies Slow"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sunday"
        ],
        "generalist": [
          "tribbie",
          "sparkle",
          "ruan-mei",
          "silver-wolf",
          "cipher"
        ],
        "f2p": [
          "bronya",
          "remembrance-trailblazer",
          "tingyun"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo",
          "hyacine"
        ],
        "generalist": [
          "fu-xuan"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "dan-heng",
            "sunday",
            "silver-wolf",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "arlan",
    "name": "Arlan",
    "element": "Lightning",
    "path": "Destruction",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "HP-Scaling"
    ],
    "labels": [
      "Self Damage",
      "F2P",
      "HP-Scaling"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "tribbie",
          "sunday"
        ],
        "generalist": [
          "sparkle",
          "ruan-mei",
          "silver-wolf",
          "cipher"
        ],
        "f2p": [
          "bronya",
          "remembrance-trailblazer",
          "tingyun"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "hyacine",
          "aventurine"
        ],
        "generalist": [
          "gepard"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "arlan",
            "sunday",
            "cipher",
            "aventurine"
          ]
        }
      },
      {
        "name": "Castorice Partner",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "castorice",
            "arlan",
            "tribbie",
            "hyacine"
          ]
        }
      }
    ]
  },
  {
    "id": "serval",
    "name": "Serval",
    "element": "Lightning",
    "path": "Erudition",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Ultimate-Based"
    ],
    "labels": [
      "AoE",
      "Shock",
      "DoT",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sunday",
          "sparkle"
        ],
        "generalist": [
          "cipher",
          "silver-wolf",
          "ruan-mei"
        ],
        "f2p": [
          "bronya",
          "tingyun",
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo",
          "hyacine"
        ],
        "generalist": [
          "fu-xuan",
          "luocha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "The Herta Partner",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "the-herta",
            "serval",
            "tribbie",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "hook",
    "name": "Hook",
    "element": "Fire",
    "path": "Destruction",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry"
    ],
    "labels": [
      "Single Target",
      "Enhanced Skill",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sunday",
          "tribbie"
        ],
        "generalist": [
          "cipher",
          "silver-wolf",
          "ruan-mei"
        ],
        "f2p": [
          "bronya",
          "tingyun",
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "fu-xuan",
          "luocha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "hook",
            "sunday",
            "tribbie",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "qingque",
    "name": "Qingque",
    "element": "Quantum",
    "path": "Erudition",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry"
    ],
    "labels": [
      "AoE",
      "Enhanced Basic Attack",
      "F2P",
      "SP Unfriendly",
      "Follow-up Attack on Eidolon",
      "Energy Hungry"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sparkle"
        ],
        "generalist": [
          "silver-wolf",
          "cipher",
          "sunday"
        ],
        "f2p": [
          "tingyun",
          "hanya"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "fu-xuan",
          "huohuo"
        ],
        "generalist": [
          "aventurine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "qingque",
            "sparkle",
            "tribbie",
            "fu-xuan"
          ]
        }
      }
    ]
  },
  {
    "id": "sushang",
    "name": "Sushang",
    "element": "Physical",
    "path": "Hunt",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Break-DPS"
    ],
    "labels": [
      "Single Target",
      "Action Advance",
      "F2P",
      "Break DPS"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "fugue",
          "ruan-mei"
        ],
        "generalist": [
          "sunday",
          "silver-wolf"
        ],
        "f2p": [
          "bronya",
          "harmony-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "lingsha"
        ],
        "generalist": [
          "huohuo"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Break Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "sushang",
            "fugue",
            "ruan-mei",
            "lingsha"
          ]
        }
      }
    ]
  },
  {
    "id": "herta",
    "name": "Herta",
    "element": "Ice",
    "path": "Erudition",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Follow-up"
    ],
    "labels": [
      "AoE",
      "Follow-up Attack",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "Dual DPS",
        "bis": [
          "the-herta"
        ],
        "generalist": [
          "jade"
        ],
        "f2p": [
          "himeko"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "robin",
          "tribbie"
        ],
        "generalist": [
          "cipher",
          "silver-wolf",
          "ruan-mei"
        ],
        "f2p": [
          "bronya",
          "tingyun",
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo",
          "aventurine"
        ],
        "generalist": [
          "hyacine",
          "lingsha",
          "fu-xuan"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "The Herta Partner",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "the-herta",
            "herta",
            "tribbie",
            "huohuo"
          ]
        }
      },
      {
        "name": "Himeko Partner",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "himeko",
            "herta",
            "robin",
            "aventurine"
          ]
        }
      }
    ]
  },
  {
    "id": "xueyi",
    "name": "Xueyi",
    "element": "Quantum",
    "path": "Destruction",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Break-DPS"
    ],
    "labels": [
      "Break DPS",
      "Follow-up Attack",
      "F2P",
      "Blast",
      "Single Target",
      "Ultimate Ignores Weakness",
      "Karma"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "fugue",
          "ruan-mei"
        ],
        "generalist": [
          "cipher",
          "silver-wolf",
          "sunday",
          "sparkle",
          "tribbie"
        ],
        "f2p": [
          "harmony-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "lingsha"
        ],
        "generalist": [
          "huohuo"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Break Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "xueyi",
            "fugue",
            "ruan-mei",
            "lingsha"
          ]
        }
      }
    ]
  },
  {
    "id": "misha",
    "name": "Misha",
    "element": "Ice",
    "path": "Destruction",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Ultimate-Based"
    ],
    "labels": [
      "AoE",
      "Blast",
      "Ice",
      "Ultimate Based",
      "F2P",
      "Stackable Ultimate",
      "Freeze"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sunday",
          "sparkle"
        ],
        "generalist": [
          "cipher",
          "silver-wolf"
        ],
        "f2p": [
          "bronya",
          "remembrance-trailblazer",
          "pela"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "luocha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "misha",
            "sunday",
            "sparkle",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "feixiao",
    "name": "Feixiao",
    "element": "Wind",
    "path": "Hunt",
    "rarity": 4,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Follow-up"
    ],
    "labels": [
      "Follow-up Attack",
      "Stackable Ultimate",
      "Ultimate Ignores Weakness"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS Partners",
        "bis": [
          "cipher"
        ],
        "generalist": [
          "topaz",
          "ratio",
          "yunli"
        ],
        "f2p": [
          "moze",
          "hunt-march-7th"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "robin"
        ],
        "generalist": [
          "sunday",
          "silver-wolf"
        ],
        "f2p": [
          "bronya",
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "aventurine"
        ],
        "generalist": [
          "lingsha",
          "hyacine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "feixiao",
            "cipher",
            "robin",
            "aventurine"
          ]
        }
      }
    ]
  },
  {
    "id": "hunt-march-7th",
    "name": "Hunt March 7th",
    "element": "Imaginary",
    "path": "Hunt",
    "rarity": 4,
    "roles": [
      "SUB_DPS"
    ],
    "archetype": [
      "Follow-up"
    ],
    "labels": [
      "Follow-up Attack or Break DPS",
      "Shifu",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS Partners",
        "bis": [
          "feixiao"
        ],
        "generalist": [
          "topaz",
          "yunli"
        ],
        "f2p": [
          "clara"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "robin",
          "fugue"
        ],
        "generalist": [
          "sunday",
          "silver-wolf",
          "ruan-mei",
          "tribbie"
        ],
        "f2p": [
          "harmony-trailblazer",
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "aventurine",
          "huohuo"
        ],
        "generalist": [
          "lingsha",
          "hyacine",
          "luocha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Follow-up Team",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "feixiao",
            "hunt-march-7th",
            "robin",
            "aventurine"
          ]
        }
      },
      {
        "name": "Break Team",
        "role": "Sub DPS",
        "bis": {
          "characters": [
            "hunt-march-7th",
            "fugue",
            "ruan-mei",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "moze",
    "name": "Moze",
    "element": "Lightning",
    "path": "Hunt",
    "rarity": 4,
    "roles": [
      "SUB_DPS"
    ],
    "archetype": [
      "Follow-up"
    ],
    "labels": [
      "Follow-up Attack",
      "Prey",
      "Departed",
      "Action Advance",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS Partners",
        "bis": [
          "feixiao"
        ],
        "generalist": [
          "ratio",
          "topaz"
        ],
        "f2p": []
      },
      {
        "name": "Amplifiers",
        "bis": [
          "robin"
        ],
        "generalist": [
          "tribbie",
          "silver-wolf",
          "cipher"
        ],
        "f2p": [
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "aventurine"
        ],
        "generalist": [
          "luocha",
          "hyacine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Follow-up Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "feixiao",
            "moze",
            "robin",
            "aventurine"
          ]
        }
      }
    ]
  },
  {
    "id": "the-herta",
    "name": "The Herta",
    "element": "Ice",
    "path": "Erudition",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Ultimate-Based"
    ],
    "labels": [
      "AoE",
      "Requires Erudition Partner",
      "Action Advance",
      "Enhanced Skill"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS Partners",
        "bis": [
          "anaxa"
        ],
        "generalist": [
          "jade",
          "argenti"
        ],
        "f2p": [
          "herta",
          "serval"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "tribbie"
        ],
        "generalist": [
          "robin",
          "ruan-mei",
          "sunday"
        ],
        "f2p": [
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "hyacine",
          "huohuo"
        ],
        "generalist": [
          "lingsha",
          "aventurine",
          "fu-xuan"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "the-herta",
            "anaxa",
            "tribbie",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "aglaea",
    "name": "Aglaea",
    "element": "Lightning",
    "path": "Remembrance",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Summon, Hypercarry"
    ],
    "labels": [
      "Garmentmaker",
      "Action Advance",
      "Enhanced State",
      "Enhanced Basic Attack",
      "Memosprite",
      "Energy Hungry",
      "SP Friendly"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sunday",
          "robin"
        ],
        "generalist": [
          "tribbie",
          "silver-wolf"
        ],
        "f2p": [
          "bronya",
          "remembrance-trailblazer"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "fu-xuan"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "aglaea",
            "sunday",
            "robin",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "castorice",
    "name": "Castorice",
    "element": "Quantum",
    "path": "Remembrance",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "HP-Scaling, Summon, Hypercarry"
    ],
    "labels": [
      "Netherwing",
      "AoE",
      "Self Damage",
      "Memosprite",
      "Action Advance",
      "Global Revive Passive"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "tribbie",
          "remembrance-trailblazer"
        ],
        "generalist": [
          "sunday",
          "ruan-mei",
          "cipher",
          "silver-wolf"
        ],
        "f2p": []
      },
      {
        "name": "Sustain",
        "bis": [
          "hyacine"
        ],
        "generalist": [
          "luocha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "castorice",
            "remembrance-trailblazer",
            "tribbie",
            "hyacine"
          ]
        }
      }
    ]
  },
  {
    "id": "mydei",
    "name": "Mydei",
    "element": "Imaginary",
    "path": "Destruction",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "HP-Scaling"
    ],
    "labels": [
      "Enhanced Skill",
      "Self Damage",
      "Taunt",
      "Blast",
      "Vendetta"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sunday",
          "tribbie"
        ],
        "generalist": [
          "sparkle",
          "ruan-mei",
          "silver-wolf",
          "cipher"
        ],
        "f2p": [
          "remembrance-trailblazer",
          "tingyun"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "hyacine",
          "huohuo"
        ],
        "generalist": [
          "luocha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "mydei",
            "sunday",
            "tribbie",
            "hyacine"
          ]
        }
      }
    ]
  },
  {
    "id": "phainon",
    "name": "Phainon",
    "element": "Physical",
    "path": "Destruction",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry"
    ],
    "labels": [
      "Enhanced State",
      "Self Sufficient",
      "Action Advance",
      "Blast",
      "Aoe",
      "Counter",
      "Self Cleanse",
      "Deploys territory",
      "Implant Weakness"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sunday",
          "bronya"
        ],
        "generalist": [
          "ruan-mei",
          "tribbie",
          "cipher"
        ],
        "f2p": [
          "remembrance-trailblazer",
          "tingyun"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "aventurine",
          "luocha"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Sustainless",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "phainon",
            "sunday",
            "bronya",
            "tribbie"
          ]
        }
      },
      {
        "name": "With Sustain",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "phainon",
            "sunday",
            "bronya",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "saber",
    "name": "Saber",
    "element": "Wind",
    "path": "Destruction",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry"
    ],
    "labels": [
      "Energy Hungry",
      "Action Advance",
      "Blast",
      "Aoe"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sunday"
        ],
        "generalist": [
          "tribbie",
          "robin",
          "ruan-mei",
          "silver-wolf"
        ],
        "f2p": [
          "bronya",
          "tingyun"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "hyacine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "saber",
            "sunday",
            "robin",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "archer",
    "name": "Archer",
    "element": "Quantum",
    "path": "Hunt",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry"
    ],
    "labels": [
      "SP Unfriendly",
      "Single Target",
      "Extra Skill"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sparkle"
        ],
        "generalist": [
          "ruan-mei",
          "cipher",
          "silver-wolf",
          "tribbie"
        ],
        "f2p": [
          "hanya",
          "tingyun"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "gallagher"
        ],
        "generalist": [
          "luocha",
          "aventurine"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "archer",
            "sparkle",
            "silver-wolf",
            "gallagher"
          ]
        }
      }
    ]
  },
  {
    "id": "anaxa",
    "name": "Anaxa",
    "element": "Wind",
    "path": "Erudition",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry"
    ],
    "labels": [
      "Weakness Implant",
      "Bounce",
      "Extra Skill",
      "Hypercarry or Dual DPS"
    ],
    "teammateRecommendations": [
      {
        "name": "Dual DPS Partners",
        "bis": [
          "the-herta"
        ],
        "generalist": [
          "jade"
        ],
        "f2p": [
          "himeko"
        ]
      },
      {
        "name": "Amplifiers",
        "bis": [
          "tribbie"
        ],
        "generalist": [
          "sunday",
          "ruan-mei",
          "cipher",
          "silver-wolf",
          "robin"
        ],
        "f2p": [
          "bronya",
          "tingyun",
          "remembrance-trailblazer",
          "pela"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "hyacine",
          "huohuo"
        ],
        "generalist": [
          "aventurine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Dual DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "the-herta",
            "anaxa",
            "tribbie",
            "huohuo"
          ]
        }
      },
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "anaxa",
            "robin",
            "sunday",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "welt",
    "name": "Welt",
    "element": "Imaginary",
    "path": "Nihility",
    "rarity": 5,
    "roles": [
      "DPS"
    ],
    "archetype": [
      "Hypercarry"
    ],
    "labels": [
      "Bounce",
      "Slow",
      "Imprison",
      "AoE"
    ],
    "teammateRecommendations": [
      {
        "name": "Amplifiers",
        "bis": [
          "sunday"
        ],
        "generalist": [
          "tribbie",
          "ruan-mei",
          "cipher",
          "silver-wolf"
        ],
        "f2p": [
          "bronya",
          "tingyun",
          "remembrance-trailblazer",
          "pela"
        ]
      },
      {
        "name": "Sustain",
        "bis": [
          "huohuo"
        ],
        "generalist": [
          "hyacine"
        ],
        "f2p": [
          "gallagher"
        ]
      }
    ],
    "teamCompositions": [
      {
        "name": "Main DPS Team",
        "role": "Main DPS",
        "bis": {
          "characters": [
            "welt",
            "sunday",
            "silver-wolf",
            "huohuo"
          ]
        }
      }
    ]
  },
  {
    "id": "pela",
    "name": "Pela",
    "element": "Ice",
    "path": "Nihility",
    "rarity": 4,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Debuffer"
    ],
    "labels": [
      "Exposed",
      "Defense Reduction",
      "F2P",
      "Remove Enemy Buffs on Skill"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "acheron"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from Enemy Reduced DEF and constant Debuffs Applications"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "silver-wolf",
    "name": "Silver Wolf",
    "element": "Quantum",
    "path": "Nihility",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Debuffer"
    ],
    "labels": [
      "Attack Reduction",
      "Speed Reduction",
      "Defense Reduction",
      "Weakness Implant",
      "Weakness RES Reduction"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "acheron",
          "archer"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from Enemy Reduced DEF, SPD, ATK, Weakness RES and constant Debuffs Applications"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "jiaoqiu",
    "name": "Jiaoqiu",
    "element": "Fire",
    "path": "Nihility",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "DoT, Debuffer"
    ],
    "labels": [
      "Ashen Roast",
      "Vulnerability",
      "Ultimate Vulnerability",
      "DoT"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "acheron"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from Enemy Increased DMG Taken, Ultimate DMG Taken and constant Debuffs Applications"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "asta",
    "name": "Asta",
    "element": "Fire",
    "path": "Harmony",
    "rarity": 4,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "SPD Amplifier",
      "Burn",
      "F2P",
      "ATK Amplifier"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "kafka",
          "aglaea"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from the SPD and ATK buffs"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "yukong",
    "name": "Yukong",
    "element": "Imaginary",
    "path": "Harmony",
    "rarity": 4,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "ATK Amplifier",
      "Crit Rate Amplifier",
      "Crit DMG Amplifier ",
      "Imaginary DMG Amplifier",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "dan-heng-il"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from the ATK and Crit buffs"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "hanya",
    "name": "Hanya",
    "element": "Physical",
    "path": "Harmony",
    "rarity": 4,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "ATK Amplifier",
      "SPD Amplifier",
      "Recover Skill Points",
      "Burden",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "dan-heng-il",
          "archer"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from the ATK, SPD buffs and SP Recovery"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "bronya",
    "name": "Bronya",
    "element": "Wind",
    "path": "Harmony",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "Self Action Advance",
      "Action Advance",
      "F2P",
      "Crit DMG Amplifier",
      "ATK Amplifier",
      "Cleanse on Skill",
      "DMG Amplifier"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "harmony-trailblazer",
    "name": "Harmony TB",
    "element": "Imaginary",
    "path": "Harmony",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "Break Effect Amplifier",
      "Super Break",
      "F2P"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "robin",
    "name": "Robin",
    "element": "Physical",
    "path": "Harmony",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "Follow-up Amplifier",
      "Action Advance",
      "DMG Amplifier",
      "ATK Amplifier",
      "Immune to Crowd Control on Concerto"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "ruan-mei",
    "name": "Ruan Mei",
    "element": "Ice",
    "path": "Harmony",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "DMG Amplifier",
      "All-Type RES PEN Amplifier",
      "Weakness Break Efficiency",
      "SPD Amplifier",
      "Break Amplifier"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "sparkle",
    "name": "Sparkle",
    "element": "Quantum",
    "path": "Harmony",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "Crit DMG Amplifier",
      "Action Advance",
      "Recover Skill Points",
      "DMG Amplifier",
      "ATK Amplifier",
      "Quantum ATK Amplifier"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "dan-heng-il",
          "archer"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from the DMG, ATK, Crit DMG buffs, Action Advance and SP Recovery"
        ],
        "f2p": []
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
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "Action Advance",
      "Summon DMG Amplifier",
      "Crit DMG Amplifier",
      "Crit Rate Amplifier",
      "DMG Amplifier",
      "SP Recovery",
      "Gives Energy",
      "Cleanse on Skill"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "tingyun",
    "name": "Tingyun",
    "element": "Lightning",
    "path": "Harmony",
    "rarity": 4,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "ATK Amplifier",
      "Gives Energy",
      "DMG Amplifier",
      "F2P",
      "Self Taunt"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "fugue",
    "name": "Fugue",
    "element": "Fire",
    "path": "Nihility",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Debuffer"
    ],
    "labels": [
      "Foxian Prayer",
      "Break Effect Amplifier",
      "Exo-Toughness",
      "Reduce enemy DEF",
      "Ultimate ignores weakness",
      "Super Break",
      "Self Taunt"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "remembrance-trailblazer",
    "name": "Remembrance TB",
    "element": "Ice",
    "path": "Remembrance",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "Memosprite",
      "True DMG Amplifier",
      "Crit Rate Amplifier",
      "Crit DMG Amplifier",
      "Mem",
      "F2P"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "tribbie",
    "name": "Tribbie",
    "element": "Quantum",
    "path": "Harmony",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Buffer"
    ],
    "labels": [
      "All-Type RES PEN Amplifier",
      "Increase DMG Taken by enemies",
      "Follow-up ATK",
      "HP Scaling "
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "cipher",
    "name": "Cipher",
    "element": "Quantum",
    "path": "Hunt",
    "rarity": 5,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "Debuffer"
    ],
    "labels": [
      "Follow-up Attack",
      "Reduce Enemy DMG Done",
      "Vulnerability",
      "True Damage"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "feixiao",
          "acheron"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from follow-up attacks and constant Debuffs Application"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "guinaifen",
    "name": "Guinaifen",
    "element": "Fire",
    "path": "Nihility",
    "rarity": 4,
    "roles": [
      "SUPPORT"
    ],
    "archetype": [
      "DoT, Debuffer"
    ],
    "labels": [
      "DoT",
      "Burn",
      "F2P",
      "Firekiss",
      "Increase DMG to Burned Enemies"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "acheron",
          "kafka"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from DoT and constant Debuffs Application"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "gepard",
    "name": "Gepard",
    "element": "Ice",
    "path": "Preservation",
    "rarity": 5,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Shielder"
    ],
    "labels": [
      "AoE Shield",
      "Freeze",
      "Self Revive",
      "Self Taunt",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "acheron",
          "yanqing"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from Shields, Evade Aggro and constant Debuffs Application with Trend of the Universal Market Lightcone"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "fu-xuan",
    "name": "Fu Xuan",
    "element": "Quantum",
    "path": "Preservation",
    "rarity": 5,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Damage Distribution"
    ],
    "labels": [
      "Heal Allies on Ultimate",
      "Damage Distribution",
      "HP Scaling",
      "Crit Rate Amplifier",
      "Self Heal",
      "Crowd Control Immunity on Skill",
      "Allies DMG Reduction"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "acheron",
          "archer",
          "yunli"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from Crit Rate Buffs,DMG Reduction and constant Debuffs Application with Trend of the Universal Market Lightcone"
        ],
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
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Shielder"
    ],
    "labels": [
      "Single Target Shield",
      "Freeze",
      "Counter",
      "F2P",
      "Taunt on Skill"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "acheron"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from Shields, Follow-ups and constant Debuffs Application with Trend of the Universal Market Lightcone"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "fire-trailblazer",
    "name": "Fire TB",
    "element": "Fire",
    "path": "Preservation",
    "rarity": 5,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Shielder"
    ],
    "labels": [
      "AoE Shield",
      "Allies DMG Reduction",
      "Self Taunt",
      "Self Heal",
      "Self Shield",
      "Enhanced Basic Attack",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "acheron"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from Shields and constant Debuffs Application with Trend of the Universal Market Lightcone"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "natasha",
    "name": "Natasha",
    "element": "Physical",
    "path": "Abundance",
    "rarity": 4,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Healer"
    ],
    "labels": [
      "Heal on Skill and Ultimate",
      "Cleanse on Skill",
      "F2P"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [],
        "generalist": [
          "Any DPS as long as they can benefit from Healing and Cleanse"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "bailu",
    "name": "Bailu",
    "element": "Lightning",
    "path": "Abundance",
    "rarity": 5,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Healer"
    ],
    "labels": [
      "Bounce Heal",
      "Heal on Ultimate",
      "Revive",
      "Invigoration",
      "Allies DMG Reduction"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [],
        "generalist": [
          "Any DPS as long as they can benefit from Healing"
        ],
        "f2p": []
      }
    ],
    "teamCompositions": []
  },
  {
    "id": "luocha",
    "name": "Luocha",
    "element": "Imaginary",
    "path": "Abundance",
    "rarity": 5,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Healer"
    ],
    "labels": [
      "Auto Heal",
      "Cleanse on Direct Heal",
      "Remove Enemy Buffs on Ultimate",
      "Deploys Heal Field"
    ],
    "teammateRecommendations": [
      {
        "name": "DPS",
        "bis": [
          "castorice"
        ],
        "generalist": [
          "Any DPS as long as they can benefit from Healing and Auto Heals when HP is low"
        ],
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
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Healer"
    ],
    "labels": [
      "Energy Recovery",
      "Cleanse on Heal",
      "Blast Heal",
      "Attack Amplifier",
      "Cleanse on Skill"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "lynx",
    "name": "Lynx",
    "element": "Quantum",
    "path": "Abundance",
    "rarity": 4,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Healer"
    ],
    "labels": [
      "Taunt on Skill (Destruction & Preservation)",
      "Healing over time",
      "Cleanse on Ultimate",
      "F2P"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "gallagher",
    "name": "Gallagher",
    "element": "Fire",
    "path": "Abundance",
    "rarity": 4,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Healer"
    ],
    "labels": [
      "Self Action Advance",
      "Break DMG Amplifier",
      "Reduce Enemies Attack",
      "Besotted",
      "Enchanced Basic Attack",
      "Cleanse on Skill",
      "F2P",
      "Best 4 Star"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "lingsha",
    "name": "Lingsha",
    "element": "Fire",
    "path": "Abundance",
    "rarity": 5,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Healer"
    ],
    "labels": [
      "Action Advance Pet",
      "Break DMG Amplifier",
      "Pet",
      "Follow-up Attack",
      " Heal on Follow-up Attack"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "aventurine",
    "name": "Aventurine",
    "element": "Imaginary",
    "path": "Preservation",
    "rarity": 5,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Shielder"
    ],
    "labels": [
      "Shield on Skill",
      "Shield on Follow-up Attack",
      "Effect RES Amplifier",
      "Unnerved - Enemies take Increased Crit DMG on Ultimate",
      "Stackable Shield",
      "Self Crit Rate Buff"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  },
  {
    "id": "hyacine",
    "name": "Hyacine",
    "element": "Wind",
    "path": "Remembrance",
    "rarity": 5,
    "roles": [
      "SUSTAIN"
    ],
    "archetype": [
      "Healer"
    ],
    "labels": [
      "Fat Fuck",
      "HP Scaling",
      "Memosprite",
      "Memosprite Immune to Crowd Control",
      "Cleanse on Skill and Ultimate"
    ],
    "teammateRecommendations": [],
    "teamCompositions": []
  }
];