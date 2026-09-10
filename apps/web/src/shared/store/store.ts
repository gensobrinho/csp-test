import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import { authSlice, IAuthActions, IAuthInitialState } from '@/src/features/Auth';

export type SetCallback<T> = (
  nextStateOrUpdater: ((state: T) => void) | T,
  shouldReplace?: false,
) => void;

export type TGlobalInitialState = IAuthInitialState;
export type TGlobalActions = IAuthActions;

export const slices = {
  authSlice: authSlice.slice,
};

export type Store = ReturnType<(typeof slices)['authSlice']>;

export const vanillaStore = createStore(
  immer<Store>((set) => ({
    ...authSlice.slice(set as SetCallback<IAuthInitialState>),
  })),
);
