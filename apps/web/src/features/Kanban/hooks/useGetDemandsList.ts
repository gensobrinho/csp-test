import { useQuery } from '@tanstack/react-query';
import { useAuthState } from '@features/Auth/hooks/useAuthState';
import kanbanManager from '../services';
import { KanbanQueryEnum } from '../types/KanbanQueryEnum';

const LIST_LIMIT = 100;

export function useGetDemandsList() {
  const { user } = useAuthState();
  const canViewAll = user?.role === 'admin' || user?.role === 'agilist';

  const query = useQuery({
    queryKey: [KanbanQueryEnum.getDemandsList, user?.id, canViewAll],
    queryFn: () =>
      kanbanManager.getDemands({
        page: 1,
        limit: LIST_LIMIT,
        responsibleId: canViewAll ? undefined : user?.id,
      }),
    enabled: Boolean(user),
  });

  return {
    demands: query.data?.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
