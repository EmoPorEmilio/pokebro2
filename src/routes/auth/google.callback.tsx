import { createFileRoute, redirect } from '@tanstack/solid-router'
import { createServerFn } from '@tanstack/solid-start'
import { getRequestUrl, getCookie, setCookie, deleteCookie } from '@tanstack/solid-start/server'
import { env } from 'cloudflare:workers'
import { createGoogleOAuth, fetchGoogleUserInfo } from '@/server/auth/google'
import { createSession, generateSessionId } from '@/server/session'
import { getDb } from '@/server/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { Env } from '@/types/env'

const handleGoogleCallback = createServerFn({ method: 'GET' }).handler(async () => {
  const cfEnv = env as Env

  // Get URL params
  const url = getRequestUrl()
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')

  if (!code || !state) {
    throw redirect({ href: '/?error=missing_params' })
  }

  // Retrieve and validate state from cookie
  const oauthStateCookie = getCookie('oauth_state')
  if (!oauthStateCookie) {
    throw redirect({ href: '/?error=missing_state' })
  }

  let storedData: { state: string; codeVerifier: string }
  try {
    storedData = JSON.parse(oauthStateCookie)
  } catch {
    throw redirect({ href: '/?error=invalid_state' })
  }

  if (storedData.state !== state) {
    throw redirect({ href: '/?error=state_mismatch' })
  }

  const google = createGoogleOAuth(cfEnv)

  // Exchange code for tokens
  const tokens = await google.validateAuthorizationCode(code, storedData.codeVerifier)
  const accessToken = tokens.accessToken()

  // Fetch user info from Google
  const googleUser = await fetchGoogleUserInfo(accessToken)

  if (!googleUser.email_verified) {
    throw redirect({ href: '/?error=email_not_verified' })
  }

  // Upsert user in D1
  const db = getDb(cfEnv)
  const existingUser = await db.select().from(users).where(eq(users.id, googleUser.sub)).get()

  if (existingUser) {
    await db
      .update(users)
      .set({
        name: googleUser.name,
        picture: googleUser.picture,
        updatedAt: new Date(),
      })
      .where(eq(users.id, googleUser.sub))
  } else {
    await db.insert(users).values({
      id: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    })
  }

  // Create session in Durable Object
  const sessionId = generateSessionId()
  await createSession(
    sessionId,
    {
      userId: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    },
    cfEnv
  )

  // Clear oauth state cookie, set session cookie
  deleteCookie('oauth_state', { path: '/' })
  setCookie('pokeforos_session', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })

  throw redirect({ href: '/' })
})

export const Route = createFileRoute('/auth/google/callback')({
  loader: () => handleGoogleCallback(),
  component: () => null,
})
