import type { Meta, StoryObj } from '@storybook/react'

import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import Button from '../Button/Button'

import {
  PopoverRoot,
  PopoverTrigger,
  // PopoverAnchor,
  PopoverPortal,
  PopoverContent,
  // PopoverArrow,
  // PopoverClose,
} from './Popover'

const meta: Meta<typeof PopoverRoot> = {
  component: PopoverRoot,
}

export default meta

type Story = StoryObj<typeof PopoverRoot>

export const Primary: Story = {
  render: () => (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent>
          <ChildrenPlaceholder className="h-48 w-48" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  ),
}
