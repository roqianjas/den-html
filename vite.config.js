import { defineConfig } from 'vite'

export default defineConfig({
  base: '/', // Ganti dengan nama repository Anda
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true
  }
})
