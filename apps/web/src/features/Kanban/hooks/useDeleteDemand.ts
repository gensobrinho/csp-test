import { useMutation, useQueryClient } from '@tanstack/react-query';
import kanbanManager from '../services';
import { KanbanQueryEnum } from '../types/KanbanQueryEnum';

export function useDeleteDemand() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => kanbanManager.deleteDemand(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: [KanbanQueryEnum.getDemandsByStatus] });
      void queryClient.invalidateQueries({ queryKey: [KanbanQueryEnum.getDemandsList] });
      void queryClient.invalidateQueries({
        queryKey: [KanbanQueryEnum.getDemandById, id],
      });
    },
  });

  return {
    deleteDemand: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    error: mutation.error,
  };
}
