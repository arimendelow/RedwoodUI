import { render } from '@redwoodjs/testing/web'

import ListContainer from './ListContainer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListContainer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListContainer />)
    }).not.toThrow()
  })
})
