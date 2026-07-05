import { randomUUID } from 'crypto';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { CreateSessionInput, SessionRecord, SessionStore } from './session-store';

@Injectable()
export class RedisSessionStore implements SessionStore, OnModuleDestroy {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379');
  }

  async create(input: CreateSessionInput): Promise<SessionRecord> {
    const session: SessionRecord = {
      id: randomUUID(),
      userId: input.userId,
      expiresAt: new Date(Date.now() + input.ttlSeconds * 1000),
    };
    await this.redis.set(
      this.key(session.id),
      JSON.stringify({ userId: session.userId, expiresAt: session.expiresAt.toISOString() }),
      'EX',
      input.ttlSeconds,
    );
    return session;
  }

  async find(sessionId: string): Promise<SessionRecord | null> {
    const raw = await this.redis.get(this.key(sessionId));
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as { userId: string; expiresAt: string };
    const session: SessionRecord = {
      id: sessionId,
      userId: parsed.userId,
      expiresAt: new Date(parsed.expiresAt),
    };
    if (session.expiresAt.getTime() <= Date.now()) {
      await this.delete(sessionId);
      return null;
    }
    return session;
  }

  async delete(sessionId: string): Promise<void> {
    await this.redis.del(this.key(sessionId));
  }

  async onModuleDestroy() {
    this.redis.disconnect();
  }

  private key(sessionId: string): string {
    return 'auth:session:' + sessionId;
  }
}
