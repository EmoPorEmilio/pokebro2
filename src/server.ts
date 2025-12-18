// Custom server entry point for Cloudflare Workers
// Exports both the TanStack Start handler and Durable Objects

import handler, { createServerEntry } from '@tanstack/solid-start/server-entry'

// Re-export Durable Objects so Cloudflare can find them
export { SessionDO } from './server/session-do'

// Default export for the worker's fetch handler
export default createServerEntry({
  fetch(request) {
    return handler.fetch(request)
  },
})
