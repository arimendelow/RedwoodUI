import { render } from '@redwoodjs/testing/web'

import HoverCard from './HoverCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HoverCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HoverCard />)
    }).not.toThrow()
  })
})
