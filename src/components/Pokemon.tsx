import { Show } from 'solid-js'
import type { FlashState } from './Header'

interface PokemonProps {
  pokemonSrc?: string | null
  loading: boolean
  flashState?: FlashState
}

export function Pokemon(props: PokemonProps) {
  const flashClass = () => {
    if (props.flashState === 'correct') return 'pokemon-flash-correct'
    if (props.flashState === 'incorrect') return 'pokemon-flash-incorrect'
    return ''
  }

  return (
    <div class="flex flex-col w-full py-10 px-10 justify-center items-center">
      <div class={`flex flex-col w-full h-full items-center justify-center rounded-xl border border-primary-600 border-b-2 border-b-accent bg-bg-300 ${flashClass()}`}>
        <Show
          when={!props.loading}
          fallback={
            <div class="w-[210px] h-[210px] rounded-xl animate-pulse bg-bg-light" />
          }
        >
          <Show when={props.pokemonSrc}>
            <img
              src={props.pokemonSrc!}
              width="210"
              height="210"
              alt="pokemon sprite"
              class="object-contain"
            />
          </Show>
        </Show>
      </div>
    </div>
  )
}
