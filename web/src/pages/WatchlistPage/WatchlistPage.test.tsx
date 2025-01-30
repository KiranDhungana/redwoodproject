import { render } from '@redwoodjs/testing/web'

import WatchlistPage from './WatchlistPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WatchlistPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WatchlistPage />)
    }).not.toThrow()
  })
})
