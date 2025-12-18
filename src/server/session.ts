import type { Env } from '../types/env'
import type { SessionData } from './session-do'

const SESSION_COOKIE_NAME = 'pokeforos_session'

export function getSessionId(request: Request): string | null {
  const cookie = request.headers.get('Cookie')
  if (!cookie) return null

  const match = cookie.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`))
  return match ? match[1] : null
}

export function generateSessionId(): string {
  return crypto.randomUUID()
}

export function createSessionCookie(sessionId: string, maxAge = 7 * 24 * 60 * 60): string {
  return `${SESSION_COOKIE_NAME}=${sessionId}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`
}

export function deleteSessionCookie(): string {
  return `${SESSION_COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
}

export async function getSession(request: Request, env: Env): Promise<SessionData | null> {
  const sessionId = getSessionId(request)
  if (!sessionId) return null

  const id = env.SESSIONS.idFromName(sessionId)
  const stub = env.SESSIONS.get(id)

  const response = await stub.fetch(new Request('http://internal/get'))
  const data = await response.json<{ session: SessionData | null }>()

  return data.session
}

export async function createSession(
  sessionId: string,
  userData: { userId: string; email: string; name: string; picture?: string },
  env: Env
): Promise<void> {
  const id = env.SESSIONS.idFromName(sessionId)
  const stub = env.SESSIONS.get(id)

  await stub.fetch(
    new Request('http://internal/set', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  )
}

export async function deleteSession(sessionId: string, env: Env): Promise<void> {
  const id = env.SESSIONS.idFromName(sessionId)
  const stub = env.SESSIONS.get(id)

  await stub.fetch(new Request('http://internal/delete'))
}
