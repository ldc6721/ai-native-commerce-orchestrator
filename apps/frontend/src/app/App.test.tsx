import { render, screen } from '@testing-library/react';
import { App } from './App';

vi.mock('../features/auth/api/authApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../features/auth/api/authApi')>();
  return {
    ...actual,
    getSession: vi.fn().mockResolvedValue({ authenticated: false, user: null }),
  };
});

describe('App', () => {
  it('홈 화면을 렌더링한다', async () => {
    render(<App />);

    expect(await screen.findByText('AI Native Commerce')).toBeInTheDocument();
  });
});
