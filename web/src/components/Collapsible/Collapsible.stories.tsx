// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'

import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

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
      trigger={<ChevronUpDownIcon className="h-5 w-5" />}
      unCollapsedContent={
        <div className="h-20 w-full">
          <ChildrenPlaceholder />
        </div>
      }
      collapsibleContent={
        <div className="h-52 w-full">
          <ChildrenPlaceholder />
        </div>
      }
    />
  ),
}
