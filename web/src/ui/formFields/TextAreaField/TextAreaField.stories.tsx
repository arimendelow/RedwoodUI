import type { Meta, StoryObj } from '@storybook/react'

import { Form, FormProvider, useForm, useWatch } from '@redwoodjs/forms'

import TextAreaField from './TextAreaField'

const meta: Meta<typeof TextAreaField> = {
  component: TextAreaField,
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
    rows: {
      name: 'rows',
      control: { type: 'range', min: 1, max: 50, step: 1 },
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

type Story = StoryObj<typeof TextAreaField>

export const Primary: Story = {
  args: {
    optional: false,
    hideErrorMessage: false,
    inputTextSize: 'base',
    maxLength: undefined,
    rows: 7,
  },
  render: ({ optional, hideErrorMessage, inputTextSize, maxLength, rows }) => {
    return (
      <TextAreaField
        label="Bio"
        description="A short description of yourself."
        name="bio"
        placeholder="Hello there! I'm Redwood, a versatile JavaScript framework with a flair for modern web apps. Mixing GraphQL, React, and Prisma, I create seamless code symphonies. Off-duty, I enjoy refining deployment and musing over web development futures. Known for boosting productivity and a love for elegant coding, I'm your go-to for a delightful dev experience."
        optional={optional}
        hideErrorMessage={hideErrorMessage}
        inputTextSize={inputTextSize}
        maxLength={maxLength}
        rows={rows}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        currentLength={useWatch({ name: 'bio' })?.length || 0}
      />
    )
  },
  decorators: [
    (Story) => {
      interface ISampleForm {
        bio: string
      }

      const methods = useForm<ISampleForm>()
      const onSubmit = (data: ISampleForm) => console.log(data)

      return (
        <FormProvider {...methods}>
          <Form<ISampleForm>
            className="mx-auto w-full max-w-md"
            onSubmit={onSubmit}
          >
            <Story />
          </Form>
        </FormProvider>
      )
    },
  ],
}
