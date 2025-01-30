import { createContext, useContext, useState, useEffect } from 'react'
import { navigate, routes } from '@redwoodjs/router'
import axios from 'axios'


interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
  verifyToken: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  useEffect(() => {
    verifyToken()
  }, [token])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setToken(token)
    setIsAuthenticated(true)
    navigate("/home")
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
    navigate(routes.login())
  }

  const verifyToken = async () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      try {
        const response = await axios.post('http://localhost:8915/tokenverification', { token: storedToken })
        if (response.data.valid) {
          setIsAuthenticated(true)
          setToken(storedToken)
        } else {
          logout()
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        logout()
      }
    } else {
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, verifyToken }}>
      {children}
    </AuthContext.Provider>
  )
}
