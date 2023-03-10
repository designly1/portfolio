/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg1: '#17181B'
      },
      animation: {
        'cursor': 'cursor 1s ease-in-out infinite',
      },
      keyframes: {
        cursor: {
          '50%': { 'border-right-color': 'transparent' },
        },
      }
    },
  },
  plugins: [],
}
