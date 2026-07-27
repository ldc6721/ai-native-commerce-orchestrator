import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { AuthApiError, getSession } from '../api/authApi';
import type { AuthSession } from '../types/auth';
import { authSessionQueryKey, useAuthSession } from './useAuthSession';

vi.mock('../api/authApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../api/authApi')>();
  return {
    ...actual,
    getSession: vi.fn(),
  };
});

const getSessionMock = vi.mocked(getSession);

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 0,
      },
    },
  });

  return function Wrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useAuthSession', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('최초 세션 확인 중에는 loading 상태를 반환한다', async () => {
    let resolveSession: (session: AuthSession) => void = () => undefined;
    getSessionMock.mockReturnValue(
      new Promise<AuthSession>((resolve) => {
        resolveSession = resolve;
      }),
    );

    const { result } = renderHook(() => useAuthSession(), {
      wrapper: createWrapper(),
    });

    expect(result.current.authStatus).toBe('loading');
    expect(result.current.user).toBeNull();

    await act(async () => {
      resolveSession({ authenticated: false, user: null });
    });
  });

  it('인증 세션의 사용자와 authenticated 상태를 반환한다', async () => {
    getSessionMock.mockResolvedValue({
      authenticated: true,
      user: {
        id: 'user-1',
        email: 'buyer@example.com',
        displayName: '구매자',
      },
    });

    const { result } = renderHook(() => useAuthSession(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.authStatus).toBe('authenticated'));
    expect(result.current.user).toEqual({
      id: 'user-1',
      email: 'buyer@example.com',
      displayName: '구매자',
    });
    expect(authSessionQueryKey).toEqual(['auth', 'session']);
  });

  it('세션이 없으면 anonymous 상태를 반환한다', async () => {
    getSessionMock.mockResolvedValue({ authenticated: false, user: null });

    const { result } = renderHook(() => useAuthSession(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.authStatus).toBe('anonymous'));
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('4xx 계약 오류는 재시도하지 않는다', async () => {
    const error = new AuthApiError('AUTH_SESSION_REQUIRED', 401);
    getSessionMock.mockRejectedValue(error);

    const { result } = renderHook(() => useAuthSession(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.authStatus).toBe('error'));
    expect(getSessionMock).toHaveBeenCalledOnce();
    expect(result.current.error).toBe(error);
  });

  it('세션 오류를 한 번 재시도한 뒤 error 상태로 유지한다', async () => {
    const error = new AuthApiError('AUTH_UNEXPECTED_ERROR', null);
    getSessionMock.mockRejectedValue(error);

    const { result } = renderHook(() => useAuthSession(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.authStatus).toBe('error'));
    expect(getSessionMock).toHaveBeenCalledTimes(2);
    expect(result.current.error).toBe(error);
    expect(result.current.user).toBeNull();
  });
});
