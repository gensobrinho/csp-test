import { useQuery } from '@tanstack/react-query';
import userManager from '../services';
import { UserQueryEnum } from '../types/UserQueryEnum';

export function useUserDetails(userId: string | null) {
  const query = useQuery({
    queryKey: [UserQueryEnum.getUserById, userId],
    queryFn: () => userManager.getUserById(userId!),
    enabled: Boolean(userId),
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
  };
}
