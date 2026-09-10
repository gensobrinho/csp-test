import { useStore } from 'zustand';
import { vanillaStore, type Store } from '../store/store';

type TStateKeys = {
  [K in keyof Store]: Store[K] extends (...args: never[]) => unknown ? never : K;
}[keyof Store];

type TActionKeys = {
  [K in keyof Store]: Store[K] extends (...args: never[]) => unknown ? K : never;
}[keyof Store];

export function useSliceState<
  TState extends object,
  TKey extends keyof TState & TStateKeys,
>(key: TKey): TState[TKey] {
  return useStore(vanillaStore, (state) => state[key] as TState[TKey]);
}

export function useSliceSetter<
  TActions extends object,
  TKey extends keyof TActions & TActionKeys,
>(key: TKey): TActions[TKey] {
  return useStore(vanillaStore, (state) => state[key] as TActions[TKey]);
}
