import { render } from '@redwoodjs/testing/web'

import CheckboxField from './CheckboxField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CheckboxField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CheckboxField />)
    }).not.toThrow()
  })
})
