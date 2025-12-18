import { createFileRoute, redirect } from '@tanstack/solid-router'
import { createServerFn } from '@tanstack/solid-start'
import { getCookie, deleteCookie } from '@tanstack/solid-start/server'
import { env } from 'cloudflare:workers'
import { deleteSession } from '@/server/session'
import type { Env } from '@/types/env'

const handleLogout = createServerFn({ method: 'GET' }).handler(async () => {
  const cfEnv = env as Env
  const sessionId = getCookie('pokeforos_session')

  if (sessionId) {
    await deleteSession(sessionId, cfEnv)
  }

  deleteCookie('pokeforos_session', { path: '/' })

  throw redirect({ href: '/' })
})

export const Route = createFileRoute('/auth/logout')({
  loader: () => handleLogout(),
  component: () => null,
})
