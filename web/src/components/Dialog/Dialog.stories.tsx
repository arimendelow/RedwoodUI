import { XMarkIcon } from '@heroicons/react/24/outline'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { Meta, StoryObj } from '@storybook/react'

import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import Button from '../Button/Button'

import Dialog from './Dialog'

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
            <DialogPrimitive.Title className="mb-4 text-3xl font-semibold">
              Dialog
            </DialogPrimitive.Title>
            <DialogPrimitive.Description>
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
            </DialogPrimitive.Description>
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
    closeButton: undefined,
    children: 'placeholder',
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
