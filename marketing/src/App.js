import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";


import Landing from "./components/Landing";
import Pricing from "./components/Pricing";


// CSS-IN-JS will generate class with this prefix
const generateClassName = createGenerateClassName({
  productionPrefix: 'ma',
  
})


export const App = ( { history }) => {
  return (
    <>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </>
  );
};
