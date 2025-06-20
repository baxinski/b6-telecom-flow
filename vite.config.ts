
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
  // Configuração explícita para resolver o problema do tsconfig
  //esbuild: {
    tsconfig: './tsconfig.json'
  },
  // Força o Vite a usar o tsconfig correto
  build: {
    target: 'esnext'
  }
}))
