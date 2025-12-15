import { createFileRoute, useNavigate } from '@tanstack/solid-router'
import { Header, Content, BottomNav } from '@/components'
import { GAME_MODES } from '@/lib/constants'

export const Route = createFileRoute('/')(
  {
    component: Landing,
  }
)

function Landing() {
  const navigate = useNavigate()

  return (
    <div class="flex flex-col h-[100dvh] w-[100dvw] bg-bg-400 antialiased">
      <Header inGame={false} />
      <Content>
        <div class="flex flex-col w-[80vw] max-w-[350px] justify-center items-center gap-4">
          <button
            type="button"
            class="flex justify-center items-center rounded-lg min-h-[60px] w-full bg-cards-bg border-accent-200 border border-solid text-accent text-center font-bold text-xl hover:cursor-pointer hover:bg-accent hover:border-white hover:text-cards-bg transition-colors"
            onClick={() => navigate({ to: '/pokemon-guesser' })}
          >
            <span>{GAME_MODES.POKEMON_GUESSER}</span>
          </button>
          <button
            type="button"
            class="flex justify-center items-center rounded-lg min-h-[60px] w-full bg-cards-bg border-accent-200 border border-solid text-accent text-center font-bold text-xl hover:cursor-pointer hover:bg-accent hover:border-white hover:text-cards-bg transition-colors"
            onClick={() => navigate({ to: '/damage-calculator' })}
          >
            <span>{GAME_MODES.DAMAGE_CALCULATOR}</span>
          </button>
        </div>
      </Content>
      <BottomNav activeTab="home" />
    </div>
  )
}
