import { XMarkIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import Button from 'ui/Button'

import Dialog, { DialogDescription, DialogTitle } from './Dialog'

import ChildrenPlaceholder from 'src/ui/storyUtils/ChildrenPlaceholder'

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  argTypes: {
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
    heightOnSmallScreen: {
      control: { type: 'range', min: 200, max: 1000, step: 10 },
    },
    children: {
      options: ['placeholder', 'example'],
      control: { type: 'radio' },
      mapping: {
        placeholder: (
          <div className="h-full w-full sm:h-60 sm:w-96">
            <ChildrenPlaceholder />
          </div>
        ),
        example: (
          <div className="p-4 outline-none">
            <DialogTitle>Dialog</DialogTitle>
            <DialogDescription>
              This is a dialog built with{' '}
              <a
                className="text-blue-600"
                href="https://www.radix-ui.com/primitives/docs/components/dialog"
              >
                the RadixUI Dialog
              </a>
              . <br /> You can put any component here. <br /> To dismiss, simply
              click outside of it.
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

type Story = StoryObj<typeof Dialog>

export const Primary: Story = {
  args: {
    closeButton: 'button',
    children: 'example',
    heightOnSmallScreen: 300,
  },
  render: ({ heightOnSmallScreen, closeButton, children }) => (
    <Dialog
      heightOnSmallScreen={heightOnSmallScreen}
      openButton={<Button>Open Dialog</Button>}
      closeButton={closeButton}
    >
      {children}
    </Dialog>
  ),
}
