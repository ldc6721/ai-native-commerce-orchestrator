import { Navigate } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useAuthSession } from '../../features/auth/hooks/useAuthSession';
import type { UserSummary } from '../../features/auth/types/auth';

interface ProtectedRouteProps {
  children: (user: UserSummary) => ReactNode;
  returnTo: '/account';
}

export function ProtectedRoute({ children, returnTo }: ProtectedRouteProps) {
  const session = useAuthSession();

  if (session.authStatus === 'loading') {
    return <RouteStatus message="세션을 확인하고 있습니다." />;
  }
  if (session.authStatus === 'error') {
    return (
      <RouteStatus message="세션을 확인하지 못했습니다.">
        <button className="mt-4 border border-slate-300 px-4 py-2" type="button" onClick={() => session.refetch()}>
          다시 시도
        </button>
      </RouteStatus>
    );
  }
  if (session.authStatus === 'anonymous' || !session.user) {
    return <Navigate to="/login" search={{ returnTo }} replace />;
  }
  return children(session.user);
}

interface RouteStatusProps {
  message: string;
  children?: ReactNode;
}

function RouteStatus({ message, children }: RouteStatusProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-950">
      <div className="text-center" role="status">
        <p>{message}</p>
        {children}
      </div>
    </main>
  );
}
