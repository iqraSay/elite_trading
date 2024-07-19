/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(to bottom, rgb(254, 243, 199) 1%, rgb(42, 0, 0) 50% )',
        'custom-gradient-md': 'linear-gradient(to right, rgb(254, 243, 199) 10%, rgb(42, 0, 0) 50% )',
      }),
      colors: {
        yellow: {
          500: '#ffd500',
          300: '#ffeca9'
        },
        brown: {
          900: '#2a0000'
        }
      },
      fontFamily: {
        'palatino': ['Palatino', 'serif']
      }
    }
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
}

