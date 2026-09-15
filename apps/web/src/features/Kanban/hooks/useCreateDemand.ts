import { useMutation, useQueryClient } from '@tanstack/react-query';
import kanbanManager from '../services';
import type { TCreateDemandPayload } from '../types/IKanbanRepository';
import { KanbanQueryEnum } from '../types/KanbanQueryEnum';

export function useCreateDemand() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: TCreateDemandPayload) => kanbanManager.createDemand(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [KanbanQueryEnum.getDemandsByStatus] });
      void queryClient.invalidateQueries({ queryKey: [KanbanQueryEnum.getDemandsList] });
    },
  });

  return {
    createDemand: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
}
