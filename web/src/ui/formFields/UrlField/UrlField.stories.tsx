import type { Meta, StoryObj } from '@storybook/react'

import { FormProvider, Form, useForm, useWatch } from '@redwoodjs/forms'

import Button from 'src/ui/Button/Button'
import { RedwoodJSLogo } from 'src/ui/storyUtils/RedwoodJSLogo'

import UrlField from './UrlField'

const meta: Meta<typeof UrlField> = {
  component: UrlField,
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
    currentLength: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof UrlField>

export const Primary: Story = {
  args: {
    optional: false,
    hideErrorMessage: false,
    inputTextSize: 'base',
    maxLength: undefined,
    endComponent: undefined,
  },
  render: ({
    optional,
    hideErrorMessage,
    inputTextSize,
    maxLength,
    endComponent,
  }) => {
    return (
      <UrlField
        label="Favorite Website"
        description="What is your favorite website?"
        name="favSite"
        placeholder="https://redwoodjs.com"
        optional={optional}
        hideErrorMessage={hideErrorMessage}
        inputTextSize={inputTextSize}
        maxLength={maxLength}
        endComponent={endComponent}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        currentLength={useWatch({ name: 'favSite' })?.length || 0}
      />
    )
  },
  decorators: [
    (Story) => {
      interface ISampleForm {
        favSite: string
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
