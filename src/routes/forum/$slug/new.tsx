import { createFileRoute, Link, useNavigate } from '@tanstack/solid-router'
import { createSignal } from 'solid-js'
import { Header, Content, BottomNav } from '@/components'
import { createThread } from '@/server/threads'

export const Route = createFileRoute('/forum/$slug/new')({
  component: NewThreadPage,
})

function NewThreadPage() {
  const { slug } = Route.useParams()
  const navigate = useNavigate()

  const [title, setTitle] = createSignal('')
  const [content, setContent] = createSignal('')
  const [isSubmitting, setIsSubmitting] = createSignal(false)
  const [error, setError] = createSignal('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')

    if (!title().trim()) {
      setError('El título es requerido')
      return
    }

    if (!content().trim()) {
      setError('El contenido es requerido')
      return
    }

    setIsSubmitting(true)

    try {
      // For now, use a mock user - in production this would come from auth
      const mockUser = {
        id: 'guest-user',
        name: 'Invitado',
      }

      const thread = await createThread({
        data: {
          forumSlug: slug(),
          title: title().trim(),
          content: content().trim(),
          authorId: mockUser.id,
          authorName: mockUser.name,
        },
      })

      // Navigate to the new thread
      navigate({
        to: '/forum/$slug/thread/$threadId',
        params: { slug: slug(), threadId: thread.id },
      })
    } catch (err) {
      setError('Error al crear el tema. Intenta de nuevo.')
      setIsSubmitting(false)
    }
  }

  return (
    <div class="flex flex-col h-dvh w-dvw bg-bg-400 antialiased overflow-hidden">
      <Header inGame={false} />
      <Content>
        <div class="flex-1 w-full overflow-y-auto custom-scrollbar">
          <div class="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              <span class="text-primary-200">Nuevo tema</span>
            </nav>

            {/* Form */}
            <div class="bg-bg-300 rounded-xl p-6 border border-primary-700/30">
              <h1 class="text-2xl font-bold text-accent mb-6">Crear nuevo tema</h1>

              <form onSubmit={handleSubmit} class="space-y-6">
                {/* Title */}
                <div>
                  <label for="title" class="block text-sm font-medium text-primary-200 mb-2">
                    Título
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title()}
                    onInput={(e) => setTitle(e.currentTarget.value)}
                    placeholder="Escribe un título descriptivo..."
                    class="w-full px-4 py-3 bg-bg-200 border border-primary-700/30 rounded-lg text-primary-100 placeholder-primary-500 focus:outline-none focus:border-accent transition-colors"
                    disabled={isSubmitting()}
                  />
                </div>

                {/* Content */}
                <div>
                  <label for="content" class="block text-sm font-medium text-primary-200 mb-2">
                    Contenido
                  </label>
                  <textarea
                    id="content"
                    value={content()}
                    onInput={(e) => setContent(e.currentTarget.value)}
                    placeholder="Escribe el contenido de tu tema..."
                    rows={10}
                    class="w-full px-4 py-3 bg-bg-200 border border-primary-700/30 rounded-lg text-primary-100 placeholder-primary-500 focus:outline-none focus:border-accent transition-colors resize-none"
                    disabled={isSubmitting()}
                  />
                </div>

                {/* Error */}
                {error() && (
                  <div class="p-3 bg-danger-600/20 border border-danger-400/30 rounded-lg">
                    <p class="text-danger-400 text-sm">{error()}</p>
                  </div>
                )}

                {/* Actions */}
                <div class="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => navigate({ to: '/forum/$slug', params: { slug: slug() } })}
                    class="px-4 py-2 text-primary-300 hover:text-primary-100 transition-colors"
                    disabled={isSubmitting()}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting()}
                    class="px-6 py-2 bg-accent text-bg-400 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting() ? 'Creando...' : 'Crear tema'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Content>
      <BottomNav activeTab="home" />
    </div>
  )
}
