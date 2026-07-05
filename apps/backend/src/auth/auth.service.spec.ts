import { HttpStatus } from '@nestjs/common';
import { AuthHttpException } from './auth.errors';
import { AuthService, AUTH_SESSION_TTL_SECONDS } from './auth.service';
import { AuthUserRecord } from './auth.types';
import { PasswordHasher } from './password/password-hasher';
import { InMemorySessionStore } from './sessions/in-memory-session-store';
import { UserCredentialsRepository } from './users/user-credentials.repository';

class FakeUsers implements UserCredentialsRepository {
  private readonly usersByEmail = new Map<string, AuthUserRecord>();
  private readonly usersById = new Map<string, AuthUserRecord>();

  constructor(users: AuthUserRecord[]) {
    for (const user of users) {
      this.usersByEmail.set(user.email, user);
      this.usersById.set(user.id, user);
    }
  }

  async findByEmail(email: string): Promise<AuthUserRecord | null> {
    return this.usersByEmail.get(email) ?? null;
  }

  async findById(id: string): Promise<AuthUserRecord | null> {
    return this.usersById.get(id) ?? null;
  }
}

class FakePasswordHasher implements PasswordHasher {
  async verify(hash: string, password: string): Promise<boolean> {
    return hash === 'hash:' + password;
  }
}

describe('AuthService', () => {
  const user: AuthUserRecord = {
    id: 'user-1',
    email: 'buyer@example.com',
    displayName: 'Buyer',
    passwordHash: 'hash:valid-password',
  };

  const createService = () => {
    const store = new InMemorySessionStore();
    const service = new AuthService(
      new FakeUsers([user]),
      new FakePasswordHasher(),
      store,
    );
    return { service, store };
  };

  it('creates a session for valid credentials', async () => {
    const { service, store } = createService();

    const result = await service.login({
      email: 'BUYER@example.com ',
      password: 'valid-password',
    });

    expect(result.authenticated).toBe(true);
    expect(result.ttlSeconds).toBe(AUTH_SESSION_TTL_SECONDS);
    expect(result.user).toEqual({
      id: 'user-1',
      email: 'buyer@example.com',
      displayName: 'Buyer',
    });
    expect(result).not.toHaveProperty('passwordHash');
    await expect(store.find(result.sessionId)).resolves.toMatchObject({
      userId: 'user-1',
    });
  });

  it('rejects invalid credentials with a safe error', async () => {
    const { service } = createService();

    await expect(
      service.login({ email: 'buyer@example.com', password: 'wrong-pass' }),
    ).rejects.toMatchObject({
      response: {
        code: 'AUTH_INVALID_CREDENTIALS',
        message: 'Invalid email or password.',
      },
      status: HttpStatus.UNAUTHORIZED,
    });
  });

  it('returns anonymous session state when no session exists', async () => {
    const { service } = createService();

    await expect(service.sessionStatus(null)).resolves.toEqual({
      authenticated: false,
      user: null,
    });
  });

  it('returns current user for a valid session', async () => {
    const { service } = createService();
    const login = await service.login({
      email: 'buyer@example.com',
      password: 'valid-password',
    });

    await expect(service.currentUser(login.sessionId)).resolves.toEqual({
      user: {
        id: 'user-1',
        email: 'buyer@example.com',
        displayName: 'Buyer',
      },
    });
  });

  it('requires a session for current user', async () => {
    const { service } = createService();

    await expect(service.currentUser(null)).rejects.toBeInstanceOf(
      AuthHttpException,
    );
  });

  it('invalidates a session on logout and allows repeated logout', async () => {
    const { service } = createService();
    const login = await service.login({
      email: 'buyer@example.com',
      password: 'valid-password',
    });

    await expect(service.logout(login.sessionId)).resolves.toEqual({
      authenticated: false,
    });
    await expect(service.sessionStatus(login.sessionId)).resolves.toEqual({
      authenticated: false,
      user: null,
    });
    await expect(service.logout(login.sessionId)).resolves.toEqual({
      authenticated: false,
    });
  });
});
