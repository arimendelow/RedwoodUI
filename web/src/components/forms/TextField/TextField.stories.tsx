import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { FormProvider, Form, useForm, useWatch } from '@redwoodjs/forms'

import TextField from './TextField'

const meta: Meta<typeof TextField> = {
  component: TextField,
  argTypes: {
    inline: {
      control: { type: 'boolean' },
    },
    optional: {
      control: { type: 'boolean' },
    },
    maxLength: {
      name: 'max input length',
      control: { type: 'number' },
    },
  },
}

export default meta

type Story = StoryObj<typeof TextField>

export const Primary: Story = {
  args: {
    inline: false,
    optional: false,
    maxLength: undefined,
  },
  render: ({ inline, optional, maxLength }) => {
    return (
      <TextField
        label="Username"
        name="username"
        placeholder="ari@mendelow.me"
        inline={inline}
        optional={optional}
        maxLength={maxLength}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        currentLength={useWatch({ name: 'username' })?.length || 0}
      />
    )
  },
  decorators: [
    (Story) => {
      interface ISampleForm {
        username: string
      }

      const methods = useForm<ISampleForm>()
      const onSubmit = (data: ISampleForm) => console.log(data)

      return (
        <FormProvider {...methods}>
          <Form<ISampleForm> className="max-w-sm" onSubmit={onSubmit}>
            <Story />
          </Form>
        </FormProvider>
      )
    },
  ],
}
