import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@shared/utils': fileURLToPath(new URL('./src/shared/utils', import.meta.url)),
      '@shared/types': fileURLToPath(new URL('./src/shared/types', import.meta.url)),
      '@shared/enums': fileURLToPath(new URL('./src/shared/enums', import.meta.url)),
      '@shared/store': fileURLToPath(new URL('./src/shared/store', import.meta.url)),
    }
  }
});
