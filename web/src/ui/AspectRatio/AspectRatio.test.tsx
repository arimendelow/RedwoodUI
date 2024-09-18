import { render } from '@redwoodjs/testing/web'

import AspectRatio from './AspectRatio'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AspectRatio', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AspectRatio />)
    }).not.toThrow()
  })
})
