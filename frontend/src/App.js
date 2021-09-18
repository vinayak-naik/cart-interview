import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllProductsComponent from "./pages/products"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllProductsComponent} /> 
      </Switch>
    </Router> 
  ); 
};

export default App;
