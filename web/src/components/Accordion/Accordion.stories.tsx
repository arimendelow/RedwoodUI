import type { Meta, StoryObj } from '@storybook/react'

import { RedwoodJSLogo } from 'src/components/logos/RedwoodJSLogo'
import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  argTypes: {
    type: {
      options: ['single', 'multiple'],
      control: { type: 'radio' },
    },
    asChild: {
      table: {
        disable: true,
      },
    },
    sections: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Primary: Story = {
  args: {
    type: 'single',
  },
  // See https://github.com/storybookjs/storybook/issues/17720#issuecomment-1525784750
  parameters: {
    docs: {
      source: {
        code: 'disabled',
      },
    },
  },
  render: ({ type }) => (
    <Accordion
      type={type}
      collapsible
      sections={[
        {
          value: 'a11y',
          trigger: 'Is it accessible?',
          content:
            "Yes. It adheres to the WAI-ARIA design pattern, as it's built with Radix UI.",
        },
        {
          value: 'styled',
          trigger: 'Is it styled?',
          content:
            'Yes! It matches all other components, including built-in dark mode support 😉',
        },
        {
          value: 'animated',
          trigger: 'Is it animated?',
          content: 'Yes, with Framer Motion.',
        },
        {
          value: 'component',
          trigger: (
            <div className="text-left">
              Can I use a component as the trigger and/or content?{' '}
              <RedwoodJSLogo className="inline h-5 w-5" />
            </div>
          ),
          content: (
            <div>
              Yes! You can use either a string or component for either of these.
              <div className="h-32">
                <ChildrenPlaceholder />
              </div>
            </div>
          ),
        },
      ]}
    />
  ),
}
