import type { Meta, StoryObj } from '@storybook/react'

import Progress from './Progress'

const meta: Meta<typeof Progress> = {
  component: Progress,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 1000, step: 1 },
    },
    max: {
      control: { type: 'range', min: 0, max: 1000, step: 1 },
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Progress>

export const Primary: Story = {
  args: {
    value: 33,
    max: 100,
  },
  render: ({ value, max }) => <Progress value={value} max={max} />,
}
