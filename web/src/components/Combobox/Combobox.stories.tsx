import type { Meta, StoryObj } from '@storybook/react'

import { FormProvider, Form, useForm } from '@redwoodjs/forms'

import Combobox, { SimpleOptionRendererWithCheckmark } from './Combobox'

const meta: Meta<typeof Combobox> = {
  component: Combobox,
}

export default meta

type Story = StoryObj<typeof Combobox>

export const Primary: Story = {
  render: () => {
    const options = [
      'Durward Reynolds',
      'Kenton Towne',
      'Therese Wunsch',
      'Benedict Kessler',
      'Katelyn Rohan',
    ]

    return (
      <Combobox
        name="person"
        options={options.map((option) => ({
          value: option,
          renderOption: SimpleOptionRendererWithCheckmark,
        }))}
      />
    )
  },
  decorators: [
    (Story) => {
      interface ISampleForm {
        person: string
      }

      const methods = useForm<ISampleForm>()
      const onSubmit = (data: ISampleForm) => {
        console.log(data)
      }

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
