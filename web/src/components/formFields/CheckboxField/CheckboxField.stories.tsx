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

import CheckboxField from './CheckboxField'

const meta: Meta<typeof CheckboxField> = {
  component: CheckboxField,
}

export default meta

type Story = StoryObj<typeof CheckboxField>

export const Primary: Story = {}
