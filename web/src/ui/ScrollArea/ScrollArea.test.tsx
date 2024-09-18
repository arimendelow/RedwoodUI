import { render } from '@redwoodjs/testing/web'

import ScrollArea from './ScrollArea'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ScrollArea', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScrollArea />)
    }).not.toThrow()
  })
})
