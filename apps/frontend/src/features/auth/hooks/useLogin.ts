import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../api/authApi';
import { authSessionQueryKey } from './useAuthSession';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      queryClient.setQueryData(authSessionQueryKey, session);
    },
  });
}
