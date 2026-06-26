import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react(),
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
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
            return 'vendor';
          }
          if (id.includes('/node_modules/lucide-react/')) {
            return 'icons';
          }
          if (id.includes('/src/lib/calculations')) {
            return 'calculations';
          }
        },
      },
    },
  },
})
