import { useMutation, useQueryClient } from '@tanstack/react-query';
import userManager from '../services';
import type { TUpdateUserPayload } from '../types/IUserRepository';
import { UserQueryEnum } from '../types/UserQueryEnum';

export type TUpdateUserVariables = {
  id: string;
  payload: TUpdateUserPayload;
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: TUpdateUserVariables) => (
      userManager.updateUser(id, payload)
    ),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: [UserQueryEnum.getUsers] });
      void queryClient.invalidateQueries({
        queryKey: [UserQueryEnum.getUserById, variables.id],
      });
    },
  });

  return {
    updateUser: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
}
