import type { Meta, StoryObj } from '@storybook/react'

import Badge, { badgeColorTreatments } from './Badge'

const meta: Meta<typeof Badge> = {
  component: Badge,
  argTypes: {
    colorTreatment: {
      name: 'color treatment',
      options: Object.keys(badgeColorTreatments),
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  args: {
    colorTreatment: 'neutral',
  },
  render: ({ colorTreatment }) => (
    <Badge colorTreatment={colorTreatment}>Badge</Badge>
  ),
}
