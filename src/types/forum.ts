// Forum Types

export interface User {
  id: string
  name: string
  picture?: string
  email?: string
  createdAt: Date
}

export interface Forum {
  slug: string
  title: string
  description: string
  categoryName: string
}

export interface Thread {
  id: string
  forumSlug: string
  title: string
  content: string
  authorId: string
  authorName: string
  authorPicture?: string
  createdAt: Date
  updatedAt: Date
  replyCount: number
  lastReplyAt?: Date
  lastReplyAuthor?: string
  isPinned: boolean
  isLocked: boolean
}

export interface Post {
  id: string
  threadId: string
  content: string
  authorId: string
  authorName: string
  authorPicture?: string
  createdAt: Date
  updatedAt: Date
  isEdited: boolean
}

// Input types for creating/updating
export interface CreateThreadInput {
  forumSlug: string
  title: string
  content: string
  authorId: string
  authorName: string
  authorPicture?: string
}

export interface CreatePostInput {
  threadId: string
  content: string
  authorId: string
  authorName: string
  authorPicture?: string
}

export interface UpdateThreadInput {
  id: string
  title?: string
  content?: string
  isPinned?: boolean
  isLocked?: boolean
}

export interface UpdatePostInput {
  id: string
  content: string
}

// Query types
export interface ThreadListQuery {
  forumSlug: string
  page?: number
  limit?: number
}

export interface PostListQuery {
  threadId: string
  page?: number
  limit?: number
}

// Response types
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface ThreadWithPosts extends Thread {
  posts: Post[]
}
