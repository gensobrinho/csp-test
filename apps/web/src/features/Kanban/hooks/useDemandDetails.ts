import { useQuery } from '@tanstack/react-query';
import kanbanManager from '../services';
import { KanbanQueryEnum } from '../types/KanbanQueryEnum';

export function useDemandDetails(demandId: string | null) {
  const query = useQuery({
    queryKey: [KanbanQueryEnum.getDemandById, demandId],
    queryFn: () => kanbanManager.getDemandById(demandId!),
    enabled: Boolean(demandId),
  });

  return {
    demand: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
  };
}
