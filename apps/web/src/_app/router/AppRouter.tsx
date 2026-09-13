import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@features/Auth/views/Login';
import Home from '@features/Home/views/Home';
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
          <Route path={RoutesEnum.LOGIN} element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path={RoutesEnum.HOME} element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}