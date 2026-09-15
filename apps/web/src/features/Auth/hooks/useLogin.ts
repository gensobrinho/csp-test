import { createElement } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FiAlertCircle } from 'react-icons/fi';
import { setToast } from '@shared/components';
import authManager from '../services';
import type { LoginCredentials } from '../types/IAuthRepository';
import { useAuthState } from './useAuthState';
import { getAuthErrorMessage } from '../utils/getAuthErrorMessage';
import TEXTS from '@/src/shared/i18n';

export function useLogin() {
  const { setSession } = useAuthState();
  const mutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authManager.authenticate(credentials),
    onSuccess: setSession,
    onError: (error) => {
      setToast({
        title: TEXTS.auth.errors.default,
        description: getAuthErrorMessage(error),
        icon: createElement(FiAlertCircle),
        delay: 4000,
      });
    },
    retry: false,
    gcTime: 0,
  });

  return {
    authenticate: mutation.mutate,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  };
}
