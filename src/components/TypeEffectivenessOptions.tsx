import { createSignal, For, Show } from 'solid-js'

interface TypeEffectivenessOptionsProps {
  correctOption: string | null
  loading: boolean
  options: string[]
  handleClickOption: (option: string) => void
  validation: boolean
  showVictory?: boolean
}

export function TypeEffectivenessOptions(props: TypeEffectivenessOptionsProps) {
  const [lastClickedOption, setLastClickedOption] = createSignal<string | null>(null)

  const handleClick = (option: string) => {
    if (!props.validation) {
      setLastClickedOption(option)
      props.handleClickOption(option)
    }
  }

  return (
    <div class="flex flex-wrap h-[39vh] w-[80vw] max-w-[350px] justify-center items-center relative">
      <Show when={props.showVictory}>
        <VictoryStars />
      </Show>
      <Show when={props.options && !props.loading}>
        <For each={props.options}>
          {(option) => {
            const isCorrect = () => props.validation && option === props.correctOption
            const isIncorrect = () =>
              props.validation &&
              option === lastClickedOption() &&
              option !== props.correctOption

            const conditionalStyle = () => {
              if (isCorrect()) return 'text-correct border-correct'
              if (isIncorrect()) return 'text-incorrect border-incorrect'
              if (!props.validation)
                return 'hover:cursor-pointer hover:bg-accent hover:border-white text-cards-bg'
              return ''
            }

            return (
              <div
                class={`${conditionalStyle()} flex justify-center items-center rounded-lg min-h-[50px] m-2 w-[40%] bg-cards-bg border-accent-200 border border-solid text-accent text-center font-normal text-2xl`}
                onClick={() => handleClick(option)}
              >
                <span>{option}</span>
              </div>
            )
          }}
        </For>
      </Show>
    </div>
  )
}

function VictoryStars() {
  return (
    <>
      {/* Top row */}
      <div class="absolute left-1/4 -top-6">
        <Star delay="0s" />
      </div>
      <div class="absolute left-1/2 -top-10 -translate-x-1/2">
        <Star delay="0.1s" size="lg" />
      </div>
      <div class="absolute right-1/4 -top-6">
        <Star delay="0.2s" />
      </div>
      {/* Side bursts */}
      <div class="absolute -left-4 top-1/3">
        <Star delay="0.15s" size="lg" />
      </div>
      <div class="absolute -right-4 top-1/3">
        <Star delay="0.25s" size="lg" />
      </div>
      <div class="absolute -left-2 top-2/3">
        <Star delay="0.3s" />
      </div>
      <div class="absolute -right-2 top-2/3">
        <Star delay="0.35s" />
      </div>
    </>
  )
}

function Star(props: { delay: string; size?: 'sm' | 'lg' }) {
  const sizeClass = () => props.size === 'lg' ? 'w-6 h-6' : 'w-4.5 h-4.5'
  return (
    <svg
      class={`${sizeClass()} star-victory-animate`}
      style={{ 'animation-delay': props.delay }}
      viewBox="0 0 24 24"
      fill="#FFDD87"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
