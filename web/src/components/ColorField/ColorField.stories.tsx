import type { Meta, StoryObj } from '@storybook/react'

import { FormProvider, Form, useForm, useWatch } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import { RedwoodJSLogo } from 'src/components/logos/RedwoodJSLogo'

import ColorField from './ColorField'

const meta: Meta<typeof ColorField> = {
  component: ColorField,
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

type Story = StoryObj<typeof ColorField>

export const Primary: Story = {
  args: {
    optional: false,
    inputTextSize: 'base',
    maxLength: undefined,
    endComponent: undefined,
  },
  render: ({ optional, inputTextSize, maxLength, endComponent }) => {
    return (
      <ColorField
        label="Color"
        name="color"
        defaultInitialColor="#bf4622"
        optional={optional}
        inputTextSize={inputTextSize}
        maxLength={maxLength}
        endComponent={endComponent}
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
