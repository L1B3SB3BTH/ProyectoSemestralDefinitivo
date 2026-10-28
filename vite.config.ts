import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['src/componentes/**/*.{ts,tsx}', 'src/utilidades.ts'],
      exclude: ['src/Test/**'],
      reporter: ['text', 'html', 'json'],
    },
  },
})
