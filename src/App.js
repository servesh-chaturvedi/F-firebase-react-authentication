import NavBar from './components/NavBar'
import SignUp from './components/SignUp';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
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
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path='*' component={Error} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  )
};

export default App;
