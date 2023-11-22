import { render } from '@redwoodjs/testing/web'

import FileField from './FileField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FileField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FileField />)
    }).not.toThrow()
  })
})
