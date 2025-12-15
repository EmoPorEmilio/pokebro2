import { createFileRoute, useNavigate } from '@tanstack/solid-router'
import { createSignal, createEffect, onMount, onCleanup, Show } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import { Header, Content, Pokemon, Options, YouLose, Error, BottomNav } from '@/components'
import {
  generateRandomAvailablePokemonNumber,
  randomizePokemonList,
  padScorePoints,
  type Pokemon as PokemonType,
} from '@/lib/utils'
import {
  fetchMultiplePokemonInfoFn,
  fetchPokemonImageFn,
  pokemonKeys,
} from '@/lib/queries'
import {
  MAX_POKES,
  GAME_STATES,
  DIFFICULTY_LEVELS,
  GAME_MODES,
  TIMER_INITIAL_VALUE,
  type GameState,
} from '@/lib/constants'

export const Route = createFileRoute('/pokemon-guesser')({
  component: PokemonGuesser,
})

function PokemonGuesser() {
  const navigate = useNavigate()

  const getStateFromStorage = () => {
    if (typeof window === 'undefined') {
      return {
        availablePokes: [],
        scorePoints: '000',
        HP: 3,
        currentPokemon: null,
        currentPokemonSrc: null,
        pokemonNameOptions: [],
        level: 0,
        gameState: GAME_STATES.LEVEL_SETUP as GameState,
        timer: TIMER_INITIAL_VALUE,
      }
    }
    return {
      availablePokes: JSON.parse(localStorage.getItem('availablePokes') ?? '[]'),
      scorePoints: localStorage.getItem('scorePoints') ?? '000',
      HP: parseInt(localStorage.getItem('HP') ?? '3'),
      currentPokemon: JSON.parse(localStorage.getItem('currentPokemon') ?? 'null'),
      currentPokemonSrc: localStorage.getItem('currentPokemonSrc') ?? null,
      pokemonNameOptions: JSON.parse(localStorage.getItem('pokemonNameOptions') ?? '[]'),
      level: parseInt(localStorage.getItem('level') ?? '0'),
      gameState: (localStorage.getItem('gameState') ?? GAME_STATES.LEVEL_SETUP) as GameState,
      timer: parseInt(localStorage.getItem('timer') ?? String(TIMER_INITIAL_VALUE)),
    }
  }

  const stateFromStorage = getStateFromStorage()

  const [timer, setTimer] = createSignal(stateFromStorage.timer)
  const [HP, setHP] = createSignal(stateFromStorage.HP)
  const [scorePoints, setScorePoints] = createSignal(stateFromStorage.scorePoints)
  const [level, setLevel] = createSignal(stateFromStorage.level)
  const [gameState, setGameState] = createSignal<GameState>(stateFromStorage.gameState)
  const [errorMessage, setErrorMessage] = createSignal('')
  const [availablePokes, setAvailablePokes] = createSignal<number[]>(stateFromStorage.availablePokes)
  const [currentPokemon, setCurrentPokemon] = createSignal<PokemonType | null>(stateFromStorage.currentPokemon)
  const [currentPokemonSrc, setCurrentPokemonSrc] = createSignal<string | null>(stateFromStorage.currentPokemonSrc)
  const [pokemonNameOptions, setPokemonNameOptions] = createSignal<PokemonType[]>(stateFromStorage.pokemonNameOptions)

  // Pokemon numbers to fetch for current level
  const [currentLevelPokemonNumbers, setCurrentLevelPokemonNumbers] = createSignal<number[]>([])
  const [indexToRemove, setIndexToRemove] = createSignal<number | null>(null)

  let timerCountdown: ReturnType<typeof setInterval> | null = null

  // Query for fetching pokemon info (names)
  const pokemonInfoQuery = createQuery(() => ({
    queryKey: pokemonKeys.batch(currentLevelPokemonNumbers()),
    queryFn: () => fetchMultiplePokemonInfoFn(currentLevelPokemonNumbers()),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    enabled: currentLevelPokemonNumbers().length > 0 && gameState() === GAME_STATES.LEVEL_SETUP,
    retry: 3,
  }))

  // Query for fetching pokemon image
  const pokemonImageQuery = createQuery(() => ({
    queryKey: pokemonKeys.image(currentLevelPokemonNumbers()[0] ?? 0),
    queryFn: () => fetchPokemonImageFn(currentLevelPokemonNumbers()[0]),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    enabled: currentLevelPokemonNumbers().length > 0 && gameState() === GAME_STATES.LEVEL_SETUP,
    retry: 3,
  }))

  const handleHeaderBack = () => {
    navigate({ to: '/' })
  }

  const handleAppTap = () => {
    if (gameState() === GAME_STATES.VALIDATION) {
      removePokemonsFromGameState()
      setGameState(GAME_STATES.LEVEL_SETUP)
      localStorage.setItem('gameState', GAME_STATES.LEVEL_SETUP)
    }
  }

  const handleClickOption = (pokemon: PokemonType) => {
    setLevel((prevLevel) => {
      const newLevel = prevLevel + 1
      localStorage.setItem('level', String(newLevel))
      return newLevel
    })
    if (currentPokemon()?.name === pokemon.name) {
      handleCorrectOption()
    } else {
      removeLevelInfoFromStorage()
      handleIncorrectOption()
    }
  }

  const handleCorrectOption = () => {
    removePokemonsFromGameState()
    setScorePoints((prevScorePoints) => {
      const newScorePoints = padScorePoints(parseInt(prevScorePoints) + 1)
      localStorage.setItem('scorePoints', newScorePoints)
      return newScorePoints
    })
    setGameState(GAME_STATES.LEVEL_SETUP)
  }

  const loseGame = () => {
    if (timerCountdown) clearInterval(timerCountdown)
    setGameState(GAME_STATES.YOU_LOSE)
  }

  const handleIncorrectOption = () => {
    setHP((prevHP) => {
      const newHP = prevHP - 1
      localStorage.setItem('HP', String(newHP))
      if (newHP === 0) {
        loseGame()
      } else {
        setGameState(GAME_STATES.VALIDATION)
      }
      return newHP
    })
  }

  const restartGame = () => {
    setLevel(0)
    setHP(3)
    setTimer(TIMER_INITIAL_VALUE)
    startTimerCountdown()
    setScorePoints('000')
    setAvailablePokes([])
    setCurrentLevelPokemonNumbers([])
    setGameState(GAME_STATES.LEVEL_SETUP)
  }

  const initiateLevelFetch = (firstSetup: boolean) => {
    const availableNumbers = firstSetup ? getInitialAvailablePokes() : availablePokes()
    const { randomPokemonNumbers, indexToRemove: idx } = generateRandomAvailablePokemonNumber(
      availableNumbers,
      5
    )
    setCurrentLevelPokemonNumbers(randomPokemonNumbers)
    setIndexToRemove(idx)

    if (firstSetup) {
      setAvailablePokes(availableNumbers)
    }
  }

  const saveGameStateToStorage = (
    newAvailableNumbers: number[],
    pokemonToGuess: PokemonType,
    imgSrc: string,
    newPokemons: PokemonType[]
  ) => {
    localStorage.setItem('availablePokes', JSON.stringify(newAvailableNumbers))
    localStorage.setItem('scorePoints', scorePoints())
    localStorage.setItem('HP', String(HP()))
    localStorage.setItem('currentPokemon', JSON.stringify(pokemonToGuess))
    localStorage.setItem('currentPokemonSrc', imgSrc)
    localStorage.setItem('pokemonNameOptions', JSON.stringify(newPokemons))
    localStorage.setItem('level', String(level()))
    localStorage.setItem('gameState', GAME_STATES.LEVEL_INFO)
  }

  const removePokemonsFromGameState = () => {
    setCurrentPokemon(null)
    setCurrentPokemonSrc(null)
    setPokemonNameOptions([])
    setCurrentLevelPokemonNumbers([])
  }

  const removeLevelInfoFromStorage = () => {
    localStorage.removeItem('gameState')
    localStorage.removeItem('currentPokemon')
    localStorage.removeItem('currentPokemonSrc')
    localStorage.removeItem('pokemonNameOptions')
  }

  const removeGameStateFromStorage = () => {
    localStorage.removeItem('availablePokes')
    localStorage.removeItem('scorePoints')
    localStorage.removeItem('HP')
    removeLevelInfoFromStorage()
    localStorage.removeItem('level')
    localStorage.removeItem('timer')
  }

  const updateAvailables = (availableNumbers: number[], idx: number) => {
    const newAvailable = [...availableNumbers]
    newAvailable.splice(idx, 1)
    setAvailablePokes(newAvailable)
    return newAvailable
  }

  const getInitialAvailablePokes = () => {
    const availableNumbers: number[] = []
    for (let i = 1; i <= MAX_POKES; i++) {
      availableNumbers.push(i)
    }
    return availableNumbers
  }

  const handleTimerCountdownInterval = () => {
    setTimer((currentTimer) => {
      const newTimer = currentTimer - 1
      if (newTimer <= 0) {
        loseGame()
      } else {
        localStorage.setItem('timer', String(newTimer))
      }
      return newTimer
    })
  }

  const startTimerCountdown = () => {
    timerCountdown = setInterval(handleTimerCountdownInterval, 1000)
  }

  // Effect to initiate level fetch when in LEVEL_SETUP state
  createEffect(() => {
    const state = gameState()
    if (state === GAME_STATES.LEVEL_SETUP && currentLevelPokemonNumbers().length === 0) {
      const isSetup = level() === 0
      initiateLevelFetch(isSetup)
    } else if (state === GAME_STATES.YOU_LOSE) {
      removeGameStateFromStorage()
    }
  })

  // Effect to process query results when both queries succeed
  createEffect(() => {
    const infoData = pokemonInfoQuery.data
    const imageData = pokemonImageQuery.data
    const infoSuccess = pokemonInfoQuery.isSuccess
    const imageSuccess = pokemonImageQuery.isSuccess
    const state = gameState()

    if (state === GAME_STATES.LEVEL_SETUP && infoSuccess && imageSuccess && infoData && imageData) {
      if (infoData.length >= 5) {
        const pokemonToGuess = infoData[0]
        setCurrentPokemon(pokemonToGuess)
        setCurrentPokemonSrc(imageData)

        const randomizedOptions = randomizePokemonList(infoData)
        setPokemonNameOptions(randomizedOptions)

        const idx = indexToRemove()
        if (idx !== null) {
          const newAvailableNumbers = updateAvailables(availablePokes(), idx)
          saveGameStateToStorage(newAvailableNumbers, pokemonToGuess, imageData, randomizedOptions)
        }

        setGameState(GAME_STATES.LEVEL_INFO)
      }
    }
  })

  // Effect to handle query errors
  createEffect(() => {
    if (pokemonInfoQuery.isError) {
      setErrorMessage('Failed to load Pokemon data. Please refresh and try again.')
    }
    if (pokemonImageQuery.isError) {
      setErrorMessage('Failed to load Pokemon image. Please refresh and try again.')
    }
  })

  onMount(() => {
    startTimerCountdown()
  })

  onCleanup(() => {
    if (timerCountdown) clearInterval(timerCountdown)
  })

  const isLoading = () =>
    gameState() === GAME_STATES.LEVEL_SETUP ||
    pokemonInfoQuery.isPending ||
    pokemonImageQuery.isPending

  return (
    <div class="flex flex-col h-[100dvh] w-[100dvw] bg-bg-400 antialiased">
      <Header
        handleHeaderBack={handleHeaderBack}
        inGame={true}
        HP={HP()}
        scorePoints={scorePoints()}
        timer={timer()}
      />
      <Content onClick={handleAppTap}>
        <Show
          when={gameState() !== GAME_STATES.YOU_LOSE}
          fallback={
            <YouLose
              scorePoints={scorePoints()}
              difficulty={DIFFICULTY_LEVELS.HARD}
              gameMode={GAME_MODES.POKEMON_GUESSER}
              restartGame={restartGame}
            />
          }
        >
          <Show
            when={!errorMessage()}
            fallback={<Error message={errorMessage()} />}
          >
            <Pokemon
              loading={isLoading()}
              pokemonSrc={currentPokemonSrc()}
            />
            <Options
              correctNameOption={currentPokemon()?.name}
              validation={gameState() === GAME_STATES.VALIDATION}
              loading={isLoading()}
              handleClickOption={handleClickOption}
              pokemonNameOptions={pokemonNameOptions()}
            />
          </Show>
        </Show>
      </Content>
      <BottomNav activeTab="game" />
    </div>
  )
}
