/// <reference types="vite/client" />
import { Suspense, type JSX } from 'solid-js'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/solid-router'
import { HydrationScript } from 'solid-js/web'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import '@/styles.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes default
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'PokéBro 2' },
      { name: 'description', content: 'WebApp de Juegos Pokémon' },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800&family=Sen:wght@400;700;800&display=swap'
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument(props: { children: JSX.Element }) {
  return (
    <html lang="es">
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body class="font-jost">
        <QueryClientProvider client={queryClient}>
          <Suspense>{props.children}</Suspense>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
