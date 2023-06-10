import React, { Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});
import Header from "./components/Header";
import ProgressBar from "./components/Progress"

const MarketingLazy = React.lazy(() => import('./components/MarketingApp'));
const AuthLazyApp = React.lazy(() => import('./components/AuthApp'))

export const App = () => {
  const [ isSignedIn, setIsSignedIn ] = useState('false')
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<ProgressBar />}>
            <Switch>
              <Route path="/auth" >
                <AuthLazyApp onSignIn={() => setIsSignedIn(true)} />  
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
