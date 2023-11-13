import { render } from '@redwoodjs/testing/web'

import Combobox from './Combobox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Combobox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Combobox />)
    }).not.toThrow()
  })
})
