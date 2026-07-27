/* eslint-disable react-refresh/only-export-components */
import {
  Navigate,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
  type RouterHistory,
} from '@tanstack/react-router';
import { AccountPage } from '../features/auth/pages/AccountPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { useAuthSession } from '../features/auth/hooks/useAuthSession';
import { useLogout } from '../features/auth/hooks/useLogout';
import type { UserSummary } from '../features/auth/types/auth';
import { HomePage } from './HomePage';
import { ProtectedRoute } from './routes/ProtectedRoute';

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  validateSearch: (search: Record<string, unknown>) => ({
    returnTo: search.returnTo === '/account' ? ('/account' as const) : undefined,
  }),
  component: LoginRoute,
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/account',
  component: AccountRoute,
});

const routeTree = rootRoute.addChildren([homeRoute, loginRoute, accountRoute]);

export function createAppRouter(history?: RouterHistory) {
  return createRouter({
    routeTree,
    ...(history ? { history } : {}),
  });
}

export const router = createAppRouter();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function RootLayout() {
  useAuthSession();
  return <Outlet />;
}

function LoginRoute() {
  const session = useAuthSession();
  const search = loginRoute.useSearch();
  const navigate = useNavigate();

  if (session.authStatus === 'loading') {
    return <SessionMessage message="세션을 확인하고 있습니다." />;
  }
  if (session.authStatus === 'error') {
    return (
      <SessionMessage message="세션을 확인하지 못했습니다.">
        <button className="mt-4 border border-slate-300 px-4 py-2" type="button" onClick={() => session.refetch()}>
          다시 시도
        </button>
      </SessionMessage>
    );
  }
  if (session.authStatus === 'authenticated') {
    return <Navigate to="/account" replace />;
  }

  return (
    <LoginPage
      onLoginSuccess={() => {
        void navigate({ to: search.returnTo ?? '/account', replace: true });
      }}
    />
  );
}

function AccountRoute() {
  return (
    <ProtectedRoute returnTo="/account">
      {(user) => <AuthenticatedAccount user={user} />}
    </ProtectedRoute>
  );
}

function AuthenticatedAccount({ user }: { user: UserSummary }) {
  const logoutMutation = useLogout();
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // 정규화된 오류는 계정 화면에 유지한다.
    }
  };

  return (
    <AccountPage
      user={user}
      isLoggingOut={logoutMutation.isPending}
      logoutError={logoutMutation.error?.message ?? null}
      onLogout={() => void handleLogout()}
    />
  );
}

function SessionMessage({ message, children }: { message: string; children?: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-950">
      <div className="text-center" role="status">
        <p>{message}</p>
        {children}
      </div>
    </main>
  );
}
