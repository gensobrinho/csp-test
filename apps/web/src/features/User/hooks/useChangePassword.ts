import { useMutation } from '@tanstack/react-query';
import { createElement } from 'react';
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import { setToast } from '@shared/components';
import TEXTS from '@shared/i18n';
import { getApiErrorId } from '../../../shared/api/apiError';
import userManager from '../services';
import type { TChangePasswordPayload } from '../types/IUserRepository';

export function useChangePassword() {
  const mutation = useMutation({
    mutationFn: (payload: TChangePasswordPayload) => userManager.changePassword(payload),
    onSuccess: () => {
      setToast({
        title: TEXTS.home.password.success,
        icon: createElement(FiCheck),
        delay: 3000,
      });
    },
    onError: (error) => {
      const message =
        getApiErrorId(error) === 'invalid_current_password'
          ? TEXTS.home.password.invalidCurrent
          : TEXTS.home.password.failed;

      setToast({
        title: message,
        icon: createElement(FiAlertCircle),
        delay: 4000,
      });
    },
  });

  return {
    changePassword: mutation.mutateAsync,
    isChanging: mutation.isPending,
  };
}
