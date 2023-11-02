import type { Meta, StoryObj } from '@storybook/react'

import { FormProvider, Form, useForm } from '@redwoodjs/forms'

import Combobox, { SimpleOptionRendererWithCheckmark } from './Combobox'

const meta: Meta<typeof Combobox> = {
  component: Combobox,
  argTypes: {
    nullable: {
      control: { type: 'boolean' },
    },
    multiple: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    optional: {
      control: { type: 'boolean' },
    },
    form: {
      table: {
        disable: true,
      },
    },
    as: {
      table: {
        disable: true,
      },
    },
    refName: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    by: {
      table: {
        disable: true,
      },
    },
    ref: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    __demoMode: {
      table: {
        disable: true,
      },
    },
    maxLength: {
      table: {
        disable: true,
      },
    },
    currentLength: {
      table: {
        disable: true,
      },
    },
    inline: {
      table: {
        disable: true,
      },
    },
    options: {
      table: {
        disable: true,
      },
    },
    selectedValue: {
      table: {
        disable: true,
      },
    },
    initSelectedValueUncontrolled: {
      table: {
        disable: true,
      },
    },
    setSelectedValue: {
      table: {
        disable: true,
      },
    },
    onInputChange: {
      table: {
        disable: true,
      },
    },
    onValueChange: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Combobox>

export const Primary: Story = {
  args: {
    nullable: false,
    multiple: false,
    disabled: false,
    label: 'Person',
    placeholder: 'Select person...',
    optional: false,
  },
  render: ({ nullable, multiple, disabled, label, placeholder, optional }) => {
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
        nullable={nullable}
        multiple={multiple}
        disabled={disabled}
        label={label}
        placeholder={placeholder}
        optional={optional}
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
