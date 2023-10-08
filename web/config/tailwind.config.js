const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        neutral: colors.gray,
        accent: colors.teal,
      },
    },
  },
  plugins: [],
}
