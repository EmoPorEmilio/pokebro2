import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// Users table - stores Google OAuth user info
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // Google sub (unique ID)
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  picture: text('picture'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

// Game records table - stores completed game sessions
export const gameRecords = sqliteTable('game_records', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  gameMode: text('game_mode').notNull(), // 'pokemon-guesser' | 'damage-calculator'
  difficulty: text('difficulty'), // 'FACIL' | 'DIFICIL' (nullable)
  score: integer('score').notNull(),
  level: integer('level').notNull(),
  timePlayed: integer('time_played').notNull(), // seconds
  completedAt: integer('completed_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

// Type exports
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type GameRecord = typeof gameRecords.$inferSelect
export type NewGameRecord = typeof gameRecords.$inferInsert
