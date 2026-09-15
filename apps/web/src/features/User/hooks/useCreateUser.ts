import { useMutation, useQueryClient } from '@tanstack/react-query';
import userManager from '../services';
import type { TCreateUserPayload } from '../types/IUserRepository';
import { UserQueryEnum } from '../types/UserQueryEnum';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: TCreateUserPayload) => userManager.createUser(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [UserQueryEnum.getUsers] });
    },
  });

  return {
    createUser: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
}
