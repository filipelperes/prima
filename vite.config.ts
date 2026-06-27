import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react({
      exclude: /\.(test|spec)\.(ts|tsx)$/,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,woff,ttf}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },
      manifest: {
        name: 'Prima — Guia Interativo de Opções',
        short_name: 'Prima',
        description: 'Guia interativo de Opções — do básico às gregas',
        theme_color: '#07090f',
        background_color: '#07090f',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
    }),
    ...(process.env.ANALYZE === 'true'
      ? [visualizer({
          filename: 'dist/stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
        })]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
  },
  build: {
    target: 'es2023',
    chunkSizeWarningLimit: 250,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('/node_modules/')) {
            if (id.includes('/node_modules/lucide-react/')) return 'icons';
            if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) return 'vendor';
            return 'vendor';
          }
          if (id.endsWith('/src/lib/calculations.ts')) {
            return 'calculations';
          }
        },
      },
    },
  },
})
