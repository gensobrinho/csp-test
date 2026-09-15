import type { SetCallback } from '../../../shared/store';

export interface IKanbanInitialState {
  searchQuery: string;
  pendingMove: null;
  selectedDemandId: string | null;
}

export const initialState: IKanbanInitialState = {
  searchQuery: '',
  pendingMove: null,
  selectedDemandId: null,
};

const actions = (set: SetCallback<IKanbanInitialState>) => ({
  setSearchQuery: (searchQuery: string) => set((state) => {
    state.searchQuery = searchQuery;
  }),
  setSelectedDemandId: (selectedDemandId: string | null) => set((state) => {
    state.selectedDemandId = selectedDemandId;
  }),
  resetKanbanSlice: () => set(initialState),
});

export const slice = (set: SetCallback<IKanbanInitialState>) => ({
  ...initialState,
  ...actions(set),
});

export type IKanbanActions = ReturnType<typeof actions>;

export default { slice, initialState };
