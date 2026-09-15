import { useQuery } from '@tanstack/react-query';
import kanbanManager from '../services';
import { KanbanQueryEnum } from '../types/KanbanQueryEnum';

const LIST_LIMIT = 100;

export function useGetDemandsList() {
  const query = useQuery({
    queryKey: [KanbanQueryEnum.getDemandsList],
    queryFn: () => kanbanManager.getDemands({ page: 1, limit: LIST_LIMIT }),
  });

  return {
    demands: query.data?.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
