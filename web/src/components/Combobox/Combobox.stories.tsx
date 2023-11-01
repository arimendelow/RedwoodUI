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
    const options: { value: string; disabled?: boolean }[] = [
      { value: 'Durward Reynolds' },
      { value: 'Kenton Towne' },
      { value: 'Therese Wunsch', disabled: true },
      { value: 'Benedict Kessler' },
      { value: 'Katelyn Rohan' },
      { value: 'Gavin Rohan' },
      { value: 'Keshaun McCullough' },
      { value: 'Virginia Tromp' },
      { value: 'Luigi Herman' },
      { value: 'Gina Abernathy' },
      { value: 'Maybelle Lehner' },
      { value: 'Arlo Bartoletti' },
      { value: 'Alvera An' },
      { value: 'Orville Dibbert' },
      { value: 'Laverna Denesik' },
      { value: 'Ferne Franecki' },
      { value: 'Parker Stiedemann' },
    ]

    return (
      <Combobox
        name="person"
        options={options.map(({ value, disabled }) => ({
          value,
          disabled,
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
