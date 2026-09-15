import { useSliceSetter, useSliceState } from '@shared/hooks';
import type { IKanbanActions, IKanbanInitialState } from '../sliceStore/kanbanSliceStore';

export function useSelectedDemandState() {
  const selectedDemandId = useSliceState<IKanbanInitialState, 'selectedDemandId'>('selectedDemandId');
  const setSelectedDemandId = useSliceSetter<IKanbanActions, 'setSelectedDemandId'>('setSelectedDemandId');
  return { selectedDemandId, setSelectedDemandId };
}
