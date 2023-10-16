const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * Modify the below to control your app's color scheme.
         * See here for built in options: https://tailwindcss.com/docs/customizing-colors#default-color-palette
         * To create your own color scheme, you must include the same keys as the built in color.
         * To do this, follow the following steps:
         * - Pick a base color for the scale you want to create. Something that looks good as a button background is a good starting point
         * - Then, pick your darkest and lightest shades. These should be different enough to work together as text and background colors.
         * - Then, fill in the gaps.
         *
         * Note: rather than doing this by adjusting brightness, start by shifting the hue. One blog post on this here: https://medium.muz.li/natural-color-palettes-7769e5b38ecd
         */
        /*
         * Change this to your primary color scheme.
         */
        primary: colors.blue,
        /*
         * Change this to the color scheme you want to use for neutral colors.
         * Suggested to be something close to gray, such as slate, gray, zinc, neutral, or stone.
         */
        neutral: colors.gray,
        /*
         * Change this to the color you want to use for primary surface in light mode
         */
        light: colors.white,
        /*
         * Change this to the color you want to use for primary surface in dark mode
         */
        dark: colors.gray[900],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
