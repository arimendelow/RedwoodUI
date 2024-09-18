import { render } from '@redwoodjs/testing/web'

import CheckboxGroupField from './CheckboxGroupField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CheckboxGroupField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CheckboxGroupField />)
    }).not.toThrow()
  })
})
