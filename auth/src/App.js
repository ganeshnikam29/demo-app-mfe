import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";


import SignIn from "./components/Signin";
import SignUp from "./components/Signup";


// CSS-IN-JS will generate class with this prefix
const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
  
})


export const App = ( { onSignIn, history }) => {
  return (
    <>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
              <Route path="/auth/signin">
                  <SignIn onSignIn={onSignIn}/>
              </Route>
              <Route path="/auth/signup">
                <SignUp onSignIn={onSignIn} />
              </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </>
  );
};
