import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Mantido porque você usa path.resolve
import { componentTagger } from 'lovable-tagger'; // Mantido porque você usa no plugin

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => { // Mudei para usar um return explícito e chaves {}
  return { // Início do objeto de configuração
    server: {
      host: '0.0.0.0', // '::' pode ser problemático em alguns ambientes, '0.0.0.0' é mais comum para todos os IPs
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      // Removido .filter(Boolean) - ele é raramente necessário aqui se os plugins forem bem definidos
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Removida a seção esbuild problemática. O Vite usa seu tsconfig automaticamente.
    // 'esbuild: { tsconfig: './tsconfig.json' }' é a causa do erro 'TS2769: No overload matches this call'
    build: {
      target: 'esnext', // 'esnext' é bom para compatibilidade com navegadores modernos
    },
  }; // Fim do objeto de configuração
}); // Fechamento do defineConfig