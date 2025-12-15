import { createSignal, For, Show } from 'solid-js'

interface TypeEffectivenessOptionsProps {
  correctOption: string | null
  loading: boolean
  options: string[]
  handleClickOption: (option: string) => void
  validation: boolean
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
    <div class="flex flex-wrap h-[39vh] w-[80vw] max-w-[350px] justify-center items-center">
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
