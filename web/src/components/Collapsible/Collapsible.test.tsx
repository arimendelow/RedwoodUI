import { render } from '@redwoodjs/testing/web'

import Collapsible from './Collapsible'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Collapsible', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Collapsible />)
    }).not.toThrow()
  })
})
