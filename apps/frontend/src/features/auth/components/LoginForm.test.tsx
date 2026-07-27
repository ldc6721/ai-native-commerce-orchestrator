import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { LoginForm } from './LoginForm';

const fetchMock = vi.fn<typeof fetch>();

function response(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(body),
  } as unknown as Response;
}

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return function Wrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe('LoginForm', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('유효하지 않은 입력은 서버로 전송하지 않는다', async () => {
    render(<LoginForm onSuccess={vi.fn()} />, { wrapper: createWrapper() });

    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    expect(await screen.findByText('이메일을 입력해 주세요.')).toBeInTheDocument();
    expect(screen.getByText('비밀번호는 8자 이상이어야 합니다.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('로그인 성공 후 완료 callback을 호출한다', async () => {
    fetchMock.mockResolvedValue(
      response({
        authenticated: true,
        user: { id: 'user-1', email: 'buyer@example.com', displayName: '구매자' },
      }),
    );
    const onSuccess = vi.fn();
    render(<LoginForm onSuccess={onSuccess} />, { wrapper: createWrapper() });

    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'buyer@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'valid-password' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
  });

  it('credential 상세 대신 정규화된 오류를 표시한다', async () => {
    fetchMock.mockResolvedValue(
      response({ code: 'AUTH_INVALID_CREDENTIALS', message: '내부 credential 상세' }, 401),
    );
    const onSuccess = vi.fn();
    render(<LoginForm onSuccess={onSuccess} />, { wrapper: createWrapper() });

    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'buyer@example.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'wrong-password' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('이메일 또는 비밀번호를 확인해 주세요.');
    expect(screen.queryByText('내부 credential 상세')).not.toBeInTheDocument();
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
