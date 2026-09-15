import { useQuery } from '@tanstack/react-query';
import userManager from '../services';
import type { TGetUsersParams } from '../types/IUserRepository';
import { UserQueryEnum } from '../types/UserQueryEnum';

export function useGetUsers(params?: TGetUsersParams) {
  const query = useQuery({
    queryKey: [UserQueryEnum.getUsers, params?.role ?? 'all'],
    queryFn: () => userManager.getUsers(params),
  });

  return {
    users: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
