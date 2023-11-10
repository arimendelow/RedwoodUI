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

import Button from '../Button/Button'

import DropdownMenu from './DropdownMenu'

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

export const Primary: Story = {
  args: { side: 'bottom' },
  // See https://github.com/storybookjs/storybook/issues/17720#issuecomment-1525784750
  parameters: {
    docs: {
      source: {
        code: 'disabled',
      },
    },
  },
  render: ({ side }) => {
    const [selectedRadioValue, setSelectedRadioValue] =
      React.useState('first item')
    const [firstItemChecked, setFirstItemChecked] = React.useState(false)
    const [secondItemChecked, setSecondItemChecked] = React.useState(false)
    const [thirdItemChecked, setThirdItemChecked] = React.useState(false)
    return (
      <DropdownMenu
        openButton={<Button>Open Dropdown Menu</Button>}
        side={side}
        content={[
          {
            type: 'standard',
            label: 'Standard Section',
            items: [
              { item: <span>First item</span>, textValue: 'first item' },
              { item: <span>Second item</span>, textValue: 'second item' },
              { item: <span>Third item</span>, textValue: 'third item' },
            ],
          },
          {
            type: 'radio',
            label: 'Radio Section',
            selectedItemTextValue: selectedRadioValue,
            setSelectedItemTextValue: setSelectedRadioValue,
            items: [
              { item: <span>First item</span>, textValue: 'first item' },
              { item: <span>Second item</span>, textValue: 'second item' },
              { item: <span>Third item</span>, textValue: 'third item' },
            ],
          },
          {
            type: 'check',
            label: 'Check Section',
            items: [
              {
                item: <span>First item</span>,
                textValue: 'first item',
                checked: firstItemChecked,
                setChecked: setFirstItemChecked,
              },
              {
                item: <span>Second item</span>,
                textValue: 'second item',
                checked: secondItemChecked,
                setChecked: setSecondItemChecked,
              },
              {
                item: <span>Third item</span>,
                textValue: 'third item',
                checked: thirdItemChecked,
                setChecked: setThirdItemChecked,
              },
            ],
          },
        ]}
      />
    )
  },
  // decorators: [
  //   (Story) => (
  //     <div className="flex min-h-[30rem] flex-col items-center justify-center">
  //       <Story />
  //     </div>
  //   ),
  // ],
}
