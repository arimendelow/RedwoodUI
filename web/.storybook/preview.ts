import { withThemeByDataAttribute } from "@storybook/addon-styling";
import { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-mode',
    })
  ]
}

export default preview;