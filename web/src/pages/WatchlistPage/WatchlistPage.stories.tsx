import type { Meta, StoryObj } from '@storybook/react'

import WatchlistPage from './WatchlistPage'

const meta: Meta<typeof WatchlistPage> = {
  component: WatchlistPage,
}

export default meta

type Story = StoryObj<typeof WatchlistPage>

export const Primary: Story = {}
