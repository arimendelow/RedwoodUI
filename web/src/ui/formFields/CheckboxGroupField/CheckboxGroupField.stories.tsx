import type { Meta, StoryObj } from '@storybook/react'

import { useForm, FormProvider, Form } from '@redwoodjs/forms'

import Button from 'src/ui/Button'

import CheckboxGroupField from './CheckboxGroupField'

const meta: Meta<typeof CheckboxGroupField> = {
  component: CheckboxGroupField,
  argTypes: {
    optional: {
      control: { type: 'boolean' },
    },
    hideErrorMessage: {
      control: { type: 'boolean' },
    },
    indicator: {
      control: { type: 'radio' },
      options: ['checkbox', 'switch'],
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

type Story = StoryObj<typeof CheckboxGroupField>

export const Primary: Story = {
  args: {
    optional: false,
    hideErrorMessage: false,
    indicator: 'checkbox',
    defaultValue: ['nightOwlMode', 'silentGuardian'],
  },
  render: ({ optional, hideErrorMessage, indicator, defaultValue }) => (
    <CheckboxGroupField
      name="options"
      label="Account Options"
      description="Customize your experience by selecting from the options below."
      indicator={indicator}
      optional={optional}
      hideErrorMessage={hideErrorMessage}
      defaultValue={defaultValue}
      options={[
        {
          value: 'nightOwlMode',
          label: 'Night Owl Mode',
          description:
            'Activates a darker theme for late-night app usage. Perfect for browsing without waking up the neighborhood owls.',
        },
        {
          value: 'memoryLane',
          label: 'Memory Lane',
          description:
            "Displays nostalgic content from your earlier activity on the app, because who doesn't like a trip down memory lane?",
        },
        {
          value: 'mysteryFeature',
          label: 'Mystery Feature',
          description:
            'Enables a random, fun feature every week. Could be anything from retro sound effects to vintage filters!',
        },
        {
          value: 'invisibleInk',
          label: 'Invisible Ink',
          description:
            "Makes all text on the app invisible. Because sometimes you just don't want to read anything.",
          disabled: true,
        },
        {
          value: 'silentGuardian',
          label: 'Silent Guardian',
          description:
            'Silently filters out spoilers from your feed. Because no one likes unsolicited plot reveals.',
        },
        {
          value: 'whimsicalWidgets',
          label: 'Whimsical Widgets',
          description:
            'Add fun, animated widgets to your dashboard. They serve no purpose but to make you smile.',
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
