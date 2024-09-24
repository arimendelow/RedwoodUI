import type { Meta, StoryObj } from '@storybook/react'

import ChildrenPlaceholder from 'src/ui/storyUtils/ChildrenPlaceholder'

import Collapsible from './Collapsible'

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
}

export default meta

type Story = StoryObj<typeof Collapsible>

export const Primary: Story = {
  render: () => (
    <Collapsible
      title="@arimendelow starred 3 repositories"
      staticContent={
        <div className="h-20 w-full">
          <ChildrenPlaceholder text="static content" />
        </div>
      }
      collapsibleContent={
        <div className="h-52 w-full">
          <ChildrenPlaceholder text="collapsible content" />
        </div>
      }
    />
  ),
  decorators: [
    (Story) => (
      <div className=" w-80">
        <Story />
      </div>
    ),
  ],
}
