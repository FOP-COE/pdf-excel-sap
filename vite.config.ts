import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/pdf-excel-sap/' : '/',
  build: {
    outDir: './dist',
    emptyOutDir: true
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'AI Finance Training Series 2026',
        short_name: 'CFA 2026',
        description: 'Interactive course: PDF into Excel into SAP.',
        theme_color: '#0B3D91',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'landscape',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}));
