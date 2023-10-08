module.exports = {
  /**
   * This line adds all of Storybook's essential addons.
   *
   * @see {@link https://storybook.js.org/addons/tag/essentials}
   */
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],
}
