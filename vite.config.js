import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true' ? '/portfolio/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js'
  }
});
