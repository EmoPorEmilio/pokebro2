import { Show } from 'solid-js'

interface PokemonProps {
  pokemonSrc?: string | null
  loading: boolean
}

export function Pokemon(props: PokemonProps) {
  return (
    <div class="flex flex-col w-full py-10 px-10 justify-center items-center">
      <div class="flex flex-col w-full h-full items-center justify-center rounded-xl border border-primary-600 border-b-2 border-b-accent-500 bg-bg-300">
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
