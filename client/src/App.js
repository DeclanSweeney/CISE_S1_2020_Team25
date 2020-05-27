import React, { Component } from "react";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import SearchPage from "./components/searchPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container fluid>
          <SearchPage />
        </Container>
      </div>
    );
  }
}

export default App;
