import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import {
  demoSlice,
  type IDemoActions,
  type IDemoInitialState,
} from '../../features/Demo';

export type SetCallback<T> = (
  nextStateOrUpdater: ((state: T) => void) | T,
  shouldReplace?: false,
) => void;

export type TGlobalInitialState = IDemoInitialState;
export type TGlobalActions = IDemoActions;

export const slices = {
  demoSlice: demoSlice.slice,
};

export type Store = ReturnType<(typeof slices)['demoSlice']>;

export const vanillaStore = createStore(
  immer<Store>((set) => ({
    ...demoSlice.slice(set as SetCallback<IDemoInitialState>),
  })),
);
