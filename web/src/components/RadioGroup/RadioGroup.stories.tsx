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

import RadioGroup from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Primary: Story = {
  render: () => (
    <RadioGroup
      label="Resale and transfers"
      description="Decide if people buy tickets from you or from scalpers."
      options={[
        {
          value: 'permit',
          label: 'Allow tickets to be resold',
          description:
            "Customers can resell or transfer their tickets if they can't make it to the event.",
        },
        {
          disabled: true,
          value: 'invalidate',
          label: 'Invalidate resold tickets',
          description:
            'Tickets that are resold will be invalidated and the new buyer will not be able to use them.',
        },
        {
          value: 'forbid',
          label: "Don't allow tickets to be resold",
          description:
            'Tickets cannot be resold or transferred to another person.',
        },
      ]}
    />
  ),
}
