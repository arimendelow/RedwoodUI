import { XMarkIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'

import Button from 'ui/Button'
import { DialogDescription, DialogTitle } from 'ui/Dialog'
import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import ActionSheet from './ActionSheet'

const meta: Meta<typeof ActionSheet> = {
  component: ActionSheet,
  argTypes: {
    size: {
      control: { type: 'range', min: 200, max: 1000, step: 10 },
    },
    side: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
    // Disable the openButton control because we're just using a Button component passed in from the story
    openButton: {
      table: {
        disable: true,
      },
    },
    closeButton: {
      name: 'close button',
      control: { type: 'radio' },
      options: ['undefined', 'Button'],
      mapping: {
        undefined: undefined,
        Button: (
          <Button colorTreatment="minimal" className="right-2 top-2">
            <XMarkIcon className="h-5 w-5" />
          </Button>
        ),
      },
    },
    children: {
      options: ['placeholder', 'example'],
      control: { type: 'radio' },
      mapping: {
        placeholder: <ChildrenPlaceholder />,
        example: (
          <div className="p-4 outline-none">
            <DialogTitle>ActionSheet</DialogTitle>
            <DialogDescription>
              This is an Action Sheet built with{' '}
              <a
                className="text-blue-600"
                href="https://www.radix-ui.com/primitives/docs/components/dialog"
              >
                the RadixUI Dialog
              </a>{' '}
              and{' '}
              <a
                className="text-blue-600"
                href="https://www.framer.com/motion/"
              >
                Framer Motion
              </a>
              . <br /> You can put any component here. <br /> To dismiss, simply
              drag the sheet off the screen or click outside of it.
              <br />
              Look upon my works, ye mighty, and despair!
            </DialogDescription>
          </div>
        ),
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ActionSheet>

export const Primary: Story = {
  args: {
    size: 300,
    side: 'bottom',
    closeButton: undefined,
    children: 'placeholder',
  },
  render: ({ size, side, closeButton, children }) => (
    <ActionSheet
      size={size}
      side={side}
      openButton={<Button>Open ActionSheet</Button>}
      closeButton={closeButton}
    >
      {children}
    </ActionSheet>
  ),
}
