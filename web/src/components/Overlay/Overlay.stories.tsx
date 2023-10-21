import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { Meta, StoryObj } from '@storybook/react'

import Button from '../Button/Button'

import Overlay from './Overlay'

const meta: Meta<typeof Overlay> = {
  component: Overlay,
}

export default meta

type Story = StoryObj<typeof Overlay>

export const Primary: Story = {
  render: () => (
    <Overlay openTrigger={<Button>Open overlay</Button>}>
      <div className="px-4 pb-4 outline-none">
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
      </div>
    </Overlay>
  ),
}
