import { Show } from 'solid-js'
import { types } from '@/data/types'

interface TypesProps {
  typesCombinations: [number, number, number | null]
  loading?: boolean
}

export function Types(props: TypesProps) {
  const attackType = () => types[props.typesCombinations[0]]
  const firstDefense = () => types[props.typesCombinations[1]]
  const secondDefense = () =>
    props.typesCombinations[2] !== null ? types[props.typesCombinations[2]] : null

  return (
    <div class="flex h-2/5 items-center justify-center">
      <Show when={attackType()}>
        <div>
          <div
            class={`flex flex-1 p-2 m-1 flex-col content-center justify-center ${attackType()?.color} border-accent text-bg-400 border-2 rounded-[50px] border-solid items-center font-bold`}
          >
            {attackType()?.printName}
          </div>
        </div>
      </Show>

      <span class="text-accent text-lg mx-2">VS</span>

      <div>
        <Show when={firstDefense()}>
          <div
            class={`flex flex-1 p-2 m-1 flex-col content-center justify-center ${firstDefense()?.color} border-accent text-bg-400 border-2 rounded-[50px] border-solid items-center font-bold`}
          >
            {firstDefense()?.printName}
          </div>
        </Show>
        <Show when={secondDefense()}>
          <div
            class={`flex flex-1 p-2 m-1 flex-col content-center justify-center ${secondDefense()?.color} border-accent text-bg-400 border-2 rounded-[50px] border-solid items-center font-bold`}
          >
            {secondDefense()?.printName}
          </div>
        </Show>
      </div>
    </div>
  )
}
