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

import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import Card from '../Card/Card'

import ListContainer from './ListContainer'

const meta: Meta<typeof ListContainer> = {
  component: ListContainer,
  argTypes: {
    items: {
      control: {
        type: 'array',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ListContainer>

export const Primary: Story = {
  args: {
    items: [
      <Card key={1}>
        <div className="h-60 w-full">
          <ChildrenPlaceholder />
        </div>
      </Card>,
      <Card key={2}>
        <div className="h-60 w-full">
          <ChildrenPlaceholder />
        </div>
      </Card>,
      <Card key={3}>
        <div className="h-60 w-full">
          <ChildrenPlaceholder />
        </div>
      </Card>,
    ],
  },
  render: ({ items }) => <ListContainer items={items} />,
}
