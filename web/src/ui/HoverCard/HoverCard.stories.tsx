import type { Meta, StoryObj } from '@storybook/react'

import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import HoverCard from './HoverCard'

const meta: Meta<typeof HoverCard> = {
  component: HoverCard,
  argTypes: {
    side: {
      control: {
        type: 'radio',
        options: ['top', 'bottom', 'left', 'right'],
      },
    },
    align: {
      control: {
        type: 'radio',
        options: ['start', 'center', 'end'],
      },
    },
    sideOffset: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    trigger: {
      table: {
        disable: true,
      },
    },
    content: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof HoverCard>

export const Primary: Story = {
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 10,
  },
  render: ({ side, align, sideOffset }) => (
    <HoverCard
      side={side}
      align={align}
      sideOffset={sideOffset}
      trigger={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" target="_blank" className="link">
          Trigger
        </a>
      }
      content={<ChildrenPlaceholder className=" h-48 w-60" />}
    />
  ),
  decorators: [
    (Story) => (
      <div className="flex justify-center">
        <Story />
      </div>
    ),
  ],
}
