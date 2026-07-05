import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { AuthHttpException } from './auth.errors';
import {
  AuthenticatedSessionResponse,
  LoginRequest,
  SessionStatusResponse,
  UserSummary,
} from './auth.types';
import {
  PASSWORD_HASHER,
  SESSION_STORE,
  USER_CREDENTIALS_REPOSITORY,
} from './auth.tokens';
import { PasswordHasher } from './password/password-hasher';
import { SessionStore } from './sessions/session-store';
import { UserCredentialsRepository } from './users/user-credentials.repository';

export const AUTH_SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

export interface LoginResult extends AuthenticatedSessionResponse {
  sessionId: string;
  ttlSeconds: number;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_CREDENTIALS_REPOSITORY)
    private readonly users: UserCredentialsRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
    @Inject(SESSION_STORE)
    private readonly sessionStore: SessionStore,
  ) {}

  async login(request: LoginRequest): Promise<LoginResult> {
    this.validateLoginRequest(request);
    const email = request.email.trim().toLowerCase();
    const user = await this.users.findByEmail(email);
    if (!user) {
      throw this.invalidCredentials();
    }
    const validPassword = await this.passwordHasher.verify(
      user.passwordHash,
      request.password,
    );
    if (!validPassword) {
      throw this.invalidCredentials();
    }
    const session = await this.sessionStore.create({
      userId: user.id,
      ttlSeconds: AUTH_SESSION_TTL_SECONDS,
    });
    return {
      authenticated: true,
      sessionId: session.id,
      ttlSeconds: AUTH_SESSION_TTL_SECONDS,
      user: this.toUserSummary(user),
    };
  }

  async logout(sessionId: string | null): Promise<{ authenticated: false }> {
    if (sessionId) {
      await this.sessionStore.delete(sessionId);
    }
    return { authenticated: false };
  }

  async sessionStatus(sessionId: string | null): Promise<SessionStatusResponse> {
    if (!sessionId) {
      return { authenticated: false, user: null };
    }
    const session = await this.sessionStore.find(sessionId);
    if (!session) {
      return { authenticated: false, user: null };
    }
    const user = await this.users.findById(session.userId);
    if (!user) {
      return { authenticated: false, user: null };
    }
    return { authenticated: true, user: this.toUserSummary(user) };
  }

  async currentUser(sessionId: string | null): Promise<{ user: UserSummary }> {
    const session = await this.sessionStatus(sessionId);
    if (!session.authenticated) {
      throw new AuthHttpException(
        'AUTH_SESSION_REQUIRED',
        'Authentication session is required.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { user: session.user };
  }

  private validateLoginRequest(request: LoginRequest): void {
    if (!request || typeof request.email !== 'string') {
      throw this.invalidRequest();
    }
    if (typeof request.password !== 'string') {
      throw this.invalidRequest();
    }
    const email = request.email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      throw this.invalidRequest();
    }
    if (request.password.length < 8) {
      throw this.invalidRequest();
    }
  }

  private invalidRequest(): AuthHttpException {
    return new AuthHttpException(
      'AUTH_INVALID_REQUEST',
      'Invalid authentication request.',
      HttpStatus.BAD_REQUEST,
    );
  }

  private invalidCredentials(): AuthHttpException {
    return new AuthHttpException(
      'AUTH_INVALID_CREDENTIALS',
      'Invalid email or password.',
      HttpStatus.UNAUTHORIZED,
    );
  }

  private toUserSummary(user: UserSummary): UserSummary {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
    };
  }
}
