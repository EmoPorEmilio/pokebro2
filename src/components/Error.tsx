interface ErrorProps {
  message: string
}

export function Error(props: ErrorProps) {
  return (
    <div class="flex flex-col max-w-[80%] h-[68%] justify-center items-center text-accent">
      <div class="flex flex-col m-12 w-full justify-center content-center p-5 bg-cards-bg border-2 rounded-2xl border-solid border-accent">
        <span class="text-center">{props.message}</span>
      </div>
    </div>
  )
}
