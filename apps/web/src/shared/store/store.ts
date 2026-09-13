import { authSlice } from '@/src/features/Auth';
import type { IAuthActions, IAuthInitialState } from '@/src/features/Auth';
import { kanbanSlice } from '@/src/features/Kanban';
import type { IKanbanActions, IKanbanInitialState } from '@/src/features/Kanban';
import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

export type SetCallback<T> = (
  nextStateOrUpdater: ((state: T) => void) | T,
  shouldReplace?: false,
) => void;

export type TGlobalInitialState = IAuthInitialState & IKanbanInitialState;
export type TGlobalActions = IAuthActions & IKanbanActions;
export type Store = TGlobalInitialState & TGlobalActions;

export const slices = {
  authSlice: authSlice.slice,
  kanbanSlice: kanbanSlice.slice,
};

export const vanillaStore = createStore(
  immer<Store>((set) => ({
    ...authSlice.slice(set as SetCallback<IAuthInitialState>),
    ...kanbanSlice.slice(set as SetCallback<IKanbanInitialState>),
  })),
);
