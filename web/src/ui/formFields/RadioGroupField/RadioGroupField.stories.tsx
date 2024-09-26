import type { Meta, StoryObj } from '@storybook/react'

import { Form, FormProvider, useForm } from '@redwoodjs/forms'

import Button from 'src/ui/Button'

import RadioGroupField from './RadioGroupField'

const meta: Meta<typeof RadioGroupField> = {
  component: RadioGroupField,
  argTypes: {
    optional: {
      control: { type: 'boolean' },
    },
    hideErrorMessage: {
      control: { type: 'boolean' },
    },
    defaultValue: {
      name: 'default value',
      control: { type: 'select' },
      options: ['undefined', 'permit', 'invalidate', 'forbid'],
      mapping: {
        undefined: undefined,
        permit: 'permit',
        invalidate: 'invalidate',
        forbid: 'forbid',
      },
    },
    wrapperClassName: {
      table: {
        disable: true,
      },
    },
    options: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof RadioGroupField>

export const Primary: Story = {
  args: {
    optional: false,
    hideErrorMessage: false,
    defaultValue: undefined,
  },
  render: ({ optional, hideErrorMessage, defaultValue }) => (
    <RadioGroupField
      name="resale"
      label="Resale and transfers"
      description="Decide if people buy tickets from you or from scalpers."
      optional={optional}
      hideErrorMessage={hideErrorMessage}
      defaultValue={defaultValue}
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
  decorators: [
    (Story) => {
      interface ISampleForm {
        resale: 'permit' | 'invalidate' | 'forbid'
      }

      const methods = useForm<ISampleForm>()
      const onSubmit = (data: ISampleForm) => console.log(data)

      return (
        <FormProvider {...methods}>
          <Form<ISampleForm> onSubmit={onSubmit}>
            <Story />
            <Button className="mt-5" type="submit">
              Submit
            </Button>
          </Form>
        </FormProvider>
      )
    },
  ],
}
