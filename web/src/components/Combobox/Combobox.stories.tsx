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

import Combobox, { SimpleOptionRendererWithCheckmark } from './Combobox'

const meta: Meta<typeof Combobox> = {
  component: Combobox,
}

export default meta

type Story = StoryObj<typeof Combobox>

export const Primary: Story = {
  render: () => {
    const options = [
      'Durward Reynolds',
      'Kenton Towne',
      'Therese Wunsch',
      'Benedict Kessler',
      'Katelyn Rohan',
    ]

    return (
      <Combobox
        options={options.map((option) => ({
          value: option,
          renderOption: SimpleOptionRendererWithCheckmark,
        }))}
      />
    )
  },
}
