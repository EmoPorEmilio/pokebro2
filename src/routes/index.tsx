import { createFileRoute, Link } from '@tanstack/solid-router'
import { For } from 'solid-js'
import { Header, Content, BottomNav } from '@/components'

export const Route = createFileRoute('/')({
  component: Home,
})

interface Forum {
  slug: string
  title: string
  description: string
  threads: number
  latestReply: {
    title: string
    author: string
    time: string
  } | null
}

interface Category {
  name: string
  forums: Forum[]
}

const forumData: Category[] = [
  {
    name: 'PokéForos',
    forums: [
      {
        slug: 'anuncios',
        title: 'Anuncios',
        description: 'Novedades y comunicados oficiales del foro',
        threads: 12,
        latestReply: {
          title: 'Bienvenidos a PokéForos 2025',
          author: 'Admin',
          time: 'Hace 2 horas',
        },
      },
      {
        slug: 'bienvenidas',
        title: 'Bienvenidas',
        description: 'Preséntate a la comunidad',
        threads: 156,
        latestReply: {
          title: '¡Hola a todos!',
          author: 'NuevoEntrenador',
          time: 'Hace 15 min',
        },
      },
      {
        slug: 'sugerencias',
        title: 'Buzón de sugerencias',
        description: 'Comparte tus ideas para mejorar el foro',
        threads: 34,
        latestReply: {
          title: 'Idea: Torneos semanales',
          author: 'CompetitivePlayer',
          time: 'Hace 1 hora',
        },
      },
    ],
  },
  {
    name: 'Pokémon',
    forums: [
      {
        slug: 'tcg',
        title: 'TCG',
        description: 'Juego de cartas coleccionables Pokémon',
        threads: 89,
        latestReply: {
          title: 'Mejor deck actual del meta',
          author: 'CardMaster',
          time: 'Hace 30 min',
        },
      },
      {
        slug: 'vgc',
        title: 'Videojuegos Competitivo',
        description: 'Estrategia, equipos y torneos VGC',
        threads: 234,
        latestReply: {
          title: 'Análisis Regulation H',
          author: 'VGCPro',
          time: 'Hace 5 min',
        },
      },
      {
        slug: 'consolas',
        title: 'Consolas',
        description: 'Discusión de juegos principales de Pokémon',
        threads: 178,
        latestReply: {
          title: 'Rumores de Gen 10',
          author: 'Leaker2025',
          time: 'Hace 45 min',
        },
      },
    ],
  },
  {
    name: 'Zona Libre',
    forums: [
      {
        slug: 'zona-libre',
        title: 'Zona Libre',
        description: 'Discusión general sobre cualquier tema',
        threads: 412,
        latestReply: {
          title: '¿Cuál es tu Pokémon favorito?',
          author: 'PokeFan99',
          time: 'Hace 3 min',
        },
      },
      {
        slug: 'off-topic',
        title: 'Off-Topic',
        description: 'Temas no relacionados con Pokémon',
        threads: 267,
        latestReply: {
          title: 'Recomendaciones de anime 2025',
          author: 'OtakuMaster',
          time: 'Hace 20 min',
        },
      },
    ],
  },
  {
    name: 'Intercambios',
    forums: [
      {
        slug: 'pokemon-trading',
        title: 'Intercambio de Pokémon',
        description: 'Intercambia Pokémon con otros entrenadores',
        threads: 523,
        latestReply: {
          title: 'Busco Ditto 6IV',
          author: 'BreederPro',
          time: 'Hace 8 min',
        },
      },
      {
        slug: 'tcg-trading',
        title: 'Intercambio de Cartas',
        description: 'Compra, venta e intercambio de cartas TCG',
        threads: 312,
        latestReply: {
          title: 'Vendo colección completa SV',
          author: 'CardCollector',
          time: 'Hace 25 min',
        },
      },
      {
        slug: 'events-giveaways',
        title: 'Eventos y Sorteos',
        description: 'Pokémon de evento y giveaways de la comunidad',
        threads: 89,
        latestReply: {
          title: 'Sorteo Shiny Charizard',
          author: 'GenerousTrainer',
          time: 'Hace 1 hora',
        },
      },
    ],
  },
  {
    name: 'Guías y Recursos',
    forums: [
      {
        slug: 'guides',
        title: 'Guías',
        description: 'Tutoriales y guías para juegos Pokémon',
        threads: 245,
        latestReply: {
          title: 'Guía completa de EV/IV',
          author: 'ProTrainer',
          time: 'Hace 35 min',
        },
      },
      {
        slug: 'teambuilding',
        title: 'Teambuilding',
        description: 'Ayuda y consejos para armar equipos competitivos',
        threads: 178,
        latestReply: {
          title: 'RMT: Rain Team VGC',
          author: 'WeatherMaster',
          time: 'Hace 50 min',
        },
      },
      {
        slug: 'pokedex',
        title: 'Pokédex',
        description: 'Información y discusión sobre Pokémon específicos',
        threads: 892,
        latestReply: {
          title: 'Análisis: Dragapult',
          author: 'CompetitiveFan',
          time: 'Hace 12 min',
        },
      },
    ],
  },
  {
    name: 'Creaciones',
    forums: [
      {
        slug: 'fanart',
        title: 'Fan Art',
        description: 'Comparte tus dibujos y arte de Pokémon',
        threads: 456,
        latestReply: {
          title: 'Mi dibujo de Eevee',
          author: 'ArtistaPoke',
          time: 'Hace 5 min',
        },
      },
      {
        slug: 'fanfiction',
        title: 'Fan Fiction',
        description: 'Historias y relatos del mundo Pokémon',
        threads: 123,
        latestReply: {
          title: 'Capítulo 5: El viaje continúa',
          author: 'EscritorPokemon',
          time: 'Hace 2 horas',
        },
      },
      {
        slug: 'romhacks',
        title: 'ROM Hacks',
        description: 'Discusión sobre ROM hacks y fan games',
        threads: 234,
        latestReply: {
          title: 'Review: Pokémon Radical Red',
          author: 'HackFan',
          time: 'Hace 40 min',
        },
      },
    ],
  },
]

function Home() {
  return (
    <div class="flex flex-col h-dvh w-dvw bg-bg-400 antialiased overflow-hidden">
      <Header inGame={false} />
      <Content>
        <div class="flex-1 w-full overflow-y-auto custom-scrollbar">
          <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
            <For each={forumData}>
              {(category) => <ForumCategory category={category} />}
            </For>
          </div>
        </div>
      </Content>
      <BottomNav activeTab="home" />
    </div>
  )
}

function ForumCategory(props: { category: Category }) {
  return (
    <section class="mb-6">
      <h2 class="text-lg lg:text-xl font-bold text-accent mb-3 px-1">{props.category.name}</h2>
      <div class="bg-bg-300 rounded-xl overflow-hidden border border-primary-700/30">
        <For each={props.category.forums}>
          {(forum, index) => (
            <>
              <ForumRow forum={forum} />
              {index() < props.category.forums.length - 1 && (
                <div class="border-b border-primary-700/20 mx-4" />
              )}
            </>
          )}
        </For>
      </div>
    </section>
  )
}

function ForumRow(props: { forum: Forum }) {
  return (
    <Link
      to="/forum/$slug"
      params={{ slug: props.forum.slug }}
      class="flex items-center gap-4 p-4 lg:p-5 hover:bg-bg-200/50 transition-colors cursor-pointer"
    >
      {/* Forum Icon */}
      <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 lg:w-6 lg:h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </div>

      {/* Forum Info */}
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-primary-100 text-sm lg:text-base">{props.forum.title}</h3>
        <p class="text-xs lg:text-sm text-primary-400 truncate">{props.forum.description}</p>
      </div>

      {/* Thread Count */}
      <div class="hidden sm:flex flex-col items-center px-4 lg:px-6">
        <span class="text-sm lg:text-base font-semibold text-primary-200">{props.forum.threads}</span>
        <span class="text-xs text-primary-500">temas</span>
      </div>

      {/* Latest Reply */}
      {props.forum.latestReply && (
        <div class="hidden md:block flex-1 max-w-xs lg:max-w-md text-right">
          <p class="text-xs lg:text-sm text-primary-200 truncate">{props.forum.latestReply.title}</p>
          <p class="text-xs text-primary-500">
            {props.forum.latestReply.author} · {props.forum.latestReply.time}
          </p>
        </div>
      )}

      {/* Arrow */}
      <svg class="w-4 h-4 lg:w-5 lg:h-5 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
