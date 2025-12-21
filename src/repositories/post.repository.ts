import type {
  Post,
  CreatePostInput,
  UpdatePostInput,
  PostListQuery,
  PaginatedResponse,
} from '@/types/forum'
import type { IPostRepository } from './interfaces'
import { readStorage, writeStorage, generateId } from './file-storage'

export class FilePostRepository implements IPostRepository {
  async create(input: CreatePostInput): Promise<Post> {
    const storage = readStorage()
    const now = new Date()

    const post: Post = {
      id: generateId(),
      threadId: input.threadId,
      content: input.content,
      authorId: input.authorId,
      authorName: input.authorName,
      authorPicture: input.authorPicture,
      createdAt: now,
      updatedAt: now,
      isEdited: false,
    }

    storage.posts.push(post)
    writeStorage(storage)

    return post
  }

  async findById(id: string): Promise<Post | null> {
    const storage = readStorage()
    return storage.posts.find((p) => p.id === id) ?? null
  }

  async findByThreadId(query: PostListQuery): Promise<PaginatedResponse<Post>> {
    const storage = readStorage()
    const { threadId, page = 1, limit = 20 } = query

    const threadPosts = storage.posts
      .filter((p) => p.threadId === threadId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    const total = threadPosts.length
    const start = (page - 1) * limit
    const items = threadPosts.slice(start, start + limit)

    return {
      items,
      total,
      page,
      limit,
      hasMore: start + items.length < total,
    }
  }

  async update(input: UpdatePostInput): Promise<Post | null> {
    const storage = readStorage()
    const index = storage.posts.findIndex((p) => p.id === input.id)

    if (index === -1) return null

    const post = storage.posts[index]
    const updated: Post = {
      ...post,
      content: input.content,
      updatedAt: new Date(),
      isEdited: true,
    }

    storage.posts[index] = updated
    writeStorage(storage)

    return updated
  }

  async delete(id: string): Promise<boolean> {
    const storage = readStorage()
    const index = storage.posts.findIndex((p) => p.id === id)

    if (index === -1) return false

    storage.posts.splice(index, 1)
    writeStorage(storage)

    return true
  }

  async findByAuthorId(authorId: string, limit = 10): Promise<Post[]> {
    const storage = readStorage()
    return storage.posts
      .filter((p) => p.authorId === authorId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  }
}

// Singleton instance
let postRepository: FilePostRepository | null = null

export function getPostRepository(): IPostRepository {
  if (!postRepository) {
    postRepository = new FilePostRepository()
  }
  return postRepository
}
