import { createFileRoute, redirect } from '@tanstack/solid-router'
import { createServerFn } from '@tanstack/solid-start'
import { setCookie } from '@tanstack/solid-start/server'
import { env } from 'cloudflare:workers'
import { generateState, generateCodeVerifier } from 'arctic'
import { createGoogleOAuth } from '@/server/auth/google'
import type { Env } from '@/types/env'

const initiateGoogleAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const cfEnv = env as Env
  const google = createGoogleOAuth(cfEnv)

  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  const url = google.createAuthorizationURL(state, codeVerifier, ['openid', 'email', 'profile'])

  // Store state and verifier in a short-lived cookie (10 minutes)
  const stateData = JSON.stringify({ state, codeVerifier })
  setCookie('oauth_state', stateData, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  })

  throw redirect({
    href: url.toString(),
  })
})

export const Route = createFileRoute('/auth/google/')({
  loader: () => initiateGoogleAuth(),
  component: () => null,
})
