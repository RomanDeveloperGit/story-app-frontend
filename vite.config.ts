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
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
      },
    },
  },
  envPrefix: 'APP_',
});
