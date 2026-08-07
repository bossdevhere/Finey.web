import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy-policy/index.html'),
        terms: resolve(__dirname, 'terms-of-service/index.html'),
        security: resolve(__dirname, 'data-security/index.html'),
        refund: resolve(__dirname, 'refund-policy/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
