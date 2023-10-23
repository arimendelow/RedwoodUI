import { XMarkIcon } from '@heroicons/react/24/outline'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { Meta, StoryObj } from '@storybook/react'

import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import Button from '../Button/Button'

import Overlay from './ActionSheet'

const meta: Meta<typeof Overlay> = {
  component: Overlay,
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
            <DialogPrimitive.Title className="mb-4 text-3xl font-semibold">
              Modal overlay
            </DialogPrimitive.Title>
            <DialogPrimitive.Description>
              This is a dialog with a custom modal overlay built with{' '}
              <a
                className="text-blue-600"
                href="https://react-spectrum.adobe.com/react-aria/react-aria-components.html"
              >
                React Aria Components
              </a>{' '}
              and{' '}
              <a
                className="text-blue-600"
                href="https://www.framer.com/motion/"
              >
                Framer Motion
              </a>
              . Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              sit amet nisl blandit, pellentesque eros eu, scelerisque eros. Sed
              cursus urna at nunc lacinia dapibus.
            </DialogPrimitive.Description>
          </div>
        ),
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Overlay>

export const Primary: Story = {
  args: {
    size: 300,
    side: 'bottom',
    closeButton: undefined,
    children: 'placeholder',
  },
  render: ({ size, side, closeButton, children }) => (
    <Overlay
      size={size}
      side={side}
      openButton={<Button>Open overlay</Button>}
      closeButton={closeButton}
    >
      {children}
    </Overlay>
  ),
}
