import { createServerFn } from '@tanstack/solid-start'
import { getCookie } from '@tanstack/solid-start/server'
import { env } from 'cloudflare:workers'
import { getSession } from './session'
import { getDb } from './db'
import { gameRecords } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import type { Env } from '@/types/env'
import type { NewGameRecord } from '@/db/schema'

export interface SaveGameRecordInput {
  gameMode: 'pokemon-guesser' | 'damage-calculator'
  difficulty?: string
  score: number
  level: number
  timePlayed: number
}

export const saveGameRecord = createServerFn({ method: 'POST' }).handler(
  async (ctx: { data: SaveGameRecordInput }): Promise<{ saved: boolean; reason?: string }> => {
    const data = ctx.data
    const cfEnv = env as Env
    const sessionId = getCookie('pokeforos_session')

    if (!sessionId) {
      return { saved: false, reason: 'not_authenticated' }
    }

    const session = await getSession(
      new Request('http://internal', {
        headers: { Cookie: `pokeforos_session=${sessionId}` },
      }),
      cfEnv
    )

    if (!session) {
      return { saved: false, reason: 'invalid_session' }
    }

    const db = getDb(cfEnv)

    const record: NewGameRecord = {
      userId: session.userId,
      gameMode: data.gameMode,
      difficulty: data.difficulty ?? null,
      score: data.score,
      level: data.level,
      timePlayed: data.timePlayed,
    }

    await db.insert(gameRecords).values(record)

    return { saved: true }
  }
)

export const getUserGameRecords = createServerFn({ method: 'GET' }).handler(async () => {
  const cfEnv = env as Env
  const sessionId = getCookie('pokeforos_session')

  if (!sessionId) {
    return { records: [] as typeof gameRecords.$inferSelect[], authenticated: false }
  }

  const session = await getSession(
    new Request('http://internal', {
      headers: { Cookie: `pokeforos_session=${sessionId}` },
    }),
    cfEnv
  )

  if (!session) {
    return { records: [] as typeof gameRecords.$inferSelect[], authenticated: false }
  }

  const db = getDb(cfEnv)

  const records = await db
    .select()
    .from(gameRecords)
    .where(eq(gameRecords.userId, session.userId))
    .orderBy(desc(gameRecords.completedAt))
    .limit(10)

  return { records, authenticated: true }
})

export const getUserStats = createServerFn({ method: 'GET' }).handler(async () => {
  const cfEnv = env as Env
  const sessionId = getCookie('pokeforos_session')

  if (!sessionId) {
    return null
  }

  const session = await getSession(
    new Request('http://internal', {
      headers: { Cookie: `pokeforos_session=${sessionId}` },
    }),
    cfEnv
  )

  if (!session) {
    return null
  }

  const db = getDb(cfEnv)

  const records = await db.select().from(gameRecords).where(eq(gameRecords.userId, session.userId))

  const pokemonGuesserRecords = records.filter((r) => r.gameMode === 'pokemon-guesser')
  const damageCalculatorRecords = records.filter((r) => r.gameMode === 'damage-calculator')

  const stats = {
    totalGames: records.length,
    totalScore: records.reduce((sum, r) => sum + r.score, 0),
    highScorePokemonGuesser:
      pokemonGuesserRecords.length > 0 ? Math.max(...pokemonGuesserRecords.map((r) => r.score)) : 0,
    highScoreDamageCalculator:
      damageCalculatorRecords.length > 0 ? Math.max(...damageCalculatorRecords.map((r) => r.score)) : 0,
    averageScore:
      records.length > 0 ? Math.round(records.reduce((sum, r) => sum + r.score, 0) / records.length) : 0,
  }

  return stats
})
