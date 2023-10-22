import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { Meta, StoryObj } from '@storybook/react'

import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import Button from '../Button/Button'

import Overlay from './Overlay'

const meta: Meta<typeof Overlay> = {
  component: Overlay,
  argTypes: {
    side: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Overlay>

export const Primary: Story = {
  args: {
    side: 'bottom',
  },
  render: ({ side }) => (
    <Overlay
      side={side}
      openButton={<Button>Open overlay</Button>}
      closeButton={<Button>Close overlay</Button>}
    >
      <ChildrenPlaceholder />
      {/* <div className="p-4 outline-none">
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
          <a className="text-blue-600" href="https://www.framer.com/motion/">
            Framer Motion
          </a>
          . Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit
          amet nisl blandit, pellentesque eros eu, scelerisque eros. Sed cursus
          urna at nunc lacinia dapibus.
        </DialogPrimitive.Description>
      </div> */}
    </Overlay>
  ),
}
