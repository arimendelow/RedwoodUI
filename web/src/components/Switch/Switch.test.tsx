import { render } from '@redwoodjs/testing/web'

import Toggle from './Switch'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Toggle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Toggle />)
    }).not.toThrow()
  })
})
