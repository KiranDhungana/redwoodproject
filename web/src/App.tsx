import type { ReactNode } from 'react'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';



import './index.css'

interface AppProps {
  children?: ReactNode
}

const App = ({ children }: AppProps) => (
      <MantineProvider >

  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider>{children}</RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
    </MantineProvider>
)

export default App
