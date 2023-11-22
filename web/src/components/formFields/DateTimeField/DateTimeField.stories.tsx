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

import DateTimeField from './DateTimeField'

const meta: Meta<typeof DateTimeField> = {
  component: DateTimeField,
}

export default meta

type Story = StoryObj<typeof DateTimeField>

export const Primary: Story = {}
