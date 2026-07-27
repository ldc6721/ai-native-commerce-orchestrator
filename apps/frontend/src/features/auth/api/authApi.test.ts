import { getSession, login, logout } from './authApi';

const fetchMock = vi.fn<typeof fetch>();

function response(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(body),
  } as unknown as Response;
}

describe('authApi', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('로그인 요청에 JSON body와 cookie credential을 포함한다', async () => {
    fetchMock.mockResolvedValue(
      response({
        authenticated: true,
        user: {
          id: 'user-1',
          email: 'buyer@example.com',
          displayName: '구매자',
        },
      }),
    );

    await expect(
      login({ email: 'buyer@example.com', password: 'valid-password' }),
    ).resolves.toMatchObject({ authenticated: true });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [path, options] = fetchMock.mock.calls[0];
    expect(path).toBe('/api/auth/login');
    expect(options).toMatchObject({
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: 'buyer@example.com',
        password: 'valid-password',
      }),
    });
    expect(new Headers(options?.headers).get('Content-Type')).toBe('application/json');
    expect(new Headers(options?.headers).get('Accept')).toBe('application/json');
  });

  it('로그아웃은 빈 POST 요청과 cookie credential을 사용한다', async () => {
    fetchMock.mockResolvedValue(response({ authenticated: false }));

    await expect(logout()).resolves.toEqual({ authenticated: false });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/auth/logout',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
      }),
    );
    expect(fetchMock.mock.calls[0][1]?.body).toBeUndefined();
  });

  it.each([
    [
      '인증 세션',
      {
        authenticated: true,
        user: {
          id: 'user-1',
          email: 'buyer@example.com',
          displayName: '구매자',
        },
      },
    ],
    ['익명 세션', { authenticated: false, user: null }],
  ])('%s 응답을 계약 타입으로 반환한다', async (_label, session) => {
    fetchMock.mockResolvedValue(response(session));

    await expect(getSession()).resolves.toEqual(session);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/auth/session',
      expect.objectContaining({ method: 'GET', credentials: 'include' }),
    );
  });

  it('서버 오류 코드는 안전한 사용자 메시지로 정규화한다', async () => {
    fetchMock.mockResolvedValue(
      response(
        {
          code: 'AUTH_INVALID_CREDENTIALS',
          message: '서버 내부 credential 상세',
        },
        401,
      ),
    );

    await expect(
      login({ email: 'buyer@example.com', password: 'wrong-password' }),
    ).rejects.toMatchObject({
      name: 'AuthApiError',
      code: 'AUTH_INVALID_CREDENTIALS',
      status: 401,
      message: '이메일 또는 비밀번호를 확인해 주세요.',
    });
  });

  it('알 수 없는 오류 body는 예상하지 못한 오류로 정규화한다', async () => {
    fetchMock.mockResolvedValue(response({ detail: 'database unavailable' }, 500));

    await expect(getSession()).rejects.toMatchObject({
      code: 'AUTH_UNEXPECTED_ERROR',
      status: 500,
    });
  });

  it('계약과 다른 성공 응답을 오류로 처리한다', async () => {
    fetchMock.mockResolvedValue(response({ authenticated: true, user: null }));

    await expect(getSession()).rejects.toMatchObject({
      name: 'AuthApiError',
      code: 'AUTH_UNEXPECTED_ERROR',
      status: 200,
    });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('네트워크 실패를 status 없는 예상하지 못한 오류로 정규화한다', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(getSession()).rejects.toMatchObject({
      code: 'AUTH_UNEXPECTED_ERROR',
      status: null,
    });
  });
});
