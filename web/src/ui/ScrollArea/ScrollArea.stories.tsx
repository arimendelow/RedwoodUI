import type { Meta, StoryObj } from '@storybook/react'

import ScrollArea from './ScrollArea'

const meta: Meta<typeof ScrollArea> = {
  component: ScrollArea,
}

export default meta

type Story = StoryObj<typeof ScrollArea>

export const Primary: Story = {
  render: () => {
    const TAGS = Array.from({ length: 50 }).map(
      (_, i, a) => `v1.2.0-beta.${a.length - i}`
    )
    return (
      <ScrollArea className="mx-auto h-[225px] w-[200px] rounded-lg shadow-md">
        <div className="px-5 py-[15px]">
          <div className="text-[15px] font-medium leading-[18px] text-violet-700">
            Tags
          </div>
          {TAGS.map((tag) => (
            <div
              className="mt-2.5 border-t border-t-violet-800 pt-2.5 text-[13px] leading-[18px] text-violet-800"
              key={tag}
            >
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea>
    )
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-full bg-violet-600 pt-40">
        <Story />
      </div>
    ),
  ],
}
