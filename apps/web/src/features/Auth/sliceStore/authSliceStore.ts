import { SetCallback } from "../../../shared/store";
import { TAuthUser } from "../types/TAuthUser";
import { Storage } from '../../../shared/utils/storage';

const AUTH_STORAGE_KEY = 'auth_token';  

export interface IAuthInitialState {
  user: TAuthUser | null;
  isHydrated: boolean;
}

export const initialState: IAuthInitialState = {
  user: null,
  isHydrated: false,
};

const actions = (set: SetCallback<IAuthInitialState>) => ({
  setToken: (user: TAuthUser | null) => set((state) => {
    state.user = user;
    if(user) {
        Storage.setItem(AUTH_STORAGE_KEY, user.id);
    } else {
        Storage.removeItem(AUTH_STORAGE_KEY);
    }
  }),

  hydrateAuth: () => set((state) => {
    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    state.user = raw ? JSON.parse(raw) : null;
    state.isHydrated = true;
  }),

  logout: () => set((state) => {
    state.user = null;
    Storage.removeItem(AUTH_STORAGE_KEY);
  }),

  resetAuthSlice: () => set(initialState),
});

export const slice = (set: SetCallback<IAuthInitialState>) => ({
  ...initialState,
  ...actions(set),
});

export type IAuthActions = ReturnType<typeof actions>;

export default { slice, initialState };