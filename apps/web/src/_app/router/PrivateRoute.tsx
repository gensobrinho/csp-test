import { useAuthState } from '@features/Auth/hooks/useAuthState';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RoutesEnum } from '../types/RoutesEnum';

export function PrivateRoute() {
  const { user, isHydrated } = useAuthState();
  const location = useLocation();
  if (!isHydrated) {
    return null;
  }
  if (!user) {
    return <Navigate to={RoutesEnum.LOGIN} state={{ from: location }} replace />;
  }
  return <Outlet />;
}