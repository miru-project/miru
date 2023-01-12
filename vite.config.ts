import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  envPrefix:['VITE_','MIRU_'],
  server: {
    proxy: {
      '/sakura': {
        target: 'http://127.0.0.1:8080',
        headers: {},
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sakura/, '')
      },
    }
  }
})
