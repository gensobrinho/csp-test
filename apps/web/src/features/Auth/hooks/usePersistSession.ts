import { createElement, useEffect } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { setToast } from '@shared/components';
import authManager from '../services';
import { useAuthState } from './useAuthState';
import { getAuthErrorMessage } from '../utils/getAuthErrorMessage';

export function usePersistSession() {
  const { isHydrated, setSession } = useAuthState();

  useEffect(() => {
    let isCancelled = false;
    authManager.restoreSession().then(
      (session) => {
        if (!isCancelled) {
          setSession(session);
        }
      },
      (reason: unknown) => {
        if (!isCancelled) {
          setToast({
            title: getAuthErrorMessage(reason),
            icon: createElement(FiAlertCircle),
            delay: 4000,
          });
          setSession(null);
        }
      },
    );
    return () => { isCancelled = true; };
  }, [setSession]);

  return { isLoading: !isHydrated };
}
