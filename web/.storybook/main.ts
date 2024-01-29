import path, { join, dirname } from 'path'

import type { StorybookConfig } from '@storybook/react-vite'

import {
  getConfig,
  getPaths,
  importStatementPath,
} from '@redwoodjs/project-config'

const redwoodProjectConfig = getConfig()
const redwoodProjectPaths = getPaths()

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')))
}

const baseConfig: StorybookConfig = {
  stories: [
    `${importStatementPath(
      redwoodProjectPaths.web.src
    )}/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
  ],

  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    ...(redwoodProjectConfig.web.a11y
      ? [getAbsolutePath('@storybook/addon-a11y')]
      : []),
  ],

  core: {
    builder: '@storybook/builder-vite',
  },

  framework: {
    name: '@storybook/react-vite',
    /* This empty object is actually necessary. */
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  /* Only set staticDirs when running Storybook process; will fail if set for SB --build */
  ...(process.env.NODE_ENV !== 'production' && {
    staticDirs: [path.join(redwoodProjectPaths.web.base, 'public')],
  }),
}
export default baseConfig
