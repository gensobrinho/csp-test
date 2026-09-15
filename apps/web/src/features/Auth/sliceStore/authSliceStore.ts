import type { SetCallback } from '../../../shared/store';
import type { AuthSession } from '../types/IAuthRepository';
import type { TAuthUser } from '../types/TAuthUser';

export interface IAuthInitialState {
  user: TAuthUser | null;
  token: string | null;
  isHydrated: boolean;
}

export const initialState: IAuthInitialState = {
  user: null,
  token: null,
  isHydrated: false,
};

const actions = (set: SetCallback<IAuthInitialState>) => ({
  setSession: (session: AuthSession | null) => set((state) => {
    state.user = session?.user ?? null;
    state.token = session?.token ?? null;
    state.isHydrated = true;
  }),
  resetAuthSlice: () => set(initialState),
});

export const slice = (set: SetCallback<IAuthInitialState>) => ({
  ...initialState,
  ...actions(set),
});

export type IAuthActions = ReturnType<typeof actions>;

export default { slice, initialState };