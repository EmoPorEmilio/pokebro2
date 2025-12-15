import { ssr, ssrHydrationKey, ssrAttribute, escape } from "solid-js/web";
import { createSignal, onMount } from "solid-js";
import { t as theme, S as SYSTEM_MESSAGES, b as TYPE_EFFECTIVENESS_OPTION } from "./constants-PeIAwcan.js";
const types = [
  {
    id: 1,
    name: "normal",
    printName: "NORMAL",
    color: "bg-[#A8A878]",
    damage_relations: {
      double_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        }
      ],
      double_damage_to: [],
      half_damage_from: [],
      half_damage_to: [
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        }
      ],
      no_damage_from: [
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        }
      ],
      no_damage_to: [
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        }
      ]
    }
  },
  {
    id: 2,
    name: "fighting",
    printName: "LUCHA",
    color: "bg-[#C03028]",
    damage_relations: {
      double_damage_from: [
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      double_damage_to: [
        {
          name: "normal",
          url: "https://pokeapi.co/api/v2/type/1/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        },
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        }
      ],
      half_damage_from: [
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        }
      ],
      half_damage_to: [
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      no_damage_from: [],
      no_damage_to: [
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        }
      ]
    }
  },
  {
    id: 3,
    name: "flying",
    printName: "VOLADOR",
    color: "bg-[#a890f0]",
    damage_relations: {
      double_damage_from: [
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        }
      ],
      double_damage_to: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        }
      ],
      half_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        }
      ],
      half_damage_to: [
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        }
      ],
      no_damage_from: [
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        }
      ],
      no_damage_to: []
    }
  },
  {
    id: 4,
    name: "poison",
    printName: "VENENO",
    color: "bg-[#a040a0]",
    damage_relations: {
      double_damage_from: [
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        }
      ],
      double_damage_to: [
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      half_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      half_damage_to: [
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        }
      ],
      no_damage_from: [],
      no_damage_to: [
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        }
      ]
    }
  },
  {
    id: 5,
    name: "ground",
    printName: "TIERRA",
    color: "bg-[#e0c068]",
    damage_relations: {
      double_damage_from: [
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        }
      ],
      double_damage_to: [
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        }
      ],
      half_damage_from: [
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        }
      ],
      half_damage_to: [
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        }
      ],
      no_damage_from: [
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        }
      ],
      no_damage_to: [
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        }
      ]
    }
  },
  {
    id: 6,
    name: "rock",
    printName: "ROCA",
    color: "bg-[#b8a038]",
    damage_relations: {
      double_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        }
      ],
      double_damage_to: [
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        }
      ],
      half_damage_from: [
        {
          name: "normal",
          url: "https://pokeapi.co/api/v2/type/1/"
        },
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        }
      ],
      half_damage_to: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        }
      ],
      no_damage_from: [],
      no_damage_to: []
    }
  },
  {
    id: 7,
    name: "bug",
    printName: "BICHO",
    color: "bg-[#a8b820]",
    damage_relations: {
      double_damage_from: [
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        }
      ],
      double_damage_to: [
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        },
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        }
      ],
      half_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        }
      ],
      half_damage_to: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      no_damage_from: [],
      no_damage_to: []
    }
  },
  {
    id: 8,
    name: "ghost",
    printName: "FANTASMA",
    color: "bg-[#705898]",
    damage_relations: {
      double_damage_from: [
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        },
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        }
      ],
      double_damage_to: [
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        },
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        }
      ],
      half_damage_from: [
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        }
      ],
      half_damage_to: [
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        }
      ],
      no_damage_from: [
        {
          name: "normal",
          url: "https://pokeapi.co/api/v2/type/1/"
        },
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        }
      ],
      no_damage_to: [
        {
          name: "normal",
          url: "https://pokeapi.co/api/v2/type/1/"
        }
      ]
    }
  },
  {
    id: 9,
    name: "steel",
    printName: "ACERO",
    color: "bg-[#b8b8d0]",
    damage_relations: {
      double_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        }
      ],
      double_damage_to: [
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      half_damage_from: [
        {
          name: "normal",
          url: "https://pokeapi.co/api/v2/type/1/"
        },
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        },
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      half_damage_to: [
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        },
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        }
      ],
      no_damage_from: [
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        }
      ],
      no_damage_to: []
    }
  },
  {
    id: 10,
    name: "fire",
    printName: "FUEGO",
    color: "bg-[#f08030]",
    damage_relations: {
      double_damage_from: [
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        }
      ],
      double_damage_to: [
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        }
      ],
      half_damage_from: [
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      half_damage_to: [
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        },
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        }
      ],
      no_damage_from: [],
      no_damage_to: []
    }
  },
  {
    id: 11,
    name: "water",
    printName: "AGUA",
    color: "bg-[#6890f0]",
    damage_relations: {
      double_damage_from: [
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        }
      ],
      double_damage_to: [
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        }
      ],
      half_damage_from: [
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        }
      ],
      half_damage_to: [
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        }
      ],
      no_damage_from: [],
      no_damage_to: []
    }
  },
  {
    id: 12,
    name: "grass",
    printName: "PLANTA",
    color: "bg-[#78c850]",
    damage_relations: {
      double_damage_from: [
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        }
      ],
      double_damage_to: [
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        }
      ],
      half_damage_from: [
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        }
      ],
      half_damage_to: [
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        }
      ],
      no_damage_from: [],
      no_damage_to: []
    }
  },
  {
    id: 13,
    name: "electric",
    printName: "ELÉCTRICO",
    color: "bg-[#f8d030]",
    damage_relations: {
      double_damage_from: [
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        }
      ],
      double_damage_to: [
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        }
      ],
      half_damage_from: [
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        }
      ],
      half_damage_to: [
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        },
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        }
      ],
      no_damage_from: [],
      no_damage_to: [
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        }
      ]
    }
  },
  {
    id: 14,
    name: "psychic",
    printName: "PSÍQUICO",
    color: "bg-[#f85888]",
    damage_relations: {
      double_damage_from: [
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        },
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        }
      ],
      double_damage_to: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        }
      ],
      half_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        }
      ],
      half_damage_to: [
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        }
      ],
      no_damage_from: [],
      no_damage_to: [
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        }
      ]
    }
  },
  {
    id: 15,
    name: "ice",
    printName: "HIELO",
    color: "bg-[#98d8d8]",
    damage_relations: {
      double_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "rock",
          url: "https://pokeapi.co/api/v2/type/6/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        }
      ],
      double_damage_to: [
        {
          name: "flying",
          url: "https://pokeapi.co/api/v2/type/3/"
        },
        {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        }
      ],
      half_damage_from: [
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        }
      ],
      half_damage_to: [
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        },
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        }
      ],
      no_damage_from: [],
      no_damage_to: []
    }
  },
  {
    id: 16,
    name: "dragon",
    printName: "DRAGÓN",
    color: "bg-[#7038f8]",
    damage_relations: {
      double_damage_from: [
        {
          name: "ice",
          url: "https://pokeapi.co/api/v2/type/15/"
        },
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      double_damage_to: [
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        }
      ],
      half_damage_from: [
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        },
        {
          name: "water",
          url: "https://pokeapi.co/api/v2/type/11/"
        },
        {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/"
        },
        {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/"
        }
      ],
      half_damage_to: [
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        }
      ],
      no_damage_from: [],
      no_damage_to: [
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ]
    }
  },
  {
    id: 17,
    name: "dark",
    printName: "SINIESTRO",
    color: "bg-[#705848]",
    damage_relations: {
      double_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      double_damage_to: [
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        },
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        }
      ],
      half_damage_from: [
        {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/8/"
        },
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        }
      ],
      half_damage_to: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        },
        {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/"
        }
      ],
      no_damage_from: [
        {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/"
        }
      ],
      no_damage_to: []
    }
  },
  {
    id: 18,
    name: "fairy",
    printName: "HADA",
    color: "bg-[#ee99ac]",
    damage_relations: {
      double_damage_from: [
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        }
      ],
      double_damage_to: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        },
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        }
      ],
      half_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/"
        },
        {
          name: "bug",
          url: "https://pokeapi.co/api/v2/type/7/"
        },
        {
          name: "dark",
          url: "https://pokeapi.co/api/v2/type/17/"
        }
      ],
      half_damage_to: [
        {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/"
        },
        {
          name: "steel",
          url: "https://pokeapi.co/api/v2/type/9/"
        },
        {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        }
      ],
      no_damage_from: [
        {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/"
        }
      ],
      no_damage_to: []
    }
  }
];
var _tmpl$$1 = ["<div", ' class="flex flex-col max-w-[80%] h-[68%] justify-center items-center text-accent"><div class="flex flex-col m-12 w-full justify-center content-center p-5 bg-cards-bg border-2 rounded-2xl border-solid border-accent"><img', ' alt="sad pikachu" class="w-full"></div><div class="flex"><button class="flex cursor-pointer m-2 p-2 text-accent text-2xl border-accent border-solid rounded-2xl border-2 hover:bg-accent hover:text-cards-bg">', '</button><button class="flex cursor-pointer m-2 p-2 text-accent text-2xl border-accent border-solid rounded-2xl border-2 hover:bg-accent hover:text-cards-bg">', '</button></div><canvas id="canvasToExport" class="absolute hidden" width="744" height="554"></canvas></div>'];
const pikachuSadGif = "/resources/pokemon-sad.gif";
const pikachuSadJPG = "/resources/pokemon-sad.jpg";
const shareTemplate = "/resources/share-template.png";
function YouLose(props) {
  const [pikachuSad, setPikachuSad] = createSignal(null);
  const shareStrokeColor = "#492635";
  onMount(() => {
    Math.random() >= 0.5 ? setPikachuSad(pikachuSadGif) : setPikachuSad(pikachuSadJPG);
    setupCanvas();
  });
  const setupCanvas = () => {
    const templateIMG = new Image();
    templateIMG.onload = () => {
      const canvas = document.getElementById("canvasToExport");
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      drawTemplate(context, templateIMG);
      drawGameMode(context);
      drawDifficulty(context);
      drawPoints(context);
    };
    templateIMG.src = shareTemplate;
  };
  const drawTemplate = (context, templateIMG) => {
    context.drawImage(templateIMG, 0, 0);
  };
  const drawGameMode = (context) => {
    context.fillStyle = theme["accent-highlight"];
    context.strokeStyle = shareStrokeColor;
    context.font = "normal 800 29px Jost";
    context.textAlign = "center";
    context.strokeText(props.gameMode, 220, 263);
    context.fillText(props.gameMode, 220, 263);
  };
  const drawDifficulty = (context) => {
    context.fillStyle = theme["accent-highlight"];
    context.strokeStyle = shareStrokeColor;
    context.font = "normal 800 29px Jost";
    context.textAlign = "center";
    context.strokeText(props.difficulty, 550, 263);
    context.fillText(props.difficulty, 550, 263);
  };
  const drawPoints = (context) => {
    context.fillStyle = theme.correct;
    context.font = "normal 800 120px Jost";
    context.textAlign = "center";
    context.fillText(props.scorePoints, 373, 415);
  };
  return ssr(_tmpl$$1, ssrHydrationKey(), ssrAttribute("src", escape(pikachuSad(), true) ?? "", false), escape(SYSTEM_MESSAGES.RETRY), escape(SYSTEM_MESSAGES.SHARE));
}
var _tmpl$ = ["<div", ' class="flex flex-col max-w-[80%] h-[68%] justify-center items-center text-accent"><div class="flex flex-col m-12 w-full justify-center content-center p-5 bg-cards-bg border-2 rounded-2xl border-solid border-accent"><span class="text-center">', "</span></div></div>"];
function Error(props) {
  return ssr(_tmpl$, ssrHydrationKey(), escape(props.message));
}
const generateRandomAvailablePokemonNumber = (availableNumbers, amount) => {
  const randomPokemonNumbers = [];
  let indexToRemove = null;
  while (randomPokemonNumbers.length < amount) {
    const randomPokeIndex = Math.floor(Math.random() * availableNumbers.length);
    indexToRemove = indexToRemove ?? randomPokeIndex;
    const randomPoke = availableNumbers[randomPokeIndex];
    if (!randomPokemonNumbers.includes(randomPoke)) {
      randomPokemonNumbers.push(randomPoke);
    }
  }
  return { randomPokemonNumbers, indexToRemove };
};
const randomizePokemonList = (pokemonList) => {
  const list = [...pokemonList];
  const randomizedPokemon = [];
  while (list.length) {
    const pokeToPick = Math.floor(Math.random() * list.length);
    randomizedPokemon.push(list.splice(pokeToPick, 1)[0]);
  }
  return randomizedPokemon;
};
const correctCapitalLetter = (name) => name.charAt(0).toUpperCase() + name.slice(1);
const blobToBase64 = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
      resolve(reader.result);
    };
  });
};
const padScorePoints = (intPoints) => {
  return intPoints.toString().padStart(3, "0");
};
const getTypesCombinationDamageCorrectOption = (typesCombination) => {
  var _a, _b, _c;
  let damageMultiplier = 100;
  const attackType = typesCombination[0];
  const firstDefense = typesCombination[1];
  const secondDefense = typesCombination[2];
  const damageRelations = types[attackType].damage_relations;
  const noDamageToList = damageRelations.no_damage_to;
  const halfDamageToList = damageRelations.half_damage_to;
  const doubleDamageToList = damageRelations.double_damage_to;
  for (const noDamage of noDamageToList) {
    if (noDamage.name === types[firstDefense].name || secondDefense !== null && noDamage.name === ((_a = types[secondDefense]) == null ? void 0 : _a.name)) {
      damageMultiplier = 0;
    }
  }
  for (const halfDamage of halfDamageToList) {
    if (halfDamage.name === types[firstDefense].name) {
      damageMultiplier = damageMultiplier / 2;
    }
    if (secondDefense !== null && halfDamage.name === ((_b = types[secondDefense]) == null ? void 0 : _b.name)) {
      damageMultiplier = damageMultiplier / 2;
    }
  }
  for (const doubleDamage of doubleDamageToList) {
    if (doubleDamage.name === types[firstDefense].name) {
      damageMultiplier = damageMultiplier * 2;
    }
    if (secondDefense !== null && doubleDamage.name === ((_c = types[secondDefense]) == null ? void 0 : _c.name)) {
      damageMultiplier = damageMultiplier * 2;
    }
  }
  switch (damageMultiplier) {
    case 0:
      return TYPE_EFFECTIVENESS_OPTION.NO_DAMAGE;
    case 25:
      return TYPE_EFFECTIVENESS_OPTION.QUARTER_DAMAGE;
    case 50:
      return TYPE_EFFECTIVENESS_OPTION.HALF_DAMAGE;
    case 100:
      return TYPE_EFFECTIVENESS_OPTION.REGULAR_DAMAGE;
    case 200:
      return TYPE_EFFECTIVENESS_OPTION.DOUBLE_DAMAGE;
    case 400:
      return TYPE_EFFECTIVENESS_OPTION.QUADRUPLE_DAMAGE;
    default:
      return TYPE_EFFECTIVENESS_OPTION.REGULAR_DAMAGE;
  }
};
const generateRandomAvailableTypeCombination = (availableTypeCombinations) => {
  const randomTypeIndex = Math.floor(Math.random() * availableTypeCombinations.length);
  const randomTypeCombination = availableTypeCombinations[randomTypeIndex];
  return { randomTypeCombination, randomTypeIndex };
};
export {
  Error as E,
  YouLose as Y,
  generateRandomAvailableTypeCombination as a,
  blobToBase64 as b,
  correctCapitalLetter as c,
  getTypesCombinationDamageCorrectOption as d,
  generateRandomAvailablePokemonNumber as g,
  padScorePoints as p,
  randomizePokemonList as r,
  types as t
};
