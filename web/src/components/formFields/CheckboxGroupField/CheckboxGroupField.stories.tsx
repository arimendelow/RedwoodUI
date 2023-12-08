import type { Meta, StoryObj } from '@storybook/react'

import { useForm, FormProvider, Form } from '@redwoodjs/forms'

import Button from 'src/components/Button'

import CheckboxGroupField from './CheckboxGroupField'

const meta: Meta<typeof CheckboxGroupField> = {
  component: CheckboxGroupField,
  argTypes: {
    indicator: {
      control: { type: 'radio' },
      options: ['checkbox', 'switch'],
    },
  },
}

export default meta

type Story = StoryObj<typeof CheckboxGroupField>

export const Primary: Story = {
  args: {
    indicator: 'checkbox',
  },
  render: ({ indicator }) => (
    <CheckboxGroupField
      name="resale"
      label="Resale and transfers"
      description="Decide if people buy tickets from you or from scalpers."
      indicator={indicator}
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
        selected: string[]
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
