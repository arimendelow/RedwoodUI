import { render } from '@redwoodjs/testing/web'

import RadioGroup from './RadioGroupField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RadioGroup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RadioGroup />)
    }).not.toThrow()
  })
})
