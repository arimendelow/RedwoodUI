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

import Combobox from './Combobox'

const meta: Meta<typeof Combobox> = {
  component: Combobox,
}

export default meta

type Story = StoryObj<typeof Combobox>

export const Primary: Story = {
  render: () => {
    const options = [
      'Durward Reynolds',
      'Kenton Towne',
      'Therese Wunsch',
      'Benedict Kessler',
      'Katelyn Rohan',
    ]

    const [selectedOption, setSelectedOption] = React.useState(options[0])
    const [query, setQuery] = React.useState('')

    const filteredOptions =
      query === ''
        ? options
        : options.filter((option) => {
            return option.toLowerCase().includes(query.toLowerCase())
          })
    return (
      <Combobox<string>
        value={selectedOption}
        onValueChange={setSelectedOption}
        onInputChange={(event) => setQuery(event.target.value)}
        options={filteredOptions.map((option) => ({
          value: option,
          renderOption: ({ active, selected, disabled, value }) => (
            <div>{value}</div>
          ),
        }))}
      />
    )
  },
}
