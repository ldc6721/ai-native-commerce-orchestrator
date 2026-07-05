import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  const createReply = () => {
    const headers = new Map<string, string>();
    const reply = {
      header: jest.fn((name: string, value: string) => {
        headers.set(name, value);
        return reply;
      }),
    } as unknown as FastifyReply;
    return { reply, headers };
  };

  const createRequest = (cookie?: string) =>
    ({ headers: { cookie } }) as FastifyRequest;

  const service = {
    login: jest.fn(),
    logout: jest.fn(),
    sessionStatus: jest.fn(),
    currentUser: jest.fn(),
  } as unknown as jest.Mocked<AuthService>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets an http-only session cookie on login', async () => {
    service.login.mockResolvedValue({
      authenticated: true,
      sessionId: 'session-1',
      ttlSeconds: 604800,
      user: {
        id: 'user-1',
        email: 'buyer@example.com',
        displayName: 'Buyer',
      },
    });
    const controller = new AuthController(service);
    const { reply, headers } = createReply();

    const response = await controller.login(
      { email: 'buyer@example.com', password: 'valid-password' },
      reply,
    );

    expect(response).toEqual({
      authenticated: true,
      user: {
        id: 'user-1',
        email: 'buyer@example.com',
        displayName: 'Buyer',
      },
    });
    expect(headers.get('Set-Cookie')).toContain('sid=session-1');
    expect(headers.get('Set-Cookie')).toContain('HttpOnly');
    expect(headers.get('Set-Cookie')).toContain('SameSite=Lax');
    expect(headers.get('Set-Cookie')).toContain('Max-Age=604800');
  });

  it('passes the session cookie to session status', async () => {
    service.sessionStatus.mockResolvedValue({
      authenticated: true,
      user: {
        id: 'user-1',
        email: 'buyer@example.com',
        displayName: 'Buyer',
      },
    });
    const controller = new AuthController(service);

    await controller.session(createRequest('sid=session-1; theme=dark'));

    expect(service.sessionStatus).toHaveBeenCalledWith('session-1');
  });

  it('clears the session cookie on logout', async () => {
    service.logout.mockResolvedValue({ authenticated: false });
    const controller = new AuthController(service);
    const { reply, headers } = createReply();

    const response = await controller.logout(createRequest('sid=session-1'), reply);

    expect(response).toEqual({ authenticated: false });
    expect(service.logout).toHaveBeenCalledWith('session-1');
    expect(headers.get('Set-Cookie')).toContain('sid=');
    expect(headers.get('Set-Cookie')).toContain('Max-Age=0');
  });
});
