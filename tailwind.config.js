/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',      // Rojo coral
        secondary: '#4ECDC4',    // Turquesa
        success: '#95E1D3',      // Verde menta
        warning: '#FFE66D',      // Amarillo
        error: '#FF6B9D',        // Rosa
        info: '#A8E6CF',         // Verde claro
        background: '#FFF9F0',   // Crema
      },
    },
  },
  plugins: [],
}
