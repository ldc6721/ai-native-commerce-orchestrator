import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryHistory } from '@tanstack/react-router';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthApiError, getSession, logout } from '../features/auth/api/authApi';
import { createAppRouter } from './router';

vi.mock('../features/auth/api/authApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../features/auth/api/authApi')>();
  return {
    ...actual,
    getSession: vi.fn(),
    logout: vi.fn(),
  };
});

const getSessionMock = vi.mocked(getSession);
const logoutMock = vi.mocked(logout);

function renderRoute(path: string) {
  const router = createAppRouter(createMemoryHistory({ initialEntries: [path] }));
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retryDelay: 0 } },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return router;
}

describe('Auth 라우팅', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('익명 사용자의 계정 접근을 로그인 화면으로 이동시킨다', async () => {
    getSessionMock.mockResolvedValue({ authenticated: false, user: null });

    const router = renderRoute('/account');

    expect(await screen.findByRole('heading', { name: '로그인' })).toBeInTheDocument();
    await waitFor(() => expect(router.state.location.pathname).toBe('/login'));
    expect(router.state.location.search).toEqual({ returnTo: '/account' });
  });

  it('인증 사용자는 계정 화면을 볼 수 있다', async () => {
    getSessionMock.mockResolvedValue({
      authenticated: true,
      user: { id: 'user-1', email: 'buyer@example.com', displayName: '구매자' },
    });

    renderRoute('/account');

    expect(await screen.findByRole('heading', { name: '구매자' })).toBeInTheDocument();
    expect(screen.getByText('buyer@example.com')).toBeInTheDocument();
  });

  it('서버 로그아웃 성공 후 로그인 화면으로 이동한다', async () => {
    getSessionMock.mockResolvedValue({
      authenticated: true,
      user: { id: 'user-1', email: 'buyer@example.com', displayName: '구매자' },
    });
    logoutMock.mockResolvedValue({ authenticated: false });
    const router = renderRoute('/account');
    await screen.findByRole('heading', { name: '구매자' });

    fireEvent.click(screen.getByRole('button', { name: '로그아웃' }));

    expect(await screen.findByRole('heading', { name: '로그인' })).toBeInTheDocument();
    expect(logoutMock).toHaveBeenCalledOnce();
    expect(router.state.location.pathname).toBe('/login');
  });

  it('로그아웃 실패 시 인증 화면과 오류를 유지한다', async () => {
    getSessionMock.mockResolvedValue({
      authenticated: true,
      user: { id: 'user-1', email: 'buyer@example.com', displayName: '구매자' },
    });
    logoutMock.mockRejectedValue(new AuthApiError('AUTH_LOGOUT_FAILED', 500));
    const router = renderRoute('/account');
    await screen.findByRole('heading', { name: '구매자' });

    fireEvent.click(screen.getByRole('button', { name: '로그아웃' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('로그아웃을 완료하지 못했습니다.');
    expect(router.state.location.pathname).toBe('/account');
    expect(screen.getByRole('heading', { name: '구매자' })).toBeInTheDocument();
  });

  it('외부 returnTo 경로를 허용하지 않는다', async () => {
    getSessionMock.mockResolvedValue({ authenticated: false, user: null });

    const router = renderRoute('/login?returnTo=//evil.example');

    expect(await screen.findByRole('heading', { name: '로그인' })).toBeInTheDocument();
    expect(router.state.location.search).toEqual({ returnTo: undefined });
  });

  it('인증 사용자의 로그인 화면 접근을 계정으로 이동시킨다', async () => {
    getSessionMock.mockResolvedValue({
      authenticated: true,
      user: { id: 'user-1', email: 'buyer@example.com', displayName: '구매자' },
    });

    const router = renderRoute('/login');

    expect(await screen.findByRole('heading', { name: '구매자' })).toBeInTheDocument();
    await waitFor(() => expect(router.state.location.pathname).toBe('/account'));
  });
});
