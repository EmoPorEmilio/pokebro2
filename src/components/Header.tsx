import { Show } from 'solid-js'
import { useNavigate } from '@tanstack/solid-router'
import { useAuth } from '@/context/auth'

export type FlashState = 'none' | 'correct' | 'incorrect'

interface HeaderProps {
  HP?: number
  scorePoints?: string
  maxScore?: string
  inGame: boolean
  timer?: number
}

export function Header(props: HeaderProps) {
  const navigate = useNavigate()
  const { user } = useAuth()

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
          <AuthButton user={user()} />
        </Show>
      </div>
    </nav>
  )
}

interface AuthButtonProps {
  user: { name: string; picture?: string } | null | undefined
}

function AuthButton(props: AuthButtonProps) {
  return (
    <Show
      when={props.user}
      fallback={
        <a
          href="/auth/google"
          class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-600 text-primary-200 text-sm font-medium hover:bg-primary-500 transition-colors"
        >
          <GoogleIcon />
          <span>Iniciar sesión</span>
        </a>
      }
    >
      {(user) => (
        <div class="flex items-center gap-2">
          <Show when={user().picture}>
            <img
              src={user().picture}
              alt={user().name}
              class="w-8 h-8 rounded-full"
              referrerPolicy="no-referrer"
            />
          </Show>
          <span class="text-accent-300 text-sm hidden sm:block">{user().name}</span>
          <a
            href="/auth/logout"
            class="text-xs text-primary-400 hover:text-accent-300 transition-colors"
          >
            Salir
          </a>
        </div>
      )}
    </Show>
  )
}

function GoogleIcon() {
  return (
    <svg class="w-4 h-4" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
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
