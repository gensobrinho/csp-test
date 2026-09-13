import { useMutation, useQueryClient } from '@tanstack/react-query';
import TEXTS from '@shared/i18n';
import kanbanManager, { KanbanError } from '../services';
import { KanbanQueryEnum } from '../types/KanbanQueryEnum';
import type { TDemandStatus } from '../types/TDemandStatus';

export type TMoveDemandVariables = {
  id: string;
  fromStatus: TDemandStatus;
  toStatus: TDemandStatus;
};

function getMoveErrorMessage(error: unknown) {
  if (error instanceof KanbanError && error.code === 'lockedStatus') {
    return TEXTS.kanban.errors.lockedStatus;
  }
  return TEXTS.kanban.errors.moveFailed;
}

export function useMoveDemand() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, fromStatus, toStatus }: TMoveDemandVariables) => (
      kanbanManager.updateDemand(id, { status: toStatus }, fromStatus)
    ),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: [KanbanQueryEnum.getDemandsByStatus, variables.fromStatus],
      });
      void queryClient.invalidateQueries({
        queryKey: [KanbanQueryEnum.getDemandsByStatus, variables.toStatus],
      });
      void queryClient.invalidateQueries({
        queryKey: [KanbanQueryEnum.getDemandById, variables.id],
      });
    },
    retry: false,
  });

  return {
    moveDemand: mutation.mutate,
    moveDemandAsync: mutation.mutateAsync,
    isMoving: mutation.isPending,
    error: mutation.error ? getMoveErrorMessage(mutation.error) : null,
    reset: mutation.reset,
  };
}
