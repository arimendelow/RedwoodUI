import { render } from '@redwoodjs/testing/web'

import Menubar from './Menubar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Menubar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Menubar />)
    }).not.toThrow()
  })
})
