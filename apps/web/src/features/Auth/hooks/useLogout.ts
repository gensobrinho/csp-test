import { useMutation, useQueryClient } from '@tanstack/react-query';
import authManager from '../services';
import { useAuthState } from './useAuthState';
import { getAuthErrorMessage } from '../utils/getAuthErrorMessage';

export function useLogout() {
  const { setSession } = useAuthState();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => authManager.signOut(),
    onSuccess: () => {
      queryClient.clear();
      setSession(null);
    },
    retry: false,
  });
  return {
    logout: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error ? getAuthErrorMessage(mutation.error) : null,
  };
}