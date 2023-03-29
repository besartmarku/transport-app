/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#374151',
        grey: '#E5E7EB',
        purple: {
          light: '#C7D1F4',
          dark: '#7786D2',
        },
        red: '#FF0000',
      },
      fontFamily: {
        inter: 'Inter',
      },
    },
  },
  plugins: [],
}
