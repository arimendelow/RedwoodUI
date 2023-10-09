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

import FieldWrapper from './FieldWrapper'

const meta: Meta<typeof FieldWrapper> = {
  component: FieldWrapper,
}

export default meta

type Story = StoryObj<typeof FieldWrapper>

export const Primary: Story = {}
