import { createFileRoute } from '@tanstack/solid-router'
import { createSignal, createEffect, onMount, onCleanup, Show } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import { Header, Content, Pokemon, Options, YouLose, Error, BottomNav, type FlashState } from '@/components'
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
  // Always start fresh - no localStorage persistence
  const [timer, setTimer] = createSignal(TIMER_INITIAL_VALUE)
  const [HP, setHP] = createSignal(3)
  const [scorePoints, setScorePoints] = createSignal('000')
  const [level, setLevel] = createSignal(0)
  const [gameState, setGameState] = createSignal<GameState>(GAME_STATES.LEVEL_SETUP)
  const [errorMessage, setErrorMessage] = createSignal('')
  const [availablePokes, setAvailablePokes] = createSignal<number[]>([])
  const [currentPokemon, setCurrentPokemon] = createSignal<PokemonType | null>(null)
  const [currentPokemonSrc, setCurrentPokemonSrc] = createSignal<string | null>(null)
  const [pokemonNameOptions, setPokemonNameOptions] = createSignal<PokemonType[]>([])
  const [showCorrect, setShowCorrect] = createSignal(false)
  const [showIncorrect, setShowIncorrect] = createSignal(false)
  const [flashState, setFlashState] = createSignal<FlashState>('none')

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

  const handleAppTap = () => {
    if (gameState() === GAME_STATES.VALIDATION) {
      removePokemonsFromGameState()
      setGameState(GAME_STATES.LEVEL_SETUP)
    }
  }

  const handleClickOption = (pokemon: PokemonType) => {
    setLevel((prevLevel) => prevLevel + 1)
    if (currentPokemon()?.name === pokemon.name) {
      handleCorrectOption()
    } else {
      handleIncorrectOption()
    }
  }

  const handleCorrectOption = () => {
    setShowCorrect(true)
    setFlashState('correct')
    setScorePoints((prevScorePoints) => {
      return padScorePoints(parseInt(prevScorePoints) + 1)
    })

    // Show correct stars briefly before moving to next level
    setTimeout(() => {
      setShowCorrect(false)
      setFlashState('none')
      removePokemonsFromGameState()
      setGameState(GAME_STATES.LEVEL_SETUP)
    }, 800)
  }

  const loseGame = () => {
    if (timerCountdown) clearInterval(timerCountdown)
    setGameState(GAME_STATES.YOU_LOSE)
  }

  const handleIncorrectOption = () => {
    setShowIncorrect(true)
    setFlashState('incorrect')
    setTimeout(() => {
      setShowIncorrect(false)
      setFlashState('none')
    }, 800)

    setHP((prevHP) => {
      const newHP = prevHP - 1
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

  const removePokemonsFromGameState = () => {
    setCurrentPokemon(null)
    setCurrentPokemonSrc(null)
    setPokemonNameOptions([])
    setCurrentLevelPokemonNumbers([])
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
          updateAvailables(availablePokes(), idx)
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
    <div class="flex flex-col h-dvh w-dvw bg-bg-400 antialiased">
      <Header
        inGame={true}
        HP={HP()}
        scorePoints={scorePoints()}
        timer={timer()}
      />
      <Content onClick={handleAppTap} flashState={flashState()}>
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
              flashState={flashState()}
            />
            <Options
              correctNameOption={currentPokemon()?.name}
              validation={gameState() === GAME_STATES.VALIDATION}
              loading={isLoading()}
              handleClickOption={handleClickOption}
              pokemonNameOptions={pokemonNameOptions()}
              showCorrect={showCorrect()}
              showIncorrect={showIncorrect()}
            />
          </Show>
        </Show>
      </Content>
      <BottomNav activeTab="game" />
    </div>
  )
}
