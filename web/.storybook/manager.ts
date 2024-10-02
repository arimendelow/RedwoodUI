import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

addons.setConfig({
  theme: create({
    base: 'dark',
    brandImage: 'https://redwoodjs.com/images/logo--dark.svg',
    brandTitle: 'RedwoodJS Components',
    brandUrl: 'https://redwoodjs.com/',
  }),
})
