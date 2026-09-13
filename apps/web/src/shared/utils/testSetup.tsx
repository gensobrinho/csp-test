import { ThemeProvider } from '@emotion/react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement, ReactNode } from 'react';
import { theme } from '../theme';

interface ProviderRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

export function renderWithProviders(
  component: ReactElement,
  { initialEntries = ['/'], ...options }: ProviderRenderOptions = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false, gcTime: 0 },
      mutations: { retry: false, gcTime: 0 },
    },
  });

  function Providers({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return render(component, { wrapper: Providers, ...options });
}