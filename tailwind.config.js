/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg0: '#15161A',
        bg1: '#17181B',
        bg2: '#191A1E',
        designlyLeft: '#1C99FE',
        designlyMiddle: '#7644FF',
        designlyRight: '#FD4766',
      },
      fontFamily: {
        'deathstar': 'var(--deathstar-font)'
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
