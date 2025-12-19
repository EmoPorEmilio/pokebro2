import { createFileRoute, Link } from '@tanstack/solid-router'
import { createResource, For, Show } from 'solid-js'
import { Header, Content, BottomNav } from '@/components'
import { getForumThreads } from '@/server/threads'
import type { Thread } from '@/types/forum'

export const Route = createFileRoute('/forum/$slug/')({
  component: ForumPage,
})

// Forum metadata - in a real app this would come from a database
const forumMeta: Record<string, { title: string; description: string }> = {
  anuncios: { title: 'Anuncios', description: 'Novedades y comunicados oficiales del foro' },
  bienvenidas: { title: 'Bienvenidas', description: 'Preséntate a la comunidad' },
  sugerencias: { title: 'Buzón de sugerencias', description: 'Comparte tus ideas para mejorar el foro' },
  tcg: { title: 'TCG', description: 'Juego de cartas coleccionables Pokémon' },
  vgc: { title: 'Videojuegos Competitivo', description: 'Estrategia, equipos y torneos VGC' },
  consolas: { title: 'Consolas', description: 'Discusión de juegos principales de Pokémon' },
  'zona-libre': { title: 'Zona Libre', description: 'Discusión general sobre cualquier tema' },
  'off-topic': { title: 'Off-Topic', description: 'Temas no relacionados con Pokémon' },
  'pokemon-trading': { title: 'Intercambio de Pokémon', description: 'Intercambia Pokémon con otros entrenadores' },
  'tcg-trading': { title: 'Intercambio de Cartas', description: 'Compra, venta e intercambio de cartas TCG' },
  'events-giveaways': { title: 'Eventos y Sorteos', description: 'Pokémon de evento y giveaways de la comunidad' },
  guides: { title: 'Guías', description: 'Tutoriales y guías para juegos Pokémon' },
  teambuilding: { title: 'Teambuilding', description: 'Ayuda y consejos para armar equipos competitivos' },
  pokedex: { title: 'Pokédex', description: 'Información y discusión sobre Pokémon específicos' },
  fanart: { title: 'Fan Art', description: 'Comparte tus dibujos y arte de Pokémon' },
  fanfiction: { title: 'Fan Fiction', description: 'Historias y relatos del mundo Pokémon' },
  romhacks: { title: 'ROM Hacks', description: 'Discusión sobre ROM hacks y fan games' },
}

function ForumPage() {
  const { slug } = Route.useParams()

  const [threadsData] = createResource(
    () => slug(),
    async (forumSlug) => {
      const result = await getForumThreads({ data: { forumSlug } })
      return result
    }
  )

  const forum = () => forumMeta[slug()] ?? { title: slug(), description: '' }

  return (
    <div class="flex flex-col h-dvh w-dvw bg-bg-400 antialiased overflow-hidden">
      <Header inGame={false} />
      <Content>
        <div class="flex-1 w-full overflow-y-auto custom-scrollbar">
          <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <nav class="flex items-center gap-2 text-sm text-primary-400 mb-4">
              <Link to="/" class="hover:text-accent transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span class="text-primary-200">{forum().title}</span>
            </nav>

            {/* Forum Header */}
            <div class="bg-bg-300 rounded-xl p-6 border border-primary-700/30 mb-6 flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-accent mb-2">{forum().title}</h1>
                <p class="text-primary-400">{forum().description}</p>
              </div>
              <a
                href={`/forum/${slug()}/new`}
                class="px-4 py-2 bg-accent text-bg-400 rounded-lg font-medium hover:bg-accent/90 transition-colors shrink-0 cursor-pointer"
              >
                Crear tema
              </a>
            </div>

            {/* Threads List */}
            <Show
              when={!threadsData.loading}
              fallback={
                <div class="bg-bg-300 rounded-xl p-8 border border-primary-700/30 text-center">
                  <p class="text-primary-400">Cargando temas...</p>
                </div>
              }
            >
              <Show
                when={threadsData()?.items.length}
                fallback={<EmptyState slug={slug()} />}
              >
                <div class="bg-bg-300 rounded-xl overflow-hidden border border-primary-700/30">
                  <For each={threadsData()?.items}>
                    {(thread, index) => (
                      <>
                        <ThreadRow thread={thread} />
                        {index() < (threadsData()?.items.length ?? 0) - 1 && (
                          <div class="border-b border-primary-700/20 mx-4" />
                        )}
                      </>
                    )}
                  </For>
                </div>
              </Show>
            </Show>
          </div>
        </div>
      </Content>
      <BottomNav activeTab="home" />
    </div>
  )
}

function ThreadRow(props: { thread: Thread }) {
  const timeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Ahora'
    if (minutes < 60) return `Hace ${minutes} min`
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`
    return `Hace ${days} día${days > 1 ? 's' : ''}`
  }

  return (
    <Link
      to="/forum/$slug/thread/$threadId"
      params={{ slug: props.thread.forumSlug, threadId: props.thread.id }}
      class="flex items-center gap-4 p-4 lg:p-5 hover:bg-bg-200/50 transition-colors cursor-pointer"
    >
      {/* Author Avatar */}
      <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary-600 flex items-center justify-center shrink-0 overflow-hidden">
        <Show
          when={props.thread.authorPicture}
          fallback={
            <span class="text-accent font-semibold text-sm lg:text-base">
              {props.thread.authorName.charAt(0).toUpperCase()}
            </span>
          }
        >
          <img
            src={props.thread.authorPicture}
            alt={props.thread.authorName}
            class="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </Show>
      </div>

      {/* Thread Info */}
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <Show when={props.thread.isPinned}>
            <span class="text-accent text-xs">📌</span>
          </Show>
          <Show when={props.thread.isLocked}>
            <span class="text-primary-500 text-xs">🔒</span>
          </Show>
          <h3 class="font-semibold text-primary-100 text-sm lg:text-base truncate">
            {props.thread.title}
          </h3>
        </div>
        <p class="text-xs lg:text-sm text-primary-400">
          {props.thread.authorName} · {timeAgo(props.thread.createdAt)}
        </p>
      </div>

      {/* Reply Count */}
      <div class="hidden sm:flex flex-col items-center px-4 lg:px-6">
        <span class="text-sm lg:text-base font-semibold text-primary-200">
          {props.thread.replyCount}
        </span>
        <span class="text-xs text-primary-500">respuestas</span>
      </div>

      {/* Last Reply */}
      <Show when={props.thread.lastReplyAt}>
        <div class="hidden md:block flex-1 max-w-xs lg:max-w-md text-right">
          <p class="text-xs lg:text-sm text-primary-200">
            Última respuesta
          </p>
          <p class="text-xs text-primary-500">
            {props.thread.lastReplyAuthor} · {timeAgo(props.thread.lastReplyAt!)}
          </p>
        </div>
      </Show>

      {/* Arrow */}
      <svg class="w-4 h-4 lg:w-5 lg:h-5 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

function EmptyState(props: { slug: string }) {
  return (
    <div class="bg-bg-300 rounded-xl p-12 border border-primary-700/30 text-center">
      <div class="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-primary-200 mb-2">No hay temas todavía</h2>
      <p class="text-primary-400 text-sm mb-4">Sé el primero en crear un tema en este foro</p>
      <a
        href={`/forum/${props.slug}/new`}
        class="inline-block px-4 py-2 bg-accent text-bg-400 rounded-lg font-medium hover:bg-accent/90 transition-colors cursor-pointer"
      >
        Crear nuevo tema
      </a>
    </div>
  )
}
