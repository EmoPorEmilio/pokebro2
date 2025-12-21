import { createServerFn } from '@tanstack/solid-start'
import { getThreadRepository, getPostRepository } from '@/repositories'
import type {
  Thread,
  Post,
  CreateThreadInput,
  CreatePostInput,
  ThreadListQuery,
  PostListQuery,
  PaginatedResponse,
} from '@/types/forum'

// Get threads for a forum
export const getForumThreads = createServerFn({ method: 'GET' }).handler(
  async (ctx: { data: ThreadListQuery }): Promise<PaginatedResponse<Thread>> => {
    const threadRepo = getThreadRepository()
    return threadRepo.findByForumSlug(ctx.data)
  }
)

// Get a single thread by ID
export const getThread = createServerFn({ method: 'GET' }).handler(
  async (ctx: { data: { id: string } }): Promise<Thread | null> => {
    const threadRepo = getThreadRepository()
    return threadRepo.findById(ctx.data.id)
  }
)

// Create a new thread
export const createThread = createServerFn({ method: 'POST' }).handler(
  async (ctx: { data: CreateThreadInput }): Promise<Thread> => {
    const threadRepo = getThreadRepository()
    return threadRepo.create(ctx.data)
  }
)

// Get posts for a thread
export const getThreadPosts = createServerFn({ method: 'GET' }).handler(
  async (ctx: { data: PostListQuery }): Promise<PaginatedResponse<Post>> => {
    const postRepo = getPostRepository()
    return postRepo.findByThreadId(ctx.data)
  }
)

// Create a new post (reply)
export const createPost = createServerFn({ method: 'POST' }).handler(
  async (ctx: { data: CreatePostInput }): Promise<Post> => {
    const threadRepo = getThreadRepository()
    const postRepo = getPostRepository()

    const post = await postRepo.create(ctx.data)

    // Update thread reply count
    await threadRepo.incrementReplyCount(ctx.data.threadId, ctx.data.authorName)

    return post
  }
)

// Get threads created by a specific user
export const getUserThreads = createServerFn({ method: 'GET' }).handler(
  async (ctx: { data: { authorId: string; limit?: number } }): Promise<Thread[]> => {
    const threadRepo = getThreadRepository()
    return threadRepo.findByAuthorId(ctx.data.authorId, ctx.data.limit ?? 10)
  }
)

// Get posts (replies) created by a specific user
export const getUserPosts = createServerFn({ method: 'GET' }).handler(
  async (ctx: { data: { authorId: string; limit?: number } }): Promise<Post[]> => {
    const postRepo = getPostRepository()
    return postRepo.findByAuthorId(ctx.data.authorId, ctx.data.limit ?? 10)
  }
)
