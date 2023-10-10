import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

addons.setConfig({
  theme: create({
    base: 'dark',

    brandImage: 'https://redwoodjs.com/images/logo-diecut-mark.svg',
    brandTitle: 'RedwoodJS Components',
    brandUrl: 'https://redwoodjs.com/',
  }),
})
