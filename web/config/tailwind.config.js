const colors = require('tailwindcss/colors')
const defaults = require('tailwindcss/defaultConfig')

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
      borderRadius: {
        /**
         * Change this to the default border radius for your components.
         * For example, if you want all corners to be sharp, set this to 0.
         */
        default: defaults.theme.borderRadius.md,
      },
      /**
       * START for accordion component
       * To instead use Framer Motion, you'd need to use the accordion as a
       * controlled component, which undermines a lot of what RadixUI does for us.
       * It's unfeasible to use Framer Motion with the accordion as an uncontrolled
       * component because of how it sets the height variable - it basically calculates it
       * based on the height of the content, so you get a weird race condition if you animate the height
       * using Framer Motion.
       *
       * (You'd also need to do `forceMount` on the content, otherwise it removes the content from the DOM when it's closed,
       * which is where the re-calculation of the height comes from)
       *
       * This is the recommended way to animate the accordion, see here:
       * https://www.radix-ui.com/primitives/docs/components/accordion#animating-content-size
       */
      keyframes: {
        'slide-down': {
          from: { height: '0' },
          to: {
            height:
              'var(--radix-accordion-content-height, var(--radix-collapsible-content-height))',
          },
        },
        'slide-up': {
          from: {
            height:
              'var(--radix-accordion-content-height, var(--radix-collapsible-content-height))',
          },
          to: { height: '0' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.2s ease-in-out',
        'slide-up': 'slide-up 0.2s ease-in-out',
      },

      /**
       * END for accordion component
       */
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
