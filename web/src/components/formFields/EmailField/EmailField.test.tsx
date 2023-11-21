import { render } from '@redwoodjs/testing/web'

import EmailField from './EmailField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EmailField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmailField />)
    }).not.toThrow()
  })
})
