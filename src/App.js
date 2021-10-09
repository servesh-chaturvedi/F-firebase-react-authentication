import NavBar from './components/NavBar'
import SignUp from './components/SignUp';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import UpdateProfile from './components/UpdateProfile';
import ForgotPassword from './components/ForgotPassword';
import Error from './components/Error'
import PrivateRoute from './components/PrivateRoute';

import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <NavBar />
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute exact path='/update-profile' component={UpdateProfile} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path='/forgot-password' component={ForgotPassword} />
            <Route path='*' component={Error} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  )
};

export default App;
