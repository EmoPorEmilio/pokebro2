import { createContext, useContext, createResource, type JSX, type Accessor } from 'solid-js'
import { createServerFn } from '@tanstack/solid-start'
import { getCookie } from '@tanstack/solid-start/server'
import { env } from 'cloudflare:workers'
import { getSession } from '@/server/session'
import type { Env } from '@/types/env'

export interface AuthUser {
  userId: string
  email: string
  name: string
  picture?: string
}

interface AuthContextValue {
  user: Accessor<AuthUser | null | undefined>
}

const AuthContext = createContext<AuthContextValue>()

const getAuthUser = createServerFn({ method: 'GET' }).handler(async (): Promise<AuthUser | null> => {
  const cfEnv = env as Env
  const sessionId = getCookie('pokeforos_session')

  if (!sessionId) return null

  const session = await getSession(
    new Request('http://internal', {
      headers: { Cookie: `pokeforos_session=${sessionId}` },
    }),
    cfEnv
  )

  if (!session) return null

  return {
    userId: session.userId,
    email: session.email,
    name: session.name,
    picture: session.picture,
  }
})

export function AuthProvider(props: { children: JSX.Element }) {
  const [user] = createResource(() => getAuthUser())

  const value: AuthContextValue = {
    user: () => user(),
  }

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
