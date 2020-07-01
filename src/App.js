import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Order from "./Components/Order/Order";
import Products from "./Components/Products/Products";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/order" component={Order} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
