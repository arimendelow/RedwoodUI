import type { Meta, StoryObj } from '@storybook/react'

import Toggle from './Switch'

const meta: Meta<typeof Toggle> = {
  component: Toggle,
}

export default meta

type Story = StoryObj<typeof Toggle>

export const Primary: Story = {}
