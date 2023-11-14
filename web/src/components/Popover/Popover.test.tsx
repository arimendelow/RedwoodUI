import { render } from '@redwoodjs/testing/web'

import Popover from './Popover'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Popover', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Popover />)
    }).not.toThrow()
  })
})
