import { LoginForm } from '../components/LoginForm';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-md border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">AI Native Commerce</p>
        <h1 className="mt-2 text-3xl font-semibold">로그인</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">계정에 안전하게 연결합니다.</p>
        <LoginForm onSuccess={onLoginSuccess} />
      </section>
    </main>
  );
}
