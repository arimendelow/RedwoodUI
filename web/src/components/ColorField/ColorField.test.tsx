import { render } from '@redwoodjs/testing/web'

import ColorField from './ColorField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ColorField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ColorField />)
    }).not.toThrow()
  })
})
