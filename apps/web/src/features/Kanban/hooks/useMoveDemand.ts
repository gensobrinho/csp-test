import { createElement } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiAlertCircle } from 'react-icons/fi';
import { setToast } from '@shared/components';
import TEXTS from '@shared/i18n';
import kanbanManager, { KanbanError } from '../services';
import { KanbanQueryEnum } from '../types/KanbanQueryEnum';
import type { TDemandStatus } from '../types/TDemandStatus';

export type TMoveDemandVariables = {
  id: string;
  fromStatus: TDemandStatus;
  toStatus: TDemandStatus;
};

export function showKanbanErrorToast(description: string) {
  setToast({
    title: TEXTS.kanban.errors.title,
    description,
    icon: createElement(FiAlertCircle),
    delay: 4000,
  });
}

function getMoveErrorDescription(error: unknown) {
  if (error instanceof KanbanError) {
    if (error.code === 'lockedStatus') {
      return TEXTS.kanban.errors.lockedStatus;
    }
    return error.message || TEXTS.kanban.errors.moveFailed;
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
      void queryClient.invalidateQueries({ queryKey: [KanbanQueryEnum.getDemandsList] });
      void queryClient.invalidateQueries({
        queryKey: [KanbanQueryEnum.getDemandById, variables.id],
      });
    },
    onError: (error: unknown) => {
      showKanbanErrorToast(getMoveErrorDescription(error));
    },
    retry: false,
  });

  return {
    moveDemand: mutation.mutate,
    moveDemandAsync: mutation.mutateAsync,
    isMoving: mutation.isPending,
    error: mutation.error ? getMoveErrorDescription(mutation.error) : null,
    reset: mutation.reset,
  };
}
