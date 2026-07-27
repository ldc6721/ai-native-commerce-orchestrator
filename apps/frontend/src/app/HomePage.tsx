import { Link } from '@tanstack/react-router';

export function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
        <p className="text-sm font-medium text-emerald-700">AI Native Commerce</p>
        <h1 className="mt-3 text-4xl font-semibold">커머스 계정 연결</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
          서버 세션을 기준으로 계정에 로그인하고 인증 상태를 복원합니다.
        </p>
        <div className="mt-8 flex gap-3">
          <Link className="bg-emerald-700 px-4 py-2 font-medium text-white" to="/login" search={{ returnTo: undefined }}>로그인</Link>
          <Link className="border border-slate-300 px-4 py-2 font-medium" to="/account">내 계정</Link>
        </div>
      </section>
    </main>
  );
}
