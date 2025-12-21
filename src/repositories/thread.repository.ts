import type {
  Thread,
  CreateThreadInput,
  UpdateThreadInput,
  ThreadListQuery,
  PaginatedResponse,
} from '@/types/forum'
import type { IThreadRepository } from './interfaces'
import { readStorage, writeStorage, generateId } from './file-storage'

export class FileThreadRepository implements IThreadRepository {
  async create(input: CreateThreadInput): Promise<Thread> {
    const storage = readStorage()
    const now = new Date()

    const thread: Thread = {
      id: generateId(),
      forumSlug: input.forumSlug,
      title: input.title,
      content: input.content,
      authorId: input.authorId,
      authorName: input.authorName,
      authorPicture: input.authorPicture,
      createdAt: now,
      updatedAt: now,
      replyCount: 0,
      isPinned: false,
      isLocked: false,
    }

    storage.threads.push(thread)
    writeStorage(storage)

    return thread
  }

  async findById(id: string): Promise<Thread | null> {
    const storage = readStorage()
    return storage.threads.find((t) => t.id === id) ?? null
  }

  async findByForumSlug(query: ThreadListQuery): Promise<PaginatedResponse<Thread>> {
    const storage = readStorage()
    const { forumSlug, page = 1, limit = 20 } = query

    const forumThreads = storage.threads
      .filter((t) => t.forumSlug === forumSlug)
      .sort((a, b) => {
        // Pinned threads first, then by date
        if (a.isPinned !== b.isPinned) {
          return a.isPinned ? -1 : 1
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

    const total = forumThreads.length
    const start = (page - 1) * limit
    const items = forumThreads.slice(start, start + limit)

    return {
      items,
      total,
      page,
      limit,
      hasMore: start + items.length < total,
    }
  }

  async update(input: UpdateThreadInput): Promise<Thread | null> {
    const storage = readStorage()
    const index = storage.threads.findIndex((t) => t.id === input.id)

    if (index === -1) return null

    const thread = storage.threads[index]
    const updated: Thread = {
      ...thread,
      title: input.title ?? thread.title,
      content: input.content ?? thread.content,
      isPinned: input.isPinned ?? thread.isPinned,
      isLocked: input.isLocked ?? thread.isLocked,
      updatedAt: new Date(),
    }

    storage.threads[index] = updated
    writeStorage(storage)

    return updated
  }

  async delete(id: string): Promise<boolean> {
    const storage = readStorage()
    const index = storage.threads.findIndex((t) => t.id === id)

    if (index === -1) return false

    storage.threads.splice(index, 1)
    // Also delete all posts in this thread
    storage.posts = storage.posts.filter((p) => p.threadId !== id)
    writeStorage(storage)

    return true
  }

  async incrementReplyCount(threadId: string, lastReplyAuthor: string): Promise<void> {
    const storage = readStorage()
    const thread = storage.threads.find((t) => t.id === threadId)

    if (thread) {
      thread.replyCount += 1
      thread.lastReplyAt = new Date()
      thread.lastReplyAuthor = lastReplyAuthor
      writeStorage(storage)
    }
  }

  async findByAuthorId(authorId: string, limit = 10): Promise<Thread[]> {
    const storage = readStorage()
    return storage.threads
      .filter((t) => t.authorId === authorId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  }
}

// Singleton instance
let threadRepository: FileThreadRepository | null = null

export function getThreadRepository(): IThreadRepository {
  if (!threadRepository) {
    threadRepository = new FileThreadRepository()
  }
  return threadRepository
}
