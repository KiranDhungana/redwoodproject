import { render } from '@redwoodjs/testing/web'

import Productcard from './Productcard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Productcard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Productcard />)
    }).not.toThrow()
  })
})
