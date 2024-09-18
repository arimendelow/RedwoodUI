import { render } from '@redwoodjs/testing/web'

import Dialog from './Dialog'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Dialog', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Dialog />)
    }).not.toThrow()
  })
})
