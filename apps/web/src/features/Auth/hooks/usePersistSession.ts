import { useEffect, useState } from 'react';
import authManager from '../services';
import { useAuthState } from './useAuthState';
import { getAuthErrorMessage } from '../utils/getAuthErrorMessage';

export function usePersistSession() {
  const { isHydrated, setSession } = useAuthState();
  const [error, setError] = useState<string | null>(null);

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
          setError(getAuthErrorMessage(reason));
          setSession(null);
        }
      },
    );
    return () => { isCancelled = true; };
  }, [setSession]);

  return { isLoading: !isHydrated, error };
}