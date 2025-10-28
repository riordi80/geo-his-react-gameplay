import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ]
    }
  },
  build: {
    // Suprimir advertencias de CSS en dependencias externas
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorar advertencias de CSS nesting de node_modules
        if (warning.code === 'PLUGIN_WARNING' &&
            warning.plugin === 'vite:css' &&
            warning.message.includes('node_modules')) {
          return;
        }
        warn(warning);
      }
    }
  }
})
