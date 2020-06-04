import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import Logo from "./seer_logo.png";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.state({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">
              <img
                src={Logo}
                width="150"
                height="50"
                className="d-inline-block align-top"
                alt="SEER Logo"
              />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem><NavLink href="/newArticle">Submit a new article</NavLink></NavItem>
                <NavItem><NavLink href="https://github.com/DeclanSweeney/CISE_S1_2020_Team25/">GitHub</NavLink></NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
