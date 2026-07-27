import type { UserSummary } from '../types/auth';

interface AccountPageProps {
  user: UserSummary;
  isLoggingOut: boolean;
  logoutError: string | null;
  onLogout: () => void;
}

export function AccountPage({ user, isLoggingOut, logoutError, onLogout }: AccountPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">내 계정</p>
        <h1 className="mt-2 text-3xl font-semibold">{user.displayName}</h1>
        <p className="mt-3 text-slate-600">{user.email}</p>
        {logoutError ? <p className="mt-6 text-sm text-red-700" role="alert">{logoutError}</p> : null}
        <button
          className="mt-8 border border-slate-300 px-4 py-2 font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400"
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? '로그아웃 중' : '로그아웃'}
        </button>
      </section>
    </main>
  );
}
