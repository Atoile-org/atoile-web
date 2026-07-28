import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import glsl from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), glsl()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    cssMinify: 'esbuild'
  }
})
