env.d.ts;
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      POKEBRO_DB: D1Database;
    }
  }
}

export {};
