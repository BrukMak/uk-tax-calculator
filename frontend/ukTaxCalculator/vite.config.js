import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/': {
        target: 'https://uktaxcalculator-5r4urhyk5-brukmaks-projects.vercel.app/calculate-tax',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
    }
  },
  }
})
