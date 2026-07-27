import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../api/authApi';
import { authSessionQueryKey } from './useAuthSession';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(authSessionQueryKey, {
        authenticated: false,
        user: null,
      });
    },
  });
}
