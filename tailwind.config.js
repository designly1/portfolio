/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#343232",
          "secondary": "#343232",
          "accent": "#343232",
          "neutral": "#272626",
          "base-100": "#0F0F0F",
          "info": "#0000FF",
          "success": "#008000",
          "warning": "#FFFF00",
          "error": "#FF0000",
        },
      }
    ]
  },
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
}
