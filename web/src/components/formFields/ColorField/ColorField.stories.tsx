import type { Meta, StoryObj } from '@storybook/react'

import { FormProvider, Form, useForm } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import { RedwoodJSLogo } from 'src/components/logos/RedwoodJSLogo'

import ColorField from './ColorField'

const meta: Meta<typeof ColorField> = {
  component: ColorField,
  argTypes: {
    optional: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    initialColor: {
      name: 'initial color',
      control: { type: 'select' },
      options: ['undefined', 'white', 'black', 'redwood red'],
      mapping: {
        undefined: undefined,
        white: '#ffffff',
        black: '#000000',
        'redwood red': '#bf4622',
      },
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
    wrapperClassName: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ColorField>

export const Primary: Story = {
  args: {
    optional: false,
    label: 'Color',
    initialColor: 'undefined',
    endComponent: undefined,
    placeholder: 'Select color...',
  },
  render: ({ optional, label, placeholder, initialColor, endComponent }) => {
    return (
      <ColorField
        label={label}
        name="color"
        initialColor={initialColor}
        optional={optional}
        endComponent={endComponent}
        placeholder={placeholder}
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
