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

import { RedwoodJSLogo } from '../logos/RedwoodJSLogo'

import { AccordionContainer, AccordionItem } from './Accordion'

const meta: Meta<typeof AccordionContainer> = {
  component: AccordionContainer,
}

export default meta

type Story = StoryObj<typeof AccordionContainer>

export const Primary: Story = {
  render: () => (
    <AccordionContainer type="single" collapsible>
      <AccordionItem
        value="1"
        trigger={
          <span>
            Trigger text with SVG!{' '}
            <RedwoodJSLogo className="inline h-full w-4" />
          </span>
        }
        itemContent="Item 1 Content"
      />
      <AccordionItem
        value="2"
        trigger="Trigger2"
        itemContent="Item 2 Content"
      />
      <AccordionItem
        value="3"
        trigger="Trigger3"
        itemContent="Item 3 Content"
      />
    </AccordionContainer>
  ),
}
