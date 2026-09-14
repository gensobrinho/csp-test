import { useQuery } from '@tanstack/react-query';
import userManager from '../services';
import { UserQueryEnum } from '../types/UserQueryEnum';

export function useGetUsers() {
  const query = useQuery({
    queryKey: [UserQueryEnum.getUsers],
    queryFn: () => userManager.getUsers(),
  });

  return {
    users: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
