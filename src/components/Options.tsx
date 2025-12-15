import { createSignal, For, Show, type JSX } from 'solid-js'
import type { Pokemon } from '@/lib/utils'

interface OptionsProps {
  correctNameOption?: string
  loading: boolean
  pokemonNameOptions: Pokemon[]
  handleClickOption: (pokemon: Pokemon) => void
  validation: boolean
  showCorrect?: boolean
  showIncorrect?: boolean
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
      <Show when={props.showCorrect}>
        <CorrectStars />
      </Show>
      <Show when={props.showIncorrect}>
        <IncorrectXs />
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

function CorrectStars() {
  return (
    <>
      {/* Top row */}
      <div class="absolute left-1/4 -top-8">
        <Star style={{ 'animation-delay': '0s' }} />
      </div>
      <div class="absolute left-1/2 -top-12 -translate-x-1/2">
        <Star style={{ 'animation-delay': '0.1s' }} size="lg" />
      </div>
      <div class="absolute right-1/4 -top-8">
        <Star style={{ 'animation-delay': '0.2s' }} />
      </div>
      {/* Side bursts */}
      <div class="absolute -left-2 top-1/4">
        <Star style={{ 'animation-delay': '0.15s' }} />
      </div>
      <div class="absolute -right-2 top-1/4">
        <Star style={{ 'animation-delay': '0.25s' }} />
      </div>
      <div class="absolute -left-4 top-1/2">
        <Star style={{ 'animation-delay': '0.3s' }} size="lg" />
      </div>
      <div class="absolute -right-4 top-1/2">
        <Star style={{ 'animation-delay': '0.35s' }} size="lg" />
      </div>
    </>
  )
}

function Star(props: { style?: JSX.CSSProperties; size?: 'sm' | 'lg' }) {
  const sizeClass = () => props.size === 'lg' ? 'w-6 h-6' : 'w-4.5 h-4.5'
  return (
    <svg
      class={`${sizeClass()} star-victory-animate`}
      style={props.style}
      viewBox="0 0 24 24"
      fill="#83f1a7"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function IncorrectXs() {
  return (
    <>
      {/* Top row */}
      <div class="absolute left-1/4 -top-8">
        <XIcon style={{ 'animation-delay': '0s' }} />
      </div>
      <div class="absolute left-1/2 -top-12 -translate-x-1/2">
        <XIcon style={{ 'animation-delay': '0.1s' }} size="lg" />
      </div>
      <div class="absolute right-1/4 -top-8">
        <XIcon style={{ 'animation-delay': '0.2s' }} />
      </div>
      {/* Side bursts */}
      <div class="absolute -left-2 top-1/4">
        <XIcon style={{ 'animation-delay': '0.15s' }} />
      </div>
      <div class="absolute -right-2 top-1/4">
        <XIcon style={{ 'animation-delay': '0.25s' }} />
      </div>
      <div class="absolute -left-4 top-1/2">
        <XIcon style={{ 'animation-delay': '0.3s' }} size="lg" />
      </div>
      <div class="absolute -right-4 top-1/2">
        <XIcon style={{ 'animation-delay': '0.35s' }} size="lg" />
      </div>
    </>
  )
}

function XIcon(props: { style?: JSX.CSSProperties; size?: 'sm' | 'lg' }) {
  const sizeClass = () => props.size === 'lg' ? 'w-6 h-6' : 'w-4.5 h-4.5'
  return (
    <svg
      class={`${sizeClass()} x-defeat-animate`}
      style={props.style}
      viewBox="0 0 24 24"
      fill="#e74c3c"
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  )
}
