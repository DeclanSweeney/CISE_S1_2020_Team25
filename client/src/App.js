import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import SearchPage from "./components/SearchPage";
import NewArticle from "./components/NewArticle";
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
        <AppNavbar />
        <Container fluid>
          <Router>
            <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route exact path="/newArticle" component={NewArticle} />
            </Switch>
          </Router>
        </Container>
      </Provider>
    );
  }
}

export default App;
