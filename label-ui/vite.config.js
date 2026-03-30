import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true
  },
  server: {
    port: 5173,
    proxy: {
      '/app/rest/label_generation': 'http://localhost:8090'
    }
  }
});
