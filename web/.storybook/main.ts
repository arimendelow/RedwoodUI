import type { StorybookConfig } from 'storybook-framework-redwoodjs-vite'

import { getPaths, importStatementPath } from '@redwoodjs/project-config'

const redwoodProjectPaths = getPaths()

const config: StorybookConfig = {
  framework: 'storybook-framework-redwoodjs-vite',

  stories: [
    `${importStatementPath(
      redwoodProjectPaths.web.src
    )}/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
  ],

  addons: ['@storybook/addon-essentials', '@storybook/addon-themes',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
  },],
}

export default config
