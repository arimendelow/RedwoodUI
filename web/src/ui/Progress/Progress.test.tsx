import { render } from '@redwoodjs/testing/web'

import Progress from './Progress'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Progress', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Progress />)
    }).not.toThrow()
  })
})
