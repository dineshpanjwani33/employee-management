import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Auth = React.lazy(() => import('./manager/pages/Auth'));
const Dashboard = React.lazy(() => import('./manager/pages/Dashboard'));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (!token) {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{
      isLogeddin: !!token,
      userId: userId,
      token: token,
      login: login,
      logout: logout
    }}>
      <Router>
          <Suspense fallback={<div className="center"><LoadingSpinner /></div>}>
            {routes}
          </Suspense>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
