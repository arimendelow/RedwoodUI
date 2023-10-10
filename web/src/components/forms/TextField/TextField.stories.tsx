import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { FormProvider, Form, useForm, useWatch } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import { RedwoodJSLogo } from 'src/components/logos/RedwoodJSLogo'

import TextField from './TextField'

const meta: Meta<typeof TextField> = {
  component: TextField,
  argTypes: {
    optional: {
      control: { type: 'boolean' },
    },
    inputTextSize: {
      name: 'input text size',
      options: ['base', 'grow'],
      control: { type: 'radio' },
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
    optional: false,
    inputTextSize: 'base',
    maxLength: undefined,
    endComponent: undefined,
  },
  render: ({ optional, inputTextSize, maxLength, endComponent }) => {
    return (
      <TextField
        label="Username"
        name="username"
        placeholder="arimendelow"
        optional={optional}
        inputTextSize={inputTextSize}
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
