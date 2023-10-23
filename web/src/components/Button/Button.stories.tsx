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

import Button from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    colorTreatment: {
      options: ['primary', 'secondary', 'soft', 'minimal'],
      control: { type: 'radio' },
    },
    size: {
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
      control: { type: 'radio' },
    },
    pill: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    colorTreatment: 'primary',
    size: 'base',
    pill: false,
    disabled: false,
  },
  render: (props) => <Button {...props}>Button</Button>,
}
