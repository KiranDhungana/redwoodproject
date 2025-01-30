import { render } from '@redwoodjs/testing/web'

import Privateroute from './Privateroute'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Privateroute', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Privateroute />)
    }).not.toThrow()
  })
})
