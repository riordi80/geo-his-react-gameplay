import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Plugin para suprimir advertencias de CSS nesting en node_modules
const suppressCSSWarnings = () => ({
  name: 'suppress-css-warnings',
  configResolved(config) {
    const originalWarn = config.logger.warn;
    config.logger.warn = (msg, options) => {
      // Filtrar advertencias de CSS nesting que vienen de node_modules
      if (typeof msg === 'string' && msg.includes('Nested CSS was detected') && msg.includes('node_modules')) {
        return;
      }
      originalWarn(msg, options);
    };
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), suppressCSSWarnings()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
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
