import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // solve static fiels
  plugins: [react()],
  build: {
    outDir: 'dist' // build goes for right folder to render
  }
})
