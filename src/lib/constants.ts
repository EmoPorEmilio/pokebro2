export const MAX_POKES = 898

export const MAX_TRIES_IF_ERROR = 5

export const ERROR_MESSAGES = {
  NO_POKEMON_IMAGE: 'El Pokémon está tímido y no sale :( Vuelve más tarde.',
  NO_POKEMON_NAMES:
    'Los Pokémon se liberaron y están causando estragos :( Vuelve más tarde.',
} as const

export const SYSTEM_MESSAGES = {
  RETRY: '¿Reintentar?',
  SHARE: 'Compartir',
  UNAVAILABLE: '¡Próximamente! :)',
} as const

export const TYPE_EFFECTIVENESS_OPTION = {
  QUARTER_DAMAGE: 'x1/4',
  HALF_DAMAGE: 'x1/2',
  NO_DAMAGE: 'x0',
  REGULAR_DAMAGE: 'x1',
  DOUBLE_DAMAGE: 'x2',
  QUADRUPLE_DAMAGE: 'x4',
} as const

export const GAME_STATES = {
  SELECT_DIFFICULTY: 'selectDifficulty',
  LEVEL_SETUP: 'setup',
  LEVEL_INFO: 'info',
  VALIDATION: 'validation',
  YOU_LOSE: 'youLose',
} as const

export const DIFFICULTY_LEVELS = {
  EASY: 'FÁCIL',
  HARD: 'DIFÍCIL',
} as const

export const GAME_MODES = {
  DAMAGE_CALCULATOR: '¿CUÁNTO PEGA ESO?',
  POKEMON_GUESSER: '¿QUIÉN ES ESE POKÉMON?',
} as const

export const TIMER_INITIAL_VALUE = 90

export const theme = {
  bg: '#202020',
  'bg-light': '#515151',
  accent: '#ebbed2',
  'accent-highlight': '#e2a2be',
  'cards-bg': '#373737',
  'cards-bg-load': '#484848',
  correct: '#83f1a7',
} as const

export type GameState = typeof GAME_STATES[keyof typeof GAME_STATES]
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[keyof typeof DIFFICULTY_LEVELS]
export type GameMode = typeof GAME_MODES[keyof typeof GAME_MODES]
export type TypeEffectivenessOption = typeof TYPE_EFFECTIVENESS_OPTION[keyof typeof TYPE_EFFECTIVENESS_OPTION]
