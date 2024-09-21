import type { Meta, StoryObj } from '@storybook/react'

import Collapsible from './Collapsible'

import ChildrenPlaceholder from '.storybook/utilities/ChildrenPlaceholder'

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
