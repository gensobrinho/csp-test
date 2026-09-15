import type { TRole } from '@/src/features/Auth';
import { useAuthState } from '@/src/features/Auth/hooks/useAuthState';
import { Navigate, Outlet } from 'react-router-dom';
import { RoutesEnum } from '../types/RoutesEnum';

export function RoleRoute({ roles }: { roles: TRole[] }) {
  const { user } = useAuthState();

  if (!user || !roles.includes(user.role)) {
    return <Navigate to={RoutesEnum.HOME} replace />;
  }

  return <Outlet />;
}
