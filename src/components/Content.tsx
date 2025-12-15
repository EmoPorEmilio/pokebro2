import type { JSX } from 'solid-js'
import type { FlashState } from './Header'

interface ContentProps {
  children?: JSX.Element
  onClick?: () => void
  flashState?: FlashState
}

export function Content(props: ContentProps) {
  const flashClass = () => {
    if (props.flashState === 'correct') return 'content-flash-correct'
    if (props.flashState === 'incorrect') return 'content-flash-incorrect'
    return ''
  }

  return (
    <main
      class={`flex flex-1 flex-col w-full bg-accent rounded-xl py-0.5 ${flashClass()}`}
      onClick={props.onClick}
    >
      <div class="flex flex-1 flex-col w-full bg-bg-100 rounded-xl justify-center items-center overflow-hidden">
        {props.children}
      </div>
    </main>
  )
}
