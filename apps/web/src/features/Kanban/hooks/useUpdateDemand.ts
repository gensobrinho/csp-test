import { useMutation, useQueryClient } from '@tanstack/react-query';
import kanbanManager from '../services';
import type { TUpdateDemandDetailsPayload } from '../types/IKanbanRepository';
import { KanbanQueryEnum } from '../types/KanbanQueryEnum';

type TUpdateDemandVariables = {
  id: string;
  payload: TUpdateDemandDetailsPayload;
};

export function useUpdateDemand() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: TUpdateDemandVariables) => (
      kanbanManager.updateDemandDetails(id, payload)
    ),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: [KanbanQueryEnum.getDemandsByStatus] });
      void queryClient.invalidateQueries({ queryKey: [KanbanQueryEnum.getDemandsList] });
      void queryClient.invalidateQueries({
        queryKey: [KanbanQueryEnum.getDemandById, variables.id],
      });
    },
  });

  return {
    updateDemand: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
}
