import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Ambiente de desenvolvimento
    host: true,
    port: 5173
  },
  preview: {
    // Ambiente de produção no Render
    host: true,
    port: 10000,
    allowedHosts: [
      'encantodearte.com.br',
      'encantodearte-frontend.onrender.com'
    ]
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
