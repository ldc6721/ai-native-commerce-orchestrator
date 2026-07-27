import { useQuery } from '@tanstack/react-query';
import { AuthApiError, getSession } from '../api/authApi';
import type { AuthSession } from '../types/auth';

export const authSessionQueryKey = ['auth', 'session'] as const;
export type AuthSessionStatus = 'loading' | 'anonymous' | 'authenticated' | 'error';

export function useAuthSession() {
  const query = useQuery<AuthSession, AuthApiError>({
    queryKey: authSessionQueryKey,
    queryFn: getSession,
    retry: (failureCount, error) =>
      failureCount < 1 && (error.status === null || error.status >= 500),
  });

  let authStatus: AuthSessionStatus = 'loading';
  if (query.isError) {
    authStatus = 'error';
  } else if (query.data?.authenticated) {
    authStatus = 'authenticated';
  } else if (query.data) {
    authStatus = 'anonymous';
  }

  return {
    ...query,
    authStatus,
    error: query.error instanceof AuthApiError ? query.error : null,
    user: query.data?.authenticated ? query.data.user : null,
  };
}
