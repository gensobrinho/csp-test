import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import { ToastViewport } from './Toast.styled';
import type { TToastInput, TToastItem } from './Toast.types';

const DEFAULT_DELAY_MS = 3000;

type ToastContextValue = {
  setToast: (toast: TToastInput) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let imperativeSetToast: ((toast: TToastInput) => void) | null = null;

export function setToast(toast: TToastInput) {
  if (!imperativeSetToast) {
    if (import.meta.env.DEV) {
      console.warn('setToast called before ToastProvider was mounted.');
    }
    return;
  }
  imperativeSetToast(toast);
}

function createToastId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<TToastItem[]>([]);
  const timersRef = useRef<Map<string, number>>(new Map());

  const dismissToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback((input: TToastInput) => {
    const id = createToastId();
    const delay = input.delay ?? DEFAULT_DELAY_MS;
    const toast: TToastItem = { ...input, id, delay };

    setToasts((current) => [...current, toast]);

    if (delay > 0) {
      const timer = window.setTimeout(() => {
        dismissToast(id);
      }, delay);
      timersRef.current.set(id, timer);
    }
  }, [dismissToast]);

  useEffect(() => {
    imperativeSetToast = pushToast;
    return () => {
      imperativeSetToast = null;
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current.clear();
    };
  }, [pushToast]);

  const value = useMemo(
    () => ({
      setToast: pushToast,
      dismissToast,
    }),
    [pushToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <ToastViewport>
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={dismissToast} />
          ))}
        </ToastViewport>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
