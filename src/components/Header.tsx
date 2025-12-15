import { Show } from 'solid-js'
import { useNavigate } from '@tanstack/solid-router'

interface HeaderProps {
  HP?: number
  scorePoints?: string
  maxScore?: string
  inGame: boolean
  timer?: number
}

export function Header(props: HeaderProps) {
  const navigate = useNavigate()

  return (
    <nav class="h-14 w-full">
      <div class="px-4 flex w-full mx-auto h-full items-center justify-between">
        <Logo onClick={() => navigate({ to: '/' })} />
        <Show when={props.inGame}>
          <ScoreDisplay
            scorePoints={props.scorePoints}
            maxScore={props.maxScore}
          />
          <GameStats HP={props.HP} timer={props.timer} />
        </Show>
        <Show when={!props.inGame}>
          <div />
        </Show>
      </div>
    </nav>
  )
}

interface LogoProps {
  onClick?: () => void
}

function Logo(props: LogoProps) {
  return (
    <button
      class="hover:opacity-80 transition-opacity"
      onClick={props.onClick}
    >
      <img src="/logo.svg" class="w-[41px] h-[41px]" alt="logo" />
    </button>
  )
}

interface ScoreDisplayProps {
  scorePoints?: string
  maxScore?: string
}

function ScoreDisplay(props: ScoreDisplayProps) {
  const scoreColor = () => {
    const current = parseInt(props.scorePoints ?? '0')
    const max = parseInt(props.maxScore ?? '1')
    if (max === 0) return 'text-accent-300'
    const ratio = current / max
    if (ratio < 0.3) return 'text-danger-400'
    if (ratio < 0.7) return 'text-warning-400'
    return 'text-success-400'
  }

  return (
    <div class="flex justify-center">
      <span class="block text-2xl text-accent-300">
        <span class={scoreColor()}>{props.scorePoints ?? '000'}</span>
        <Show when={props.maxScore}>
          /{props.maxScore}
        </Show>
      </span>
    </div>
  )
}

interface GameStatsProps {
  HP?: number
  timer?: number
}

function GameStats(props: GameStatsProps) {
  const heartIcon = '/resources/heart-icon.png'

  return (
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-1">
        <img
          alt="health"
          class={`w-5 h-5 ${(props.HP ?? 0) > 0 ? '' : 'opacity-20'}`}
          src={heartIcon}
        />
        <img
          alt="health"
          class={`w-5 h-5 ${(props.HP ?? 0) > 1 ? '' : 'opacity-20'}`}
          src={heartIcon}
        />
        <img
          alt="health"
          class={`w-5 h-5 ${(props.HP ?? 0) > 2 ? '' : 'opacity-20'}`}
          src={heartIcon}
        />
      </div>
      <span class="text-accent-300 text-lg font-medium tabular-nums">
        {props.timer}
      </span>
    </div>
  )
}
