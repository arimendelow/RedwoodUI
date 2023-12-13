import { render } from '@redwoodjs/testing/web'

import Menu from './Menu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Menu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Menu />)
    }).not.toThrow()
  })
})
