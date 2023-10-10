import { render } from '@redwoodjs/testing/web'

import FieldWrapper from './InputFieldWrapper'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FieldWrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FieldWrapper />)
    }).not.toThrow()
  })
})
