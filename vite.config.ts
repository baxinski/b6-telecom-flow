
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      // Ensure compatibility with different platforms
      external: [],
    }
  },
  optimizeDeps: {
    // Force pre-bundling of problematic dependencies
    include: ['react', 'react-dom', 'react-router-dom'],
    // Exclude Rollup native binaries from optimization
    exclude: [
      '@rollup/rollup-linux-x64-gnu',
      '@rollup/rollup-win32-x64-msvc',
      '@rollup/rollup-darwin-x64',
      '@rollup/rollup-darwin-arm64'
    ]
  }
}))
