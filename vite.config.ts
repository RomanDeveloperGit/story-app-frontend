import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import sassDts from 'vite-plugin-sass-dts';
import path from 'path';

export default defineConfig({
  plugins: [react(), sassDts()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'development' ? '[local]_[hash:base64:5]' : '[hash:base64:12]',
      localsConvention: 'camelCaseOnly',
    },
  },
  server: {
    host: true,
    strictPort: true,
    port: 3000,
    // It's only for dev mode. In the prod, there is nginx that proxies requests to the backend
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
      },
    },
  },
  build: {
    sourcemap: true,
  },
  preview: {
    host: true,
    strictPort: true,
    port: 80,
    // It's only for dev mode as well. In the prod, there is nginx that proxies requests to the backend.
    // And we don't use the "preview" command in the prod
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
      },
    },
  },
  envPrefix: 'APP_',
});
