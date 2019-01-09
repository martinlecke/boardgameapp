import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  InputGroup,
  InputGroupAddon,
  Button,
  Input
} from "reactstrap";
import "./App.scss";

const Home = () => <div>Home</div>;
const Search = () => <div>Search</div>;

class App extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">
              Boardgame App
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <InputGroup className="pt-4 pt-md-0">
                    <Input />
                    <InputGroupAddon addonType="append">
                      <Button>Search</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/search">
                    Search
                  </NavLink>
                </NavItem>
                {/* User Account menu */}
                {/* <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    My Page
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>My games</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Log out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}
              </Nav>
            </Collapse>
          </Navbar>
        </header>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search} />
        </main>
        <footer>footer</footer>
      </div>
    );
  }
}

export default withRouter(App);
