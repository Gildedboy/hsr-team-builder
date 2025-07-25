import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    // Disabled devtools temporarily due to Vite 7 incompatibility
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5174,
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
  build: {
    // Enable long-term caching through file hashing
    rollupOptions: {
      output: {
        // Hash chunk names for cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const extType = info[info.length - 1]
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name || '')) {
            return `assets/images/[name]-[hash].${extType}`
          }
          if (/\.(css)$/i.test(assetInfo.name || '')) {
            return `assets/css/[name]-[hash].${extType}`
          }
          return `assets/[name]-[hash].${extType}`
        },
      },
    },
    // CSS optimization - disable CSS code splitting to maintain load order
    cssCodeSplit: false,
    // Enable source maps for debugging but smaller ones for production
    sourcemap: false,
    // Set target for better browser support
    target: 'esnext',
    // Minify for smaller bundles (using terser for best compression)
    minify: 'terser',
  },
})
