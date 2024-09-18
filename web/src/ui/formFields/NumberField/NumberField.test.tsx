import { render } from '@redwoodjs/testing/web'

import NumberField from './NumberField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NumberField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NumberField />)
    }).not.toThrow()
  })
})
