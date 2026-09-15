import { useMutation, useQueryClient } from '@tanstack/react-query';
import userManager from '../services';
import { UserQueryEnum } from '../types/UserQueryEnum';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => userManager.deleteUser(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: [UserQueryEnum.getUsers] });
      void queryClient.removeQueries({ queryKey: [UserQueryEnum.getUserById, id] });
    },
  });

  return {
    deleteUser: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    error: mutation.error,
  };
}
