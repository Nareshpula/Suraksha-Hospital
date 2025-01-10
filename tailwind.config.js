/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
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