import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      // تحويل أي طلب يبدأ بـ /api إلى سيرفر الباك إند
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // تحويل طلبات الصور أيضاً لتظهر بشكل صحيح
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})