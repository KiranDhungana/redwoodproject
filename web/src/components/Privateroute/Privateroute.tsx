
import { navigate, routes } from '@redwoodjs/router'
import { useEffect } from 'react'
import { useAuth } from 'src/context/AuthContext'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.login())
    }
  }, [isAuthenticated])

  return isAuthenticated ? <>{children}</> : null
}

export default PrivateRoute
