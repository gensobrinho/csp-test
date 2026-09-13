import { useMutation } from '@tanstack/react-query';
import authManager from '../services';
import type { LoginCredentials } from '../types/IAuthRepository';
import { useAuthState } from './useAuthState';
import { getAuthErrorMessage } from '../utils/getAuthErrorMessage';

export function useLogin() {
  const { setSession } = useAuthState();
  const mutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authManager.authenticate(credentials),
    onSuccess: setSession,
    retry: false,
    gcTime: 0,
  });

  return {
    authenticate: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error ? getAuthErrorMessage(mutation.error) : null,
    reset: mutation.reset,
  };
}