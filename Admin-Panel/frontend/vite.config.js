import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    },
  },
})
