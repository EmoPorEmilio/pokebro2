import type {
  Thread,
  Post,
  CreateThreadInput,
  CreatePostInput,
  UpdateThreadInput,
  UpdatePostInput,
  ThreadListQuery,
  PostListQuery,
  PaginatedResponse,
} from '@/types/forum'

export interface IThreadRepository {
  create(input: CreateThreadInput): Promise<Thread>
  findById(id: string): Promise<Thread | null>
  findByForumSlug(query: ThreadListQuery): Promise<PaginatedResponse<Thread>>
  update(input: UpdateThreadInput): Promise<Thread | null>
  delete(id: string): Promise<boolean>
  incrementReplyCount(threadId: string, lastReplyAuthor: string): Promise<void>
}

export interface IPostRepository {
  create(input: CreatePostInput): Promise<Post>
  findById(id: string): Promise<Post | null>
  findByThreadId(query: PostListQuery): Promise<PaginatedResponse<Post>>
  update(input: UpdatePostInput): Promise<Post | null>
  delete(id: string): Promise<boolean>
}

export interface IForumRepository {
  getThreadCount(forumSlug: string): Promise<number>
  getLatestThread(forumSlug: string): Promise<Thread | null>
}
