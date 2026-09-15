import { useSliceSetter, useSliceState } from '@shared/hooks';
import type { IKanbanActions, IKanbanInitialState } from '../sliceStore/kanbanSliceStore';

export function useKanbanSearchState() {
  const searchQuery = useSliceState<IKanbanInitialState, 'searchQuery'>('searchQuery');
  const setSearchQuery = useSliceSetter<IKanbanActions, 'setSearchQuery'>('setSearchQuery');
  return { searchQuery, setSearchQuery };
}
