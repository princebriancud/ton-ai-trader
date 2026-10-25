import { defineConfig } from 'vite';

export default defineConfig({
  root: 'web',
  base: '/ton-ai-trader/',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
