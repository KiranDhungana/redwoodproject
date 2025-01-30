import { render } from '@redwoodjs/testing/web'

import Reusableinput from './Reusableinput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Reusableinput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Reusableinput />)
    }).not.toThrow()
  })
})
