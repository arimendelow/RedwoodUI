import { render } from '@redwoodjs/testing/web'

import TextAreaField from './TextAreaField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TextAreaField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TextAreaField />)
    }).not.toThrow()
  })
})
