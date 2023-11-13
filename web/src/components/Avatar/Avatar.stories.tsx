import type { Meta, StoryObj } from '@storybook/react'

import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Avatar
          src="https://avatars.githubusercontent.com/u/16390116?v=4"
          alt="@arimendelow"
          fallback="AM"
        />
        <Avatar
          src="https://avatars.githubusercontent.com/u/45050444?s=200&v=4"
          alt="@redwoodjs"
          fallback="RW"
        />
        <Avatar src="not a real URL" alt="this image is broken" fallback="BR" />
      </div>
    )
  },
}
