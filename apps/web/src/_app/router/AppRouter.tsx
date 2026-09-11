import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutesEnum } from "../types/RoutesEnum";
import { PrivateRoute } from "./PrivateRoute";

export function AppRouter() {
    return (
        <BrowserRouter>
         <Routes>
            <Route path={RoutesEnum.HOME} element={null} />
            <Route element={<PrivateRoute />}>
            
            </Route>
         </Routes>
        </BrowserRouter>
    )
}