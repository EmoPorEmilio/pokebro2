export interface Env {
  // D1 Database
  DB: D1Database

  // Durable Objects
  SESSIONS: DurableObjectNamespace

  // Secrets
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  APP_URL: string
}

declare global {
  interface CloudflareEnv extends Env {}
}
