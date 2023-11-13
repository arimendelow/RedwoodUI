import { render } from '@redwoodjs/testing/web'

import TextField from './TextField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TextField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TextField />)
    }).not.toThrow()
  })
})
