import { render } from '@redwoodjs/testing/web'

import AlertDialog from './AlertDialog'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AlertDialog', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AlertDialog />)
    }).not.toThrow()
  })
})
