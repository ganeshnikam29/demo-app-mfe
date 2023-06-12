import React, { Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});
import Header from "./components/Header";
import ProgressBar from "./components/Progress";
import { createBrowserHistory } from 'history'

const MarketingLazy = React.lazy(() => import('./components/MarketingApp'));
const AuthLazyApp = React.lazy(() => import('./components/AuthApp'));
const DashboardApp = React.lazy(() => import('./components/DashboardApp'));


const history = createBrowserHistory();

export const App = () => {
  const [ isSignedIn, setIsSignedIn ] = useState('false');

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<ProgressBar />}>
            <Switch>
              <Route path="/auth">
                <AuthLazyApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/"/>}
                <DashboardApp />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
