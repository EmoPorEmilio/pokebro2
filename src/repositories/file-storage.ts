import type { Thread, Post } from '@/types/forum'
import * as fs from 'node:fs'
import * as path from 'node:path'

export interface StorageData {
  threads: Thread[]
  posts: Post[]
}

const DATA_FILE = 'forum-data.json'

function getDataPath(): string {
  return path.join(process.cwd(), DATA_FILE)
}

function serializeData(data: StorageData): string {
  return JSON.stringify(data, (key, value) => {
    if (value instanceof Date) {
      return { __type: 'Date', value: value.toISOString() }
    }
    return value
  }, 2)
}

function deserializeData(json: string): StorageData {
  return JSON.parse(json, (key, value) => {
    if (value && typeof value === 'object' && value.__type === 'Date') {
      return new Date(value.value)
    }
    return value
  })
}

export function readStorage(): StorageData {
  const dataPath = getDataPath()

  if (!fs.existsSync(dataPath)) {
    const initialData: StorageData = { threads: [], posts: [] }
    fs.writeFileSync(dataPath, serializeData(initialData), 'utf-8')
    return initialData
  }

  const content = fs.readFileSync(dataPath, 'utf-8')
  return deserializeData(content)
}

export function writeStorage(data: StorageData): void {
  const dataPath = getDataPath()
  fs.writeFileSync(dataPath, serializeData(data), 'utf-8')
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}
