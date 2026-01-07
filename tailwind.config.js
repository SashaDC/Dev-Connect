/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#FAEDCB',
          DEFAULT: '#F7D9C4',
          dark: '#E2CFC4',
        },
        accent: '#F2C6DE',

        fog: { DEFAULT: '#E2E2DF', 40: '#E2E2DF66' },
        clay: '#D2D2CF',
        sand: '#E2CFC4',
        peach: '#F7D9C4',
        cream: '#FAEDCB',

        mint: '#C9E4DE',
        sky: '#C6DEF1',
        lilac: '#DBDDF0',
        pink: '#F2C6DE',
        blush: '#F9C6C9',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.1)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
}
