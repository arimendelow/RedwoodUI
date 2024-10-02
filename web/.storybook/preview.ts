import { withThemeByDataAttribute } from "@storybook/addon-themes"
import { Preview, ReactRenderer } from "@storybook/react"

import '../src/index.css'

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-mode',
    })
  ],
}

export default preview
