import { render } from '@redwoodjs/testing/web'

import ActionSheet from './ActionSheet'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ActionSheet', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ActionSheet />)
    }).not.toThrow()
  })
})
