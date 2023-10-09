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

import { Form } from '@redwoodjs/forms'

import TextField from './TextField'

const meta: Meta<typeof TextField> = {
  component: TextField,
}

export default meta

type Story = StoryObj<typeof TextField>

export const Primary: Story = {
  render: () => {
    interface ISampleForm {
      username: string
    }
    return (
      <Form<ISampleForm> className="max-w-sm">
        <TextField
          name="username"
          label="Username"
          placeholder="ari@mendelow.me"
          markOptional
        />
      </Form>
    )
  },
}
