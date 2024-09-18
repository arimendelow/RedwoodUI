import { render } from '@redwoodjs/testing/web'

import TelField from './TelField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TelField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TelField />)
    }).not.toThrow()
  })
})
