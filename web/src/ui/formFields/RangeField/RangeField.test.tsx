import { render } from '@redwoodjs/testing/web'

import RangeField from './RangeField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RangeField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RangeField />)
    }).not.toThrow()
  })
})
