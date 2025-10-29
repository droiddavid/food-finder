import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Full Vite config for React + dev proxy to Spring Boot on :8080
export default defineConfig(({ mode }) => {
  // Load only VITE_* vars from .env files
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],

    // Dev server: React on 5173, proxy /api -> Spring Boot :8080
    server: {
      host: true,          // allow LAN access if needed
      port: 5173,
      strictPort: true,    // fail if 5173 is taken (helps avoid confusion)
      open: false,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          // If your backend already serves under /api, comment out the next line
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // Preview server (vite preview) — optional
    preview: {
      port: 5173,
      strictPort: true,
    },

    // Build options
    build: {
      outDir: 'dist',
      sourcemap: true,
      // You can enable minify: 'esbuild' (default) or 'terser' if needed
    },

    // Useful alias for cleaner imports: import x from '@/components/x'
    resolve: {
      alias: {
        '@': '/src',
      },
    },

    // Example global define (optional)
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      // Expose VITE vars at build-time if you want to reference them in code
      // __API_BASE__: JSON.stringify(env.VITE_API_URL ?? '/api'),
    },
  };
});
