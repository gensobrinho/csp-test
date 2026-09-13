import LoginScreen from '@/src/features/Auth/views/LoginScreen';
import DemandCreateScreen from '@/src/features/Demand/views/DemandCreateScreen';
import DemandScreen from '@/src/features/Demand/views/DemandScreen';
import Home from '@features/Home/views/Home';
import KanbanScreen from '@/src/features/Kanban/views/KanbanScreen';
import UserScreen from '@/src/features/User/views/UserScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { RoutesEnum } from '../types/RoutesEnum';
import { PrivateRoute } from './PrivateRoute';

export function AppRouter() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={RoutesEnum.LOGIN} element={<LoginScreen />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path={RoutesEnum.HOME} element={<Home />} />
              <Route path={RoutesEnum.KANBAN} element={<KanbanScreen />} />
              <Route path={RoutesEnum.DEMAND_CREATE} element={<DemandCreateScreen />} />
              <Route path={RoutesEnum.DEMANDS} element={<DemandScreen />} />
              <Route path={RoutesEnum.USERS} element={<UserScreen />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
