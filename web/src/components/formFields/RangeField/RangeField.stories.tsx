import type { Meta, StoryObj } from '@storybook/react'

import { Form, FormProvider, useForm } from '@redwoodjs/forms'

import Button from 'src/components/Button'

import RangeField from './RangeField'

const meta: Meta<typeof RangeField> = {
  component: RangeField,
}

export default meta

type Story = StoryObj<typeof RangeField>

export const Primary: Story = {
  render: () => {
    const ref = React.useRef<HTMLSpanElement>(null)
    React.useEffect(() => {
      setTimeout(() => ref.current?.focus(), 100)
    }, [])
    return (
      <RangeField
        ref={ref}
        name="fireIntensity"
        label="Dragon's Fire Intensity"
        description="Slide to set the intensity of your dragon's fire breath. Caution: Dragons may get a bit toasty!"
        min={0}
        max={100}
      />
    )
  },
  decorators: [
    (Story) => {
      interface ISampleForm {
        fireIntensity: number
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
            <Button className="mt-5" type="submit">
              Submit
            </Button>
          </Form>
        </FormProvider>
      )
    },
  ],
}
