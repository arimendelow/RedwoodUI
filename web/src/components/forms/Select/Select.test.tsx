import { render } from '@redwoodjs/testing/web'

import Select from './Select'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Select', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Select />)
    }).not.toThrow()
  })
})
