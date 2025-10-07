import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL as NodeURL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Ahsan Javed - Portfolio',
        short_name: 'Ahsan Portfolio',
        description:
          'Senior Backend Developer specializing in scalable architectures, CI/CD pipelines, microservices, and modern backend systems.',
        theme_color: '#7c3aed',
        background_color: '#0b0d10',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new NodeURL('.', import.meta.url)),
      '@/components': fileURLToPath(
        new NodeURL('./components', import.meta.url)
      ),
      '@/hooks': fileURLToPath(new NodeURL('./hooks', import.meta.url)),
      '@/services': fileURLToPath(new NodeURL('./services', import.meta.url)),
      '@/types': fileURLToPath(new NodeURL('./types', import.meta.url)),
      '@/utils': fileURLToPath(new NodeURL('./utils', import.meta.url)),
      '@/contexts': fileURLToPath(new NodeURL('./contexts', import.meta.url)),
    },
  },
  server: {
    port: 3030,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          utils: ['axios', 'clsx', 'tailwind-merge'],
          toast: ['react-hot-toast'],
        },
      },
    },
    // Optimize for faster loading
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
