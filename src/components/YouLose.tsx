import { createSignal, createEffect, onMount } from 'solid-js'
import { SYSTEM_MESSAGES, theme, type DifficultyLevel, type GameMode } from '@/lib/constants'

interface YouLoseProps {
  restartGame: () => void
  scorePoints: string
  difficulty: DifficultyLevel
  gameMode: GameMode
}

const pikachuSadGif = '/resources/pokemon-sad.gif'
const pikachuSadJPG = '/resources/pokemon-sad.jpg'
const shareTemplate = '/resources/share-template.png'

export function YouLose(props: YouLoseProps) {
  const [pikachuSad, setPikachuSad] = createSignal<string | null>(null)

  const shareStrokeColor = '#492635'

  onMount(() => {
    Math.random() >= 0.5
      ? setPikachuSad(pikachuSadGif)
      : setPikachuSad(pikachuSadJPG)

    setupCanvas()
  })

  const setupCanvas = () => {
    const templateIMG = new Image()
    templateIMG.onload = () => {
      const canvas = document.getElementById('canvasToExport') as HTMLCanvasElement
      if (!canvas) return
      const context = canvas.getContext('2d')
      if (!context) return
      drawTemplate(context, templateIMG)
      drawGameMode(context)
      drawDifficulty(context)
      drawPoints(context)
    }
    templateIMG.src = shareTemplate
  }

  const drawTemplate = (context: CanvasRenderingContext2D, templateIMG: HTMLImageElement) => {
    context.drawImage(templateIMG, 0, 0)
  }

  const drawGameMode = (context: CanvasRenderingContext2D) => {
    context.fillStyle = theme['accent-highlight']
    context.strokeStyle = shareStrokeColor
    context.font = 'normal 800 29px Jost'
    context.textAlign = 'center'
    context.strokeText(props.gameMode, 220, 263)
    context.fillText(props.gameMode, 220, 263)
  }

  const drawDifficulty = (context: CanvasRenderingContext2D) => {
    context.fillStyle = theme['accent-highlight']
    context.strokeStyle = shareStrokeColor
    context.font = 'normal 800 29px Jost'
    context.textAlign = 'center'
    context.strokeText(props.difficulty, 550, 263)
    context.fillText(props.difficulty, 550, 263)
  }

  const drawPoints = (context: CanvasRenderingContext2D) => {
    context.fillStyle = theme.correct
    context.font = 'normal 800 120px Jost'
    context.textAlign = 'center'
    context.fillText(props.scorePoints, 373, 415)
  }

  const exportAndShare = async () => {
    try {
      const canvas = document.getElementById('canvasToExport') as HTMLCanvasElement
      if (!canvas) return
      const base64IMG = canvas.toDataURL('image/png', 1.0)
      const blob = await (await fetch(base64IMG)).blob()
      const file = new File([blob], 'fileName.png', { type: blob.type })
      navigator.share({
        title: 'Resultado PokéBro',
        text: 'Me podrás ganar?',
        files: [file],
      })
    } catch (error) {
      console.error('Share failed:', error)
    }
  }

  return (
    <div class="flex flex-col max-w-[80%] h-[68%] justify-center items-center text-accent">
      <div class="flex flex-col m-12 w-full justify-center content-center p-5 bg-cards-bg border-2 rounded-2xl border-solid border-accent">
        <img src={pikachuSad() ?? ''} alt="sad pikachu" class="w-full" />
      </div>
      <div class="flex">
        <button
          class="flex cursor-pointer m-2 p-2 text-accent text-2xl border-accent border-solid rounded-2xl border-2 hover:bg-accent hover:text-cards-bg"
          onClick={props.restartGame}
        >
          {SYSTEM_MESSAGES.RETRY}
        </button>
        <button
          class="flex cursor-pointer m-2 p-2 text-accent text-2xl border-accent border-solid rounded-2xl border-2 hover:bg-accent hover:text-cards-bg"
          onClick={exportAndShare}
        >
          {SYSTEM_MESSAGES.SHARE}
        </button>
      </div>
      <canvas id="canvasToExport" class="absolute hidden" width="744" height="554" />
    </div>
  )
}
