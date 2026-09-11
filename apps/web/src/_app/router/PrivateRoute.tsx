import { IAuthInitialState } from "@/src/features/Auth";
import { useSliceState } from "@/src/shared/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RoutesEnum } from "../types/RoutesEnum";

export function PrivateRoute() {
    const user = useSliceState<IAuthInitialState, 'user'>('user');
    const location = useLocation();

    if(!user) {
        return <Navigate to={RoutesEnum.LOGIN} state={{ from: location }} replace />;
    }

    return <Outlet />;
}