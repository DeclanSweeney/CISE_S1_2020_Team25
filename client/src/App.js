import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import SearchPage from "./components/SearchPage";
import { Container } from "reactstrap";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container fluid>
            <Router>
              <Switch>
                <Route exact path="/" component={SearchPage} />
              </Switch>
            </Router>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
