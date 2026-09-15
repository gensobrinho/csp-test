import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { ToastProvider } from './shared/components';
import { theme } from './shared/theme';
import App from './App';
import '@fontsource-variable/inter';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <ToastProvider>
        <App />
      </ToastProvider>
    </StrictMode>
  </ThemeProvider>,
);
