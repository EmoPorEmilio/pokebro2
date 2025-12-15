import { createFileRoute } from '@tanstack/solid-router'
import { Header, Content, BottomNav } from '@/components'

export const Route = createFileRoute('/')(
  {
    component: Home,
  }
)

function Home() {
  return (
    <div class="flex flex-col h-dvh w-dvw bg-bg-400 antialiased">
      <Header inGame={false} />
      <Content>
        <div class="flex flex-col w-[80vw] max-w-[350px] justify-center items-center gap-4">
          <h1 class="text-3xl font-bold text-accent mb-4">PokéBro</h1>
          <p class="text-primary-300 text-center">
            Test your Pokémon knowledge with fun mini-games!
          </p>
        </div>
      </Content>
      <BottomNav activeTab="home" />
    </div>
  )
}
