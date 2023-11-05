// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import { useForm, FormProvider, Form } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'

import {
  IDropdownOption,
  SimpleOptionRendererWithLeftCheckmark,
} from '../dropdownFieldCommon'

import Select from './Select'

const meta: Meta<typeof Select> = {
  component: Select,
}

export default meta

type Story = StoryObj<typeof Select>

export const Primary: Story = {
  render: () => {
    // renderOption is added below
    const options: Omit<IDropdownOption, 'renderOption'>[] = [
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
      <Select
        nullable
        name="person"
        placeholder="Select person..."
        options={options.map(({ value, displayValue, disabled }) => ({
          value,
          displayValue,
          disabled,
          renderOption: SimpleOptionRendererWithLeftCheckmark,
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
            <Button type="submit">Submit</Button>
          </Form>
        </FormProvider>
      )
    },
  ],
}
