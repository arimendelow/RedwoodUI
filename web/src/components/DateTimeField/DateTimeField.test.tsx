import { render } from '@redwoodjs/testing/web'

import DateTimeField from './DateTimeField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DateTimeField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DateTimeField />)
    }).not.toThrow()
  })
})
