# Stack

**Bun** | **TanStack Start** | **SolidJS** | **Tailwind v4** | **Vite** | **Cloudflare Workers**

## Commands
```bash
bun install   # install
bun run dev   # dev server :3000
bun run build # production build
bun run deploy # deploy to cloudflare
```

## Structure
- `src/routes/` - file-based routing
- `src/components/` - Solid components
- `src/styles.css` - Tailwind config (@theme)
- `src/server/` - server-side code (auth, db, sessions)
- `src/context/` - Solid context providers
- `src/db/` - Drizzle ORM schema
- `src/types/` - TypeScript type definitions

## Authentication Plan

### Architecture
```
Browser (SolidJS) → Cloudflare Worker (TanStack Start) → Google OAuth (Arctic)
                              ↓
         ┌──────────────────────────────────────┐
         ↓                    ↓                 ↓
   Durable Objects       D1 (SQLite)        Secrets
   (Sessions)         (users/game_records)   (env)
```

### Database Schema (D1)

**users**
- `id` TEXT PRIMARY KEY (Google sub)
- `email` TEXT NOT NULL UNIQUE
- `name` TEXT NOT NULL
- `picture` TEXT
- `created_at` INTEGER
- `updated_at` INTEGER

**game_records**
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `user_id` TEXT REFERENCES users(id)
- `game_mode` TEXT ('pokemon-guesser' | 'damage-calculator')
- `difficulty` TEXT ('FACIL' | 'DIFICIL')
- `score` INTEGER
- `level` INTEGER
- `time_played` INTEGER (seconds)
- `completed_at` INTEGER

### New Files to Create
```
src/
├── context/
│   └── auth.tsx              # AuthProvider + useAuth hook
├── db/
│   └── schema.ts             # Drizzle ORM schema
├── routes/auth/
│   ├── google.tsx            # Initiate OAuth
│   ├── google.callback.tsx   # Handle callback
│   └── logout.tsx            # Clear session
├── server/
│   ├── auth/google.ts        # Arctic OAuth setup
│   ├── db.ts                 # Drizzle D1 client
│   ├── game-records.ts       # saveGameRecord, getUserStats
│   ├── session.ts            # Session cookie helpers
│   └── session-do.ts         # Durable Object class
├── types/
│   └── env.d.ts              # Cloudflare env types
drizzle/
└── 0000_initial.sql          # Migration
```

### Dependencies to Install
```bash
bun add arctic drizzle-orm
bun add -D drizzle-kit
```

### Wrangler Setup
1. Create D1: `wrangler d1 create pokeforos-db`
2. Set secrets:
   - `wrangler secret put GOOGLE_CLIENT_ID`
   - `wrangler secret put GOOGLE_CLIENT_SECRET`
   - `wrangler secret put APP_URL`

### OAuth Flow
1. User clicks "Sign in with Google"
2. `/auth/google` → generates state + PKCE, redirects to Google
3. Google redirects to `/auth/google/callback?code=...`
4. Callback validates, exchanges code for tokens
5. Fetches user info, upserts in D1
6. Creates session in Durable Object
7. Sets HttpOnly session cookie, redirects home

### Security
- Google credentials as Worker secrets
- HttpOnly, Secure, SameSite=Lax cookies
- OAuth state parameter validation
- PKCE for additional security
- 7-day session expiry
