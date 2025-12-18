export interface SessionData {
  userId: string
  email: string
  name: string
  picture?: string
  expiresAt: number
}

export class SessionDO implements DurableObject {
  private session: SessionData | null = null
  private state: DurableObjectState

  constructor(state: DurableObjectState) {
    this.state = state
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const action = url.pathname

    switch (action) {
      case '/get':
        return this.getSession()
      case '/set':
        return this.setSession(request)
      case '/delete':
        return this.deleteSession()
      default:
        return new Response('Not found', { status: 404 })
    }
  }

  private async getSession(): Promise<Response> {
    // Load from storage if not in memory
    if (!this.session) {
      this.session = (await this.state.storage.get<SessionData>('session')) ?? null
    }

    if (!this.session) {
      return Response.json({ session: null })
    }

    // Check expiration (7 days)
    if (Date.now() > this.session.expiresAt) {
      await this.state.storage.delete('session')
      this.session = null
      return Response.json({ session: null })
    }

    return Response.json({ session: this.session })
  }

  private async setSession(request: Request): Promise<Response> {
    const data = (await request.json()) as Omit<SessionData, 'expiresAt'>

    this.session = {
      ...data,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    }

    await this.state.storage.put('session', this.session)

    return Response.json({ success: true })
  }

  private async deleteSession(): Promise<Response> {
    await this.state.storage.delete('session')
    this.session = null
    return Response.json({ success: true })
  }
}
