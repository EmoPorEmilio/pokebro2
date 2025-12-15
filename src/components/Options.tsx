import { createSignal, For, Show, type JSX } from 'solid-js'
import type { Pokemon } from '@/lib/utils'

interface OptionsProps {
  correctNameOption?: string
  loading: boolean
  pokemonNameOptions: Pokemon[]
  handleClickOption: (pokemon: Pokemon) => void
  validation: boolean
  showVictory?: boolean
}

export function Options(props: OptionsProps) {
  const [lastClickedOption, setLastClickedOption] = createSignal<string | null>(null)

  const handleClick = (pokemon: Pokemon) => {
    if (!props.validation) {
      setLastClickedOption(pokemon.name)
      props.handleClickOption(pokemon)
    }
  }

  return (
    <div class="flex flex-col w-full h-full px-10 pb-10 justify-center items-center gap-3 relative">
      <Show when={props.showVictory}>
        <VictoryStars />
      </Show>
      <Show
        when={props.pokemonNameOptions && !props.loading}
        fallback={
          <>
            <OptionLoader />
            <OptionLoader />
            <OptionLoader />
            <OptionLoader />
            <OptionLoader />
          </>
        }
      >
        <For each={props.pokemonNameOptions}>
          {(pokemon) => {
            const isCorrect = () => props.validation && pokemon.name === props.correctNameOption
            const isIncorrect = () =>
              props.validation &&
              pokemon.name === lastClickedOption() &&
              pokemon.name !== props.correctNameOption

            return (
              <Option
                correct={isCorrect()}
                incorrect={isIncorrect()}
                validation={props.validation}
                onClick={() => handleClick(pokemon)}
              >
                {pokemon.name}
              </Option>
            )
          }}
        </For>
      </Show>
    </div>
  )
}

interface OptionProps {
  children: JSX.Element | string
  correct?: boolean
  incorrect?: boolean
  validation?: boolean
  onClick?: () => void
}

function Option(props: OptionProps) {
  const conditionalStyle = () => {
    if (props.correct) return 'border-correct bg-correct/20'
    if (props.incorrect) return 'border-incorrect bg-incorrect/20'
    if (!props.validation) return 'hover:cursor-pointer hover:bg-primary-600 hover:border-primary-400'
    return ''
  }

  const textStyle = () => {
    if (props.correct) return 'text-correct'
    if (props.incorrect) return 'text-incorrect'
    return 'text-primary-300'
  }

  return (
    <div
      class={`${conditionalStyle()} flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 transition-colors`}
      onClick={props.onClick}
    >
      <span class={`font-sen text-2xl ${textStyle()}`}>{props.children}</span>
    </div>
  )
}

function OptionLoader() {
  return (
    <div class="flex animate-pulse rounded-md w-full flex-1 bg-primary-700/50 border-b border-primary-600" />
  )
}

function VictoryStars() {
  return (
    <>
      <div class="absolute left-12 top-4">
        <Star style={{ 'animation-delay': '0s' }} />
      </div>
      <div class="absolute left-8 top-12">
        <Star style={{ 'animation-delay': '0.2s' }} />
      </div>
      <div class="absolute left-4 top-20">
        <Star style={{ 'animation-delay': '0.4s' }} />
      </div>
      <div class="absolute right-12 top-4">
        <Star style={{ 'animation-delay': '0.1s' }} />
      </div>
      <div class="absolute right-8 top-12">
        <Star style={{ 'animation-delay': '0.3s' }} />
      </div>
      <div class="absolute right-4 top-20">
        <Star style={{ 'animation-delay': '0.5s' }} />
      </div>
    </>
  )
}

function Star(props: { style?: JSX.CSSProperties }) {
  return (
    <svg
      class="w-[18px] h-[18px] animate-star-victory opacity-0"
      style={props.style}
      viewBox="0 0 24 24"
      fill="#FFDD87"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
