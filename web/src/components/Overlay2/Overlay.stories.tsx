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

import type { Meta, StoryObj } from '@storybook/react'

import Button from '../Button/Button'

import Overlay from './Overlay'

const meta: Meta<typeof Overlay> = {
  component: Overlay.Root,
}

export default meta

type Story = StoryObj<typeof Overlay.Root>

export const Primary: Story = {
  render: (_props) => (
    <Overlay.Root>
      <Overlay.OpenTrigger asChild>
        <Button>Open Overlay</Button>
      </Overlay.OpenTrigger>

      <Overlay.Portal>
        <Overlay.Backdrop />
        <Overlay.ContentContainer className="h-28 w-28">
          <div className="h-full w-full bg-red-600" />
        </Overlay.ContentContainer>
      </Overlay.Portal>
    </Overlay.Root>
  ),
}
