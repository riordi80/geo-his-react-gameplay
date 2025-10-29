import postcssNested from 'postcss-nested';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Plugin personalizado para eliminar @charset que causa advertencias
const charsetRemoval = {
  postcssPlugin: 'internal:charset-removal',
  AtRule: {
    charset: (atRule) => {
      if (atRule.name === 'charset') {
        atRule.remove();
      }
    }
  }
};

// Plugin para suprimir advertencias de Tailwind en node_modules
const suppressTailwindWarnings = {
  postcssPlugin: 'suppress-tailwind-warnings',
  OnceExit(root, { result }) {
    // Suprimir advertencias que vienen de node_modules
    if (result.messages) {
      result.messages = result.messages.filter(msg => {
        if (msg.type === 'warning' && msg.text && msg.text.includes('Nested CSS was detected')) {
          const file = msg.node?.source?.input?.file || result.opts.from || '';
          return !file.includes('node_modules');
        }
        return true;
      });
    }
  }
};

export default {
  plugins: [
    charsetRemoval,
    postcssNested,
    tailwindcss,
    suppressTailwindWarnings,
    autoprefixer,
  ],
};
