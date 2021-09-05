import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/About" exact component={About}></Route>
        <Route path="/Cart" exact component={Cart}></Route>
        <Route path="/Products" exact component={Products}></Route>
        <Route path="/Checkout" exact component={Checkout}></Route>
        <Route path="/details/:id" exact component={SingleProduct}></Route>
        <Route path="*" exact component={Error}></Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
