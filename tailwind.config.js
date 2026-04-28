/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0e0e0e',
        primary: '#A3FF12',
        secondary: '#FFEA00',
        accent: '#FF3D00',
        surface: '#1a1919',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
