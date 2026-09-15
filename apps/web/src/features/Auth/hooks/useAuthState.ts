import { useSliceSetter, useSliceState } from '@shared/hooks';
import type { IAuthActions, IAuthInitialState } from '../sliceStore/authSliceStore';

export function useAuthState() {
  const user = useSliceState<IAuthInitialState, 'user'>('user');
  const isHydrated = useSliceState<IAuthInitialState, 'isHydrated'>('isHydrated');
  const setSession = useSliceSetter<IAuthActions, 'setSession'>('setSession');
  return { user, isHydrated, setSession };
}