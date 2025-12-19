/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cadex: {
          primary: '#00CBA9',    // Verde Água
          secondary: '#0F2335',  // Azul Escuro
          bg: '#F4F6F8',         // Cinza Claro
          text: '#0F2335',       // Texto Escuro
        }
      }
    },
  },
  plugins: [],
}