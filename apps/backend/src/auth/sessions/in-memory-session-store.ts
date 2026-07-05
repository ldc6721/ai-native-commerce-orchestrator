import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateSessionInput, SessionRecord, SessionStore } from './session-store';

@Injectable()
export class InMemorySessionStore implements SessionStore {
  private readonly sessions = new Map<string, SessionRecord>();

  async create(input: CreateSessionInput): Promise<SessionRecord> {
    const session: SessionRecord = {
      id: randomUUID(),
      userId: input.userId,
      expiresAt: new Date(Date.now() + input.ttlSeconds * 1000),
    };
    this.sessions.set(session.id, session);
    return session;
  }

  async find(sessionId: string): Promise<SessionRecord | null> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return null;
    }
    if (session.expiresAt.getTime() <= Date.now()) {
      this.sessions.delete(sessionId);
      return null;
    }
    return session;
  }

  async delete(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
  }
}
