import { createFileRoute, Link, useNavigate } from '@tanstack/solid-router'
import { createResource, createSignal, For, Show } from 'solid-js'
import { Header, Content, BottomNav } from '@/components'
import { getThread, getThreadPosts, createPost } from '@/server/threads'
import type { Thread, Post } from '@/types/forum'

export const Route = createFileRoute('/forum/$slug/thread/$threadId')({
  component: ThreadPage,
})

function ThreadPage() {
  const { slug, threadId } = Route.useParams()
  const navigate = useNavigate()

  const [replyContent, setReplyContent] = createSignal('')
  const [isSubmitting, setIsSubmitting] = createSignal(false)
  const [error, setError] = createSignal('')

  const [thread, { refetch: refetchThread }] = createResource(
    () => threadId(),
    async (id) => {
      const result = await getThread({ data: { id } })
      return result
    }
  )

  const [postsData, { refetch: refetchPosts }] = createResource(
    () => threadId(),
    async (id) => {
      const result = await getThreadPosts({ data: { threadId: id } })
      return result
    }
  )

  const handleSubmitReply = async (e: Event) => {
    e.preventDefault()
    setError('')

    if (!replyContent().trim()) {
      setError('El contenido es requerido')
      return
    }

    setIsSubmitting(true)

    try {
      // For now, use a mock user
      const mockUser = {
        id: 'guest-user',
        name: 'Invitado',
      }

      await createPost({
        data: {
          threadId: threadId(),
          content: replyContent().trim(),
          authorId: mockUser.id,
          authorName: mockUser.name,
        },
      })

      setReplyContent('')
      refetchPosts()
      refetchThread()
    } catch (err) {
      setError('Error al enviar la respuesta. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
    <div class="flex flex-col h-dvh w-dvw bg-bg-400 antialiased overflow-hidden">
      <Header inGame={false} />
      <Content>
        <div class="flex-1 w-full overflow-y-auto custom-scrollbar">
          <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Show
              when={!thread.loading && thread()}
              fallback={
                <div class="bg-bg-300 rounded-xl p-8 border border-primary-700/30 text-center">
                  <p class="text-primary-400">Cargando tema...</p>
                </div>
              }
            >
              {(threadData) => (
                <>
                  {/* Breadcrumb */}
                  <nav class="flex items-center gap-2 text-sm text-primary-400 mb-4">
                    <Link to="/" class="hover:text-accent transition-colors">
                      Inicio
                    </Link>
                    <span>/</span>
                    <Link
                      to="/forum/$slug"
                      params={{ slug: slug() }}
                      class="hover:text-accent transition-colors capitalize"
                    >
                      {slug()}
                    </Link>
                    <span>/</span>
                    <span class="text-primary-200 truncate max-w-[200px]">
                      {threadData().title}
                    </span>
                  </nav>

                  {/* Thread Content */}
                  <div class="bg-bg-300 rounded-xl border border-primary-700/30 mb-6">
                    {/* Thread Header */}
                    <div class="p-6 border-b border-primary-700/20">
                      <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center shrink-0 overflow-hidden">
                          <Show
                            when={threadData().authorPicture}
                            fallback={
                              <span class="text-accent font-semibold">
                                {threadData().authorName.charAt(0).toUpperCase()}
                              </span>
                            }
                          >
                            <img
                              src={threadData().authorPicture}
                              alt={threadData().authorName}
                              class="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </Show>
                        </div>
                        <div class="flex-1 min-w-0">
                          <h1 class="text-xl lg:text-2xl font-bold text-accent mb-1">
                            {threadData().title}
                          </h1>
                          <p class="text-sm text-primary-400">
                            {threadData().authorName} · {timeAgo(threadData().createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Thread Body */}
                    <div class="p-6">
                      <div class="prose prose-invert max-w-none">
                        <p class="text-primary-200 whitespace-pre-wrap">
                          {threadData().content}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  <div class="mb-6">
                    <h2 class="text-lg font-semibold text-primary-200 mb-4">
                      Respuestas ({threadData().replyCount})
                    </h2>

                    <Show
                      when={!postsData.loading}
                      fallback={
                        <div class="bg-bg-300 rounded-xl p-6 border border-primary-700/30 text-center">
                          <p class="text-primary-400">Cargando respuestas...</p>
                        </div>
                      }
                    >
                      <Show
                        when={postsData()?.items.length}
                        fallback={
                          <div class="bg-bg-300 rounded-xl p-6 border border-primary-700/30 text-center">
                            <p class="text-primary-400">No hay respuestas aún. ¡Sé el primero en responder!</p>
                          </div>
                        }
                      >
                        <div class="space-y-4">
                          <For each={postsData()?.items}>
                            {(post) => <PostCard post={post} timeAgo={timeAgo} />}
                          </For>
                        </div>
                      </Show>
                    </Show>
                  </div>

                  {/* Reply Form */}
                  <Show when={!threadData().isLocked}>
                    <div class="bg-bg-300 rounded-xl p-6 border border-primary-700/30">
                      <h3 class="text-lg font-semibold text-primary-200 mb-4">
                        Responder
                      </h3>
                      <form onSubmit={handleSubmitReply} class="space-y-4">
                        <textarea
                          value={replyContent()}
                          onInput={(e) => setReplyContent(e.currentTarget.value)}
                          placeholder="Escribe tu respuesta..."
                          rows={5}
                          class="w-full px-4 py-3 bg-bg-200 border border-primary-700/30 rounded-lg text-primary-100 placeholder-primary-500 focus:outline-none focus:border-accent transition-colors resize-none"
                          disabled={isSubmitting()}
                        />

                        {error() && (
                          <div class="p-3 bg-danger-600/20 border border-danger-400/30 rounded-lg">
                            <p class="text-danger-400 text-sm">{error()}</p>
                          </div>
                        )}

                        <div class="flex justify-end">
                          <button
                            type="submit"
                            disabled={isSubmitting()}
                            class="px-6 py-2 bg-accent text-bg-400 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting() ? 'Enviando...' : 'Responder'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Show>

                  <Show when={threadData().isLocked}>
                    <div class="bg-bg-300 rounded-xl p-6 border border-primary-700/30 text-center">
                      <p class="text-primary-400">
                        🔒 Este tema está cerrado y no admite más respuestas.
                      </p>
                    </div>
                  </Show>
                </>
              )}
            </Show>
          </div>
        </div>
      </Content>
      <BottomNav activeTab="home" />
    </div>
  )
}

function PostCard(props: { post: Post; timeAgo: (date: Date) => string }) {
  return (
    <div class="bg-bg-300 rounded-xl border border-primary-700/30 overflow-hidden">
      <div class="p-4 lg:p-6">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center shrink-0 overflow-hidden">
            <Show
              when={props.post.authorPicture}
              fallback={
                <span class="text-accent font-semibold text-sm">
                  {props.post.authorName.charAt(0).toUpperCase()}
                </span>
              }
            >
              <img
                src={props.post.authorPicture}
                alt={props.post.authorName}
                class="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </Show>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-semibold text-primary-100 text-sm">
                {props.post.authorName}
              </span>
              <span class="text-xs text-primary-500">
                {props.timeAgo(props.post.createdAt)}
              </span>
              <Show when={props.post.isEdited}>
                <span class="text-xs text-primary-500">(editado)</span>
              </Show>
            </div>
            <p class="text-primary-200 text-sm lg:text-base whitespace-pre-wrap">
              {props.post.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
