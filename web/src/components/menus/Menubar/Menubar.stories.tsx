// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import Menubar from './Menubar'

const meta: Meta<typeof Menubar> = {
  component: Menubar,
}

export default meta

type Story = StoryObj<typeof Menubar>

export const Primary: Story = {}
