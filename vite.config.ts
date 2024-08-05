import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import sassDts from 'vite-plugin-sass-dts';
import path from 'path';

const getCookieValue = (cookie: string, key: string) => {
  const regexp = new RegExp(key + '=([^;]+)');
  const match = regexp.exec(cookie);
  
  return match ? match[1] : null;
}

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
        configure(proxy) {
          proxy.on('proxyReq', (proxyReq, req) => {
            if (req.headers.authorization || !req.headers.cookie) return;

            const refreshTokenFromCookie = getCookieValue(req.headers.cookie, 'refresh-token');
            if (!refreshTokenFromCookie) return;

            // @ts-ignore
            req.proxyModificationDescription = 'The refresh token from the cookie was added to the Authorization header';

            proxyReq.setHeader('Authorization', `Bearer ${refreshTokenFromCookie}`);
          });

          proxy.on('proxyRes', (_, req, res) => {
            // @ts-ignore
            if (req.proxyModificationDescription) {
              // @ts-ignore
              res.setHeader('X-Proxy-Modification', req.proxyModificationDescription)
            }
          });
        },
      },
    },
  },
  build: {
    sourcemap: true,
  },
  envPrefix: 'APP_',
});
