import { createFileRoute, Link } from '@tanstack/solid-router'
import { createResource, For, Show, createSignal } from 'solid-js'
import { Header, Content, BottomNav } from '@/components'
// import { useAuth } from '@/context/auth'
// import { getUserStats, getUserGameRecords } from '@/server/game-records'
import { getUserThreads, getUserPosts } from '@/server/threads'
import type { Thread, Post } from '@/types/forum'

export const Route = createFileRoute('/perfil')({
  component: ProfilePage,
})

// Hardcoded mock user for UI development
const mockUser = {
  userId: 'mock-user-123',
  name: 'Entrenador Pokémon',
  email: 'entrenador@pokeforos.com',
  picture: undefined as string | undefined,
}

// Hardcoded mock stats for UI development
const mockStats = {
  allTime: {
    totalGames: 42,
    totalScore: 15680,
    highScorePokemonGuesser: 850,
    highScoreDamageCalculator: 720,
    averageScore: 373,
  },
  last30Days: {
    totalGames: 12,
    totalScore: 4520,
    highScorePokemonGuesser: 850,
    highScoreDamageCalculator: 680,
    averageScore: 377,
  },
}

// Hardcoded mock game records for UI development
const mockGameRecords = [
  { id: 1, gameMode: 'pokemon-guesser', difficulty: 'DIFICIL', score: 850, level: 15, timePlayed: 423, completedAt: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 2, gameMode: 'damage-calculator', difficulty: null, score: 680, level: 12, timePlayed: 356, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: 3, gameMode: 'pokemon-guesser', difficulty: 'FACIL', score: 420, level: 8, timePlayed: 245, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: 4, gameMode: 'damage-calculator', difficulty: null, score: 550, level: 10, timePlayed: 298, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
  { id: 5, gameMode: 'pokemon-guesser', difficulty: 'DIFICIL', score: 720, level: 14, timePlayed: 389, completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
]

function ProfilePage() {
  // const { user } = useAuth()
  const [activeTab, setActiveTab] = createSignal<'stats' | 'history' | 'forum'>('stats')

  // Use hardcoded data instead of server calls
  // const [stats] = createResource(() => getUserStats())
  // const [gameRecords] = createResource(() => getUserGameRecords())

  const [userThreads] = createResource(
    () => mockUser.userId,
    async (userId) => {
      if (!userId) return []
      const result = await getUserThreads({ data: { authorId: userId, limit: 10 } })
      return result
    }
  )
  const [userPosts] = createResource(
    () => mockUser.userId,
    async (userId) => {
      if (!userId) return []
      const result = await getUserPosts({ data: { authorId: userId, limit: 10 } })
      return result
    }
  )

  return (
    <div class="flex flex-col h-dvh w-dvw bg-bg-400 antialiased overflow-hidden">
      <Header inGame={false} />
      <Content>
        <div class="flex-1 w-full overflow-y-auto custom-scrollbar">
          <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Profile Header */}
            <div class="bg-bg-300 rounded-xl p-6 border border-primary-700/30 mb-6">
              <div class="flex items-center gap-4">
                <div class="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center overflow-hidden">
                  <Show
                    when={mockUser.picture}
                    fallback={
                      <span class="text-accent font-bold text-2xl">
                        {mockUser.name.charAt(0).toUpperCase()}
                      </span>
                    }
                  >
                    <img
                      src={mockUser.picture}
                      alt={mockUser.name}
                      class="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </Show>
                </div>
                <div class="flex-1">
                  <h1 class="text-2xl font-bold text-accent">{mockUser.name}</h1>
                  <p class="text-primary-400">{mockUser.email}</p>
                </div>
                <Link
                  to="/auth/logout"
                  class="px-4 py-2 bg-danger-600/20 text-danger-400 rounded-lg text-sm hover:bg-danger-600/30 transition-colors"
                >
                  Cerrar sesión
                </Link>
              </div>
            </div>

            {/* Tabs */}
            <div class="flex gap-2 mb-6">
              <button
                class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab() === 'stats'
                    ? 'bg-accent text-bg-400'
                    : 'bg-bg-300 text-primary-300 hover:bg-bg-200'
                }`}
                onClick={() => setActiveTab('stats')}
              >
                Estadísticas
              </button>
              <button
                class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab() === 'history'
                    ? 'bg-accent text-bg-400'
                    : 'bg-bg-300 text-primary-300 hover:bg-bg-200'
                }`}
                onClick={() => setActiveTab('history')}
              >
                Historial
              </button>
              <button
                class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab() === 'forum'
                    ? 'bg-accent text-bg-400'
                    : 'bg-bg-300 text-primary-300 hover:bg-bg-200'
                }`}
                onClick={() => setActiveTab('forum')}
              >
                Foro
              </button>
            </div>

            {/* Tab Content */}
            <Show when={activeTab() === 'stats'}>
              <StatsSection stats={mockStats} loading={false} />
            </Show>

            <Show when={activeTab() === 'history'}>
              <HistorySection records={mockGameRecords} loading={false} />
            </Show>

            <Show when={activeTab() === 'forum'}>
              <ForumSection
                threads={userThreads() ?? []}
                posts={userPosts() ?? []}
                loadingThreads={userThreads.loading}
                loadingPosts={userPosts.loading}
              />
            </Show>
          </div>
        </div>
      </Content>
      <BottomNav activeTab="account" />
    </div>
  )
}

interface StatsData {
  allTime: {
    totalGames: number
    totalScore: number
    highScorePokemonGuesser: number
    highScoreDamageCalculator: number
    averageScore: number
  }
  last30Days: {
    totalGames: number
    totalScore: number
    highScorePokemonGuesser: number
    highScoreDamageCalculator: number
    averageScore: number
  }
}

function StatsSection(props: { stats: StatsData | null | undefined; loading: boolean }) {
  return (
    <div class="space-y-6">
      <Show
        when={!props.loading}
        fallback={
          <div class="bg-bg-300 rounded-xl p-8 border border-primary-700/30 text-center">
            <p class="text-primary-400">Cargando estadísticas...</p>
          </div>
        }
      >
        <Show
          when={props.stats}
          fallback={
            <div class="bg-bg-300 rounded-xl p-8 border border-primary-700/30 text-center">
              <p class="text-primary-400">No hay estadísticas disponibles.</p>
            </div>
          }
        >
          {(statsData) => (
            <>
              {/* Last 30 Days */}
              <div class="bg-bg-300 rounded-xl p-6 border border-primary-700/30">
                <h2 class="text-lg font-bold text-accent mb-4">Últimos 30 días</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard label="Partidas" value={statsData().last30Days.totalGames} />
                  <StatCard label="Puntos totales" value={statsData().last30Days.totalScore} />
                  <StatCard label="Mejor (Guesser)" value={statsData().last30Days.highScorePokemonGuesser} />
                  <StatCard label="Mejor (Calculator)" value={statsData().last30Days.highScoreDamageCalculator} />
                </div>
              </div>

              {/* All Time */}
              <div class="bg-bg-300 rounded-xl p-6 border border-primary-700/30">
                <h2 class="text-lg font-bold text-accent mb-4">Todo el tiempo</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard label="Partidas" value={statsData().allTime.totalGames} />
                  <StatCard label="Puntos totales" value={statsData().allTime.totalScore} />
                  <StatCard label="Mejor (Guesser)" value={statsData().allTime.highScorePokemonGuesser} />
                  <StatCard label="Mejor (Calculator)" value={statsData().allTime.highScoreDamageCalculator} />
                </div>
              </div>
            </>
          )}
        </Show>
      </Show>
    </div>
  )
}

function StatCard(props: { label: string; value: number }) {
  return (
    <div class="bg-bg-200 rounded-lg p-4 text-center">
      <p class="text-2xl font-bold text-primary-100">{props.value.toLocaleString()}</p>
      <p class="text-xs text-primary-400">{props.label}</p>
    </div>
  )
}

interface GameRecord {
  id: number
  gameMode: string
  difficulty: string | null
  score: number
  level: number
  timePlayed: number
  completedAt: Date
}

function HistorySection(props: { records: GameRecord[]; loading: boolean }) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getGameName = (mode: string) => {
    switch (mode) {
      case 'pokemon-guesser':
        return 'Pokemon Guesser'
      case 'damage-calculator':
        return 'Damage Calculator'
      default:
        return mode
    }
  }

  return (
    <Show
      when={!props.loading}
      fallback={
        <div class="bg-bg-300 rounded-xl p-8 border border-primary-700/30 text-center">
          <p class="text-primary-400">Cargando historial...</p>
        </div>
      }
    >
      <Show
        when={props.records.length > 0}
        fallback={
          <div class="bg-bg-300 rounded-xl p-8 border border-primary-700/30 text-center">
            <p class="text-primary-400">No hay partidas registradas.</p>
            <Link to="/games" class="text-accent hover:underline mt-2 inline-block">
              Juega tu primera partida
            </Link>
          </div>
        }
      >
        <div class="bg-bg-300 rounded-xl overflow-hidden border border-primary-700/30">
          <div class="p-4 border-b border-primary-700/20">
            <h2 class="text-lg font-bold text-accent">Historial de partidas</h2>
          </div>
          <div class="divide-y divide-primary-700/20">
            <For each={props.records}>
              {(record) => (
                <div class="p-4 flex items-center justify-between">
                  <div class="flex-1">
                    <p class="font-medium text-primary-100">{getGameName(record.gameMode)}</p>
                    <p class="text-xs text-primary-400">
                      {formatDate(record.completedAt)}
                      {record.difficulty && ` - ${record.difficulty}`}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-accent">{record.score} pts</p>
                    <p class="text-xs text-primary-400">
                      Nivel {record.level} - {formatTime(record.timePlayed)}
                    </p>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </Show>
  )
}

function ForumSection(props: {
  threads: Thread[]
  posts: Post[]
  loadingThreads: boolean
  loadingPosts: boolean
}) {
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
    <div class="space-y-6">
      {/* User Threads */}
      <div class="bg-bg-300 rounded-xl overflow-hidden border border-primary-700/30">
        <div class="p-4 border-b border-primary-700/20">
          <h2 class="text-lg font-bold text-accent">Mis temas</h2>
        </div>
        <Show
          when={!props.loadingThreads}
          fallback={
            <div class="p-6 text-center">
              <p class="text-primary-400">Cargando temas...</p>
            </div>
          }
        >
          <Show
            when={props.threads.length > 0}
            fallback={
              <div class="p-6 text-center">
                <p class="text-primary-400">No has creado ningún tema.</p>
              </div>
            }
          >
            <div class="divide-y divide-primary-700/20">
              <For each={props.threads}>
                {(thread) => (
                  <Link
                    to="/forum/$slug/thread/$threadId"
                    params={{ slug: thread.forumSlug, threadId: thread.id }}
                    class="block p-4 hover:bg-bg-200/50 transition-colors"
                  >
                    <p class="font-medium text-primary-100 truncate">{thread.title}</p>
                    <p class="text-xs text-primary-400">
                      {thread.forumSlug} - {timeAgo(thread.createdAt)} - {thread.replyCount} respuestas
                    </p>
                  </Link>
                )}
              </For>
            </div>
          </Show>
        </Show>
      </div>

      {/* User Posts */}
      <div class="bg-bg-300 rounded-xl overflow-hidden border border-primary-700/30">
        <div class="p-4 border-b border-primary-700/20">
          <h2 class="text-lg font-bold text-accent">Mis respuestas</h2>
        </div>
        <Show
          when={!props.loadingPosts}
          fallback={
            <div class="p-6 text-center">
              <p class="text-primary-400">Cargando respuestas...</p>
            </div>
          }
        >
          <Show
            when={props.posts.length > 0}
            fallback={
              <div class="p-6 text-center">
                <p class="text-primary-400">No has publicado ninguna respuesta.</p>
              </div>
            }
          >
            <div class="divide-y divide-primary-700/20">
              <For each={props.posts}>
                {(post) => (
                  <div class="p-4">
                    <p class="text-primary-200 text-sm line-clamp-2">{post.content}</p>
                    <p class="text-xs text-primary-400 mt-1">{timeAgo(post.createdAt)}</p>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </Show>
      </div>
    </div>
  )
}
