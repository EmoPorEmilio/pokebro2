import { createFileRoute, useNavigate } from '@tanstack/solid-router'
import { createSignal, createEffect, onMount, onCleanup, Show } from 'solid-js'
import { Header, Content, Types, TypeEffectivenessOptions, YouLose, Error, BottomNav } from '@/components'
import {
  generateRandomAvailableTypeCombination,
  getTypesCombinationDamageCorrectOption,
  padScorePoints,
} from '@/lib/utils'
import { types } from '@/data/types'
import {
  GAME_STATES,
  TYPE_EFFECTIVENESS_OPTION,
  DIFFICULTY_LEVELS,
  GAME_MODES,
  TIMER_INITIAL_VALUE,
  type GameState,
  type DifficultyLevel,
} from '@/lib/constants'

export const Route = createFileRoute('/damage-calculator')({
  component: DamageCalculator,
})

function DamageCalculator() {
  const navigate = useNavigate()

  const initState = () => ({
    HP: 3,
    scorePoints: '000',
    level: 0,
    difficulty: null as DifficultyLevel | null,
    gameState: GAME_STATES.SELECT_DIFFICULTY as GameState,
    availableLevelCombinations: [] as [number, number, number | null][],
    currentTypesCombination: [0, 0, null] as [number, number, number | null],
    correctOption: null as string | null,
    timer: TIMER_INITIAL_VALUE,
  })

  const stateFromStorage = initState()

  const [HP, setHP] = createSignal(stateFromStorage.HP)
  const [scorePoints, setScorePoints] = createSignal(stateFromStorage.scorePoints)
  const [level, setLevel] = createSignal(stateFromStorage.level)
  const [timer, setTimer] = createSignal(stateFromStorage.timer)
  const [gameState, setGameState] = createSignal<GameState>(stateFromStorage.gameState)
  const [difficulty, setDifficulty] = createSignal<DifficultyLevel | null>(stateFromStorage.difficulty)
  const [errorMessage, setErrorMessage] = createSignal('')
  const [availableLevelCombinations, setAvailableLevelCombinations] = createSignal<[number, number, number | null][]>(
    stateFromStorage.availableLevelCombinations
  )
  const [currentTypesCombination, setCurrentTypesCombination] = createSignal<[number, number, number | null]>(
    stateFromStorage.currentTypesCombination
  )
  const [correctOption, setCorrectOption] = createSignal<string | null>(stateFromStorage.correctOption)

  let timerCountdown: ReturnType<typeof setInterval> | null = null

  const handleHeaderBack = () => {
    navigate({ to: '/' })
  }

  const handleAppTap = () => {
    if (gameState() === GAME_STATES.VALIDATION) {
      removeTypesFromGameState()
      setGameState(GAME_STATES.LEVEL_SETUP)
    }
  }

  const handleClickOption = (option: string) => {
    setLevel((prevLevel) => prevLevel + 1)
    if (correctOption() === option) {
      handleCorrectOption()
    } else {
      handleIncorrectOption()
    }
  }

  const handleCorrectOption = () => {
    removeTypesFromGameState()
    setScorePoints((prevScorePoints) => {
      const newScorePoints = padScorePoints(parseInt(prevScorePoints) + 1)
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
    setScorePoints('000')
    setGameState(GAME_STATES.SELECT_DIFFICULTY)
  }

  const removeTypesFromGameState = () => {
    setCurrentTypesCombination([0, 0, null])
    setCorrectOption(null)
  }

  const loadNewLevel = async (firstSetup: boolean) => {
    let availableTypeCombinations = firstSetup
      ? getInitialAvailableTypeCombinations()
      : availableLevelCombinations()

    const { randomTypeCombination, randomTypeIndex } =
      generateRandomAvailableTypeCombination(availableTypeCombinations)

    setCurrentTypesCombination(randomTypeCombination)
    setCorrectOption(getTypesCombinationDamageCorrectOption(randomTypeCombination))
    setGameState(GAME_STATES.LEVEL_INFO)

    const newAvailableNumbers = updateAvailables(availableTypeCombinations, randomTypeIndex)
  }

  const updateAvailables = (availableTypeCombinations: [number, number, number | null][], indexToRemove: number) => {
    const newCombinations = [...availableTypeCombinations]
    newCombinations.splice(indexToRemove, 1)
    setAvailableLevelCombinations(newCombinations)
    return newCombinations
  }

  const getInitialAvailableTypeCombinations = (): [number, number, number | null][] => {
    const availableNumbers: [number, number, number | null][] = []
    const diff = difficulty()

    if (diff === DIFFICULTY_LEVELS.HARD) {
      for (let attack = 0; attack < types.length; attack++) {
        for (let firstDefense = 0; firstDefense < types.length; firstDefense++) {
          for (let secondDefense = firstDefense + 1; secondDefense < types.length; secondDefense++) {
            availableNumbers.push([attack, firstDefense, secondDefense])
          }
        }
      }
    } else if (diff === DIFFICULTY_LEVELS.EASY) {
      for (let attack = 0; attack < types.length; attack++) {
        for (let firstDefense = 0; firstDefense < types.length; firstDefense++) {
          availableNumbers.push([attack, firstDefense, null])
        }
      }
    }
    return availableNumbers
  }

  const easyOptions = () => [
    TYPE_EFFECTIVENESS_OPTION.NO_DAMAGE,
    TYPE_EFFECTIVENESS_OPTION.HALF_DAMAGE,
    TYPE_EFFECTIVENESS_OPTION.REGULAR_DAMAGE,
    TYPE_EFFECTIVENESS_OPTION.DOUBLE_DAMAGE,
  ]

  const hardOptions = () => [
    TYPE_EFFECTIVENESS_OPTION.NO_DAMAGE,
    TYPE_EFFECTIVENESS_OPTION.QUARTER_DAMAGE,
    TYPE_EFFECTIVENESS_OPTION.HALF_DAMAGE,
    TYPE_EFFECTIVENESS_OPTION.REGULAR_DAMAGE,
    TYPE_EFFECTIVENESS_OPTION.DOUBLE_DAMAGE,
    TYPE_EFFECTIVENESS_OPTION.QUADRUPLE_DAMAGE,
  ]

  const getOptions = () => {
    return difficulty() === DIFFICULTY_LEVELS.EASY ? easyOptions() : hardOptions()
  }

  const goToGame = (selectedDifficulty: DifficultyLevel) => {
    setDifficulty(selectedDifficulty)
    setGameState(GAME_STATES.LEVEL_SETUP)
    startTimerCountdown()
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

  createEffect(() => {
    const diff = difficulty()
    const state = gameState()

    if (diff) {
      switch (state) {
        case GAME_STATES.LEVEL_SETUP:
          const isSetup = level() === 0
          loadNewLevel(isSetup)
          break
        case GAME_STATES.LEVEL_INFO:
          break
        case GAME_STATES.VALIDATION:
          break
        case GAME_STATES.YOU_LOSE:
          break
      }
    }
  })

  onCleanup(() => {
    if (timerCountdown) clearInterval(timerCountdown)
  })

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
              difficulty={difficulty()!}
              gameMode={GAME_MODES.DAMAGE_CALCULATOR}
              restartGame={restartGame}
            />
          }
        >
          <Show
            when={!errorMessage()}
            fallback={<Error message={errorMessage()} />}
          >
            <Show
              when={gameState() !== GAME_STATES.SELECT_DIFFICULTY}
              fallback={<DifficultySelector goToGame={goToGame} />}
            >
              <Types
                typesCombinations={currentTypesCombination()}
                loading={gameState() === GAME_STATES.LEVEL_SETUP}
              />
              <TypeEffectivenessOptions
                correctOption={correctOption()}
                validation={gameState() === GAME_STATES.VALIDATION}
                loading={gameState() === GAME_STATES.LEVEL_SETUP}
                handleClickOption={handleClickOption}
                options={getOptions()}
              />
            </Show>
          </Show>
        </Show>
      </Content>
      <BottomNav activeTab="game" />
    </div>
  )
}

interface DifficultySelectorProps {
  goToGame: (difficulty: DifficultyLevel) => void
}

function DifficultySelector(props: DifficultySelectorProps) {
  return (
    <div class="flex flex-col w-[80vw] max-w-[350px] justify-center items-center gap-4">
      <button
        class="flex justify-center items-center rounded-lg min-h-[60px] w-full bg-cards-bg border-accent-200 border border-solid text-accent text-center font-bold text-xl hover:cursor-pointer hover:bg-accent hover:border-white hover:text-cards-bg transition-colors"
        onClick={() => props.goToGame(DIFFICULTY_LEVELS.EASY)}
      >
        <span>{DIFFICULTY_LEVELS.EASY}</span>
      </button>
      <button
        class="flex justify-center items-center rounded-lg min-h-[60px] w-full bg-cards-bg border-accent-200 border border-solid text-accent text-center font-bold text-xl hover:cursor-pointer hover:bg-accent hover:border-white hover:text-cards-bg transition-colors"
        onClick={() => props.goToGame(DIFFICULTY_LEVELS.HARD)}
      >
        <span>{DIFFICULTY_LEVELS.HARD}</span>
      </button>
    </div>
  )
}
