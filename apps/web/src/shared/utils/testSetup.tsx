import { ThemeProvider } from '@emotion/react';
import { RenderOptions, render } from '@testing-library/react';
import { theme } from '../theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';

export const renderWithProviders = (component: ReactElement, options?: RenderOptions) => {
    return render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </QueryClientProvider>,
    options
  );
};