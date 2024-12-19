/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f8faf5',
          100: '#f1f4eb',
          200: '#e2e9d7',
          300: '#d3ddc3',
          400: '#b5c69b',
          500: '#97af73',
          600: '#889e68',
          700: '#718456',
          800: '#5b6a45',
          900: '#4a5638',
          950: '#252b1c',
        },
      },
    },
  },
  plugins: [],
};