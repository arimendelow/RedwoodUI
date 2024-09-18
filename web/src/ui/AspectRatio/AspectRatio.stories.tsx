import type { Meta, StoryObj } from '@storybook/react'

import AspectRatio from './AspectRatio'

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
}

export default meta

type Story = StoryObj<typeof AspectRatio>

export const Primary: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9}>
      <img
        className="Image"
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
        alt="Landscape photograph by Tobias Tullius"
      />
    </AspectRatio>
  ),
  decorators: [
    (Story) => (
      <div className=" w-80">
        <Story />
      </div>
    ),
  ],
}
