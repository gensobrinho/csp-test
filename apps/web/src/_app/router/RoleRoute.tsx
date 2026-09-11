import { IAuthInitialState, TRole } from '@/src/features/Auth';
import { useSliceState } from '@/src/shared/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { RoutesEnum } from '../types/RoutesEnum';

export function RoleRoute({ roles }: { roles: TRole[] }) {
    const user = useSliceState<IAuthInitialState, 'user'>('user');

    if(!user || !roles.includes(user.role)) {
        return <Navigate to={RoutesEnum.HOME} replace />;
    }

    return <Outlet />;
}
