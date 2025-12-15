import type { JSX } from 'solid-js'

interface ContentProps {
  children?: JSX.Element
  onClick?: () => void
}

export function Content(props: ContentProps) {
  return (
    <main
      class="flex flex-1 flex-col w-full bg-accent-500 animate-gradient-x rounded-xl py-0.5"
      onClick={props.onClick}
    >
      <div class="flex flex-1 flex-col w-full bg-bg-100 rounded-xl justify-center items-center">
        {props.children}
      </div>
    </main>
  )
}
