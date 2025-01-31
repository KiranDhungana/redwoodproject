import { Router, Route } from '@redwoodjs/router'
import PrivateRoute from 'src/components/Privateroute/Privateroute'
import { AuthProvider } from './context/AuthContext'

const Routes = () => {
  return (
    <AuthProvider>
      <Router>
        <Route path="/cart" page={CartPage} name="cart" />
        <Route path="/watchlist" page={WatchlistPage} name="watchlist" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/home" page={HomePage} name="home" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route notfound page={NotFoundPage} />
      </Router>
    </AuthProvider>
  )
}

export default Routes
