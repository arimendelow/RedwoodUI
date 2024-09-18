# RedwoodUI

This is currently a WiP library of bespoke RedwoodJS components.

Demo here: [https://youtu.be/r6f7GSTwVBw](https://youtu.be/r6f7GSTwVBw)

View existing components by building this repo and running `yarn rw storybook`.

Alternatively, the Storybook automatically publishes to Chromatic [here](https://main--6525bb94aba230a3c956f05b.chromatic.com/).
Please note that because customizing happens at build-time, you can't change the design system in Storybook, but you can toggle between light and dark mode.

# Customizing the design system

All config lives in:

- `web/config/tailwind.config.js`
  - This is where the color system is configured, and there's instructions there
- `web/src/index.css`
  - This is where we customize specific things about how the components look, e.g. rounded vs squared off. There is a section in the `components` section that is intended to be used for this purpose.
