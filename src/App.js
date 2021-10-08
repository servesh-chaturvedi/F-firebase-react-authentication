import NavBar from './components/NavBar'
import SignUp from './components/SignUp';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  )
};

export default App;
