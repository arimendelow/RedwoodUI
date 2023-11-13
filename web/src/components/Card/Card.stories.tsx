import type { Meta, StoryObj } from '@storybook/react'

import AspectRatio from 'src/components/AspectRatio'
import Button from 'src/components/Button'
import { ChildrenPlaceholder } from 'src/lib/StorybookUtils'

import Card, {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './Card'

const meta: Meta<typeof Card> = {
  component: Card,
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
    children: {
      options: ['placeholder', 'example'],
      control: { type: 'radio' },
      mapping: {
        placeholder: (
          <div className="h-60 w-full">
            <ChildrenPlaceholder />
          </div>
        ),
        example: (
          <>
            <CardHeader>
              <CardTitle>Card</CardTitle>
              <CardDescription>
                This is a Card built for general purpose use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="prose-default mb-2">You can put anything here!</p>
              <AspectRatio ratio={16 / 9}>
                <img
                  className="Image"
                  src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                  alt="Landscape photograph by Tobias Tullius"
                />
              </AspectRatio>
            </CardContent>
            <CardFooter>
              <Button>Useless Button</Button>
            </CardFooter>
          </>
        ),
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Primary: Story = {
  args: {
    loading: false,
    children: 'example',
  },
  render: ({ loading, children }) => (
    <Card loading={loading} className="max-w-sm">
      {children}
    </Card>
  ),
}
