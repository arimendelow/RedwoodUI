import type { Meta, StoryObj } from '@storybook/react'

import DateTimePicker from './DateTimePicker'

const meta: Meta<typeof DateTimePicker> = {
  component: DateTimePicker,
}

export default meta

type Story = StoryObj<typeof DateTimePicker>

export const Primary: Story = {}
