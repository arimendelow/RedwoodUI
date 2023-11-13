import type { Meta, StoryObj } from '@storybook/react'

import Button from 'src/components/Button'
import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import AlertDialog, { AlertContentWithActions } from './AlertDialog'

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  argTypes: {
    // Disable the openButton control because we're just using a Button component passed in from the story
    openButton: {
      table: {
        disable: true,
      },
    },
    children: {
      options: ['placeholder', 'with action and cancel'],
      control: { type: 'radio' },
      mapping: {
        placeholder: (
          <div className="h-full w-full sm:h-60 sm:w-96">
            <ChildrenPlaceholder />
          </div>
        ),
        'with action and cancel': (
          <AlertContentWithActions
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete the internet."
            actionText="Yes, delete the internet"
            onConfirm={() => alert('You deleted the internet.')}
          />
        ),
      },
    },
    className: {
      options: [undefined, 'p-4'],
      control: { type: 'radio' },
    },
  },
}

export default meta

type Story = StoryObj<typeof AlertDialog>

export const Primary: Story = {
  args: {
    children: 'with action and cancel',
    className: 'p-4',
  },
  render: ({ children, ...props }) => (
    <AlertDialog {...props} openButton={<Button>Open Alert Dialog</Button>}>
      {children}
    </AlertDialog>
  ),
}
