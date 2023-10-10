# RedwoodJS Components

This is currently a PoC of using TailwindCSS to create a branding system for bespoke RedwoodJS specific components.

View existing components by building this repo and running `yarn rw storybook`.

Alternatively, this Storybook has been published on Chromatic [here](https://6525bb94aba230a3c956f05b-ogxkhkrtib.chromatic.com/).
Please note that because customizing happens at build-time, you can't change the design system in Storybook, but you can toggle between light and dark mode.

NOTE: We haven't yet removed the API side, but it is not in use. There have also been no pages added - this PoC is currently Storybook only.

# Customizing the design system

We're leaning on built-in TailwindCSS configs for customizing the design system, so all config lives in:

- `web/config/tailwind.config.js`
  - This is where the color system is configured, and there's instructions there
- `web/src/index.css`
  - This is where we customize specific things about how the components look, e.g. rounded vs squared off. There is a section in the `components` section that is intended to be used for this purpose.
