import { render } from '@redwoodjs/testing/web'

import Toster from './Toster'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Toster', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Toster />)
    }).not.toThrow()
  })
})
