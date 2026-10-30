import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',   // relative paths — works on Emergent, Vercel, Netlify, GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})

