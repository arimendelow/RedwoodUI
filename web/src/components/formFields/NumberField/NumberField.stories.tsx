import type { Meta, StoryObj } from '@storybook/react'

import { FormProvider, Form, useForm } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import { RedwoodJSLogo } from 'src/components/logos/RedwoodJSLogo'

import TextField from './NumberField'

const meta: Meta<typeof TextField> = {
  component: TextField,
  argTypes: {
    optional: {
      control: { type: 'boolean' },
    },
    hideErrorMessage: {
      control: { type: 'boolean' },
    },
    inputTextSize: {
      name: 'input text size',
      options: ['base', 'grow'],
      control: { type: 'radio' },
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
    step: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    wrapperClassName: {
      table: {
        disable: true,
      },
    },
    label: {
      table: {
        disable: true,
      },
    },
    description: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof TextField>

export const Primary: Story = {
  args: {
    optional: false,
    hideErrorMessage: false,
    inputTextSize: 'base',
    endComponent: undefined,
    min: undefined,
    step: undefined,
  },
  render: ({
    optional,
    hideErrorMessage,
    inputTextSize,
    endComponent,
    min,
    step,
  }) => {
    return (
      <TextField
        label="Alien Encounter Age"
        description="Enter the age you'd prefer to be when meeting an alien."
        name="preferredAge"
        placeholder="42"
        optional={optional}
        hideErrorMessage={hideErrorMessage}
        inputTextSize={inputTextSize}
        endComponent={endComponent}
        min={min}
        step={step}
      />
    )
  },
  decorators: [
    (Story) => {
      interface ISampleForm {
        preferredAge: string
      }

      const methods = useForm<ISampleForm>()
      const onSubmit = (data: ISampleForm) => console.log(data)

      return (
        <FormProvider {...methods}>
          <Form<ISampleForm>
            className="mx-auto w-full max-w-xs"
            onSubmit={onSubmit}
          >
            <Story />
          </Form>
        </FormProvider>
      )
    },
  ],
}
