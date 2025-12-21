import type { Thread, Post } from '@/types/forum'

export interface StorageData {
  threads: Thread[]
  posts: Post[]
}

// In-memory storage for development (persists until server restart)
let inMemoryStorage: StorageData = { threads: [], posts: [] }

export function readStorage(): StorageData {
  return inMemoryStorage
}

export function writeStorage(data: StorageData): void {
  inMemoryStorage = data
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}
