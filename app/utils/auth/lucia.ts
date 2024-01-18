import { lucia } from 'lucia';
import { nextjs_future } from 'lucia/middleware';
import { d1 } from '@lucia-auth/adapter-sqlite';

const d1: (
  database: D1Database,
  tableNames: {
    user: string;
    key: string;
    session: string | null;
  }
) => InitializeAdapter<Adapter>;

// expect error (see next section)
export const auth = lucia({
  env: 'DEV', // "PROD" if deployed to HTTPS
  middleware: nextjs_future(), // NOT nextjs()
  sessionCookie: {
    expires: false,
  },
});

export type Auth = typeof auth;
