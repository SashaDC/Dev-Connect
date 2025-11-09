/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#FAEDCB',
          DEFAULT: '#F7D9C4',
          dark: '#E2CFC4',
        },
        accent: '#F2C6DE',
      },
    },
  },
  plugins: [],
}
