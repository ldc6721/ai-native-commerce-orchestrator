export interface SessionRecord {
  id: string;
  userId: string;
  expiresAt: Date;
}

export interface CreateSessionInput {
  userId: string;
  ttlSeconds: number;
}

export interface SessionStore {
  create(input: CreateSessionInput): Promise<SessionRecord>;
  find(sessionId: string): Promise<SessionRecord | null>;
  delete(sessionId: string): Promise<void>;
}
