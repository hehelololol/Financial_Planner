import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite automatically loads .env files from the project root (frontend folder)
// Files are loaded in this order:
// 1. .env                # loaded in all cases
// 2. .env.local          # loaded in all cases, ignored by git
// 3. .env.[mode]         # only loaded in specified mode
// 4. .env.[mode].local   # only loaded in specified mode, ignored by git
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  // Explicitly ensure env variables are loaded
  envPrefix: 'VITE_', // Only expose env variables that start with VITE_
});

