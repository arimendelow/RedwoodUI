import { render } from '@redwoodjs/testing/web'

import UrlField from './UrlField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UrlField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UrlField />)
    }).not.toThrow()
  })
})
