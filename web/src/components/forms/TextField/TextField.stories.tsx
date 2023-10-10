import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { FormProvider, Form, useForm, useWatch } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import { RedwoodJSLogo } from 'src/components/logos/RedwoodJSLogo'

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
    endComponent: {
      name: 'end component',
      options: ['undefined', 'Icon', 'Button'],
      mapping: {
        undefined: undefined,
        Icon: <RedwoodJSLogo className="h-5 w-5" />,
        Button: (
          <Button
            size="xs"
            onClick={(e) => {
              e.preventDefault()
              alert('Hello Redwood!')
            }}
          >
            Click me!
          </Button>
        ),
      },
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
    endComponent: undefined,
  },
  render: ({ inline, optional, maxLength, endComponent }) => {
    return (
      <TextField
        label="Username"
        name="username"
        placeholder="ari@mendelow.me"
        inline={inline}
        optional={optional}
        maxLength={maxLength}
        endComponent={endComponent}
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
