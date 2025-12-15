import { Show } from 'solid-js'

interface HeaderProps {
  HP?: number
  scorePoints?: string
  maxScore?: string
  inGame: boolean
  handleHeaderBack?: () => void
  timer?: number
}

export function Header(props: HeaderProps) {
  return (
    <nav class="h-14 w-full">
      <div class="px-4 flex w-full mx-auto h-full items-center justify-between">
        <Show when={!props.inGame}>
          <Logo />
          <div />
        </Show>
        <Show when={props.inGame}>
          <BackButton onClick={props.handleHeaderBack} />
          <ScoreDisplay
            scorePoints={props.scorePoints}
            maxScore={props.maxScore}
          />
          <GameStats HP={props.HP} timer={props.timer} />
        </Show>
      </div>
    </nav>
  )
}

function Logo() {
  return <img src="/logo.svg" class="w-[41px] h-[41px]" alt="logo" />
}

interface BackButtonProps {
  onClick?: () => void
}

function BackButton(props: BackButtonProps) {
  return (
    <button
      class="flex items-center justify-center w-10 h-10 hover:cursor-pointer"
      onClick={props.onClick}
    >
      <svg
        class="w-6 h-6 fill-accent hover:fill-primary-300 transition-colors"
        viewBox="0 0 24 24"
      >
        <path d="M24 0v24H0V0h24z" fill="none" opacity=".87" />
        <path d="M12.29 8.71L9.7 11.3c-.39.39-.39 1.02 0 1.41l2.59 2.59c.63.63 1.71.18 1.71-.71V9.41c0-.89-1.08-1.33-1.71-.7z" />
      </svg>
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
