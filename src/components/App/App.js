import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  Button,
  Input
} from "reactstrap";
import "./App.scss";

const Home = () => <div>Home</div>;
const Search = () => <div>Search</div>;
const Troll = () => <div>Troll</div>;

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
      <Router>
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
                    <NavLink tag={Link} to="/troll">
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/search">
                      Search
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      My Page
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>My games</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Log out</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </header>
          <main>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/troll" component={Troll} />
          </main>
          <footer>footer</footer>
        </div>
      </Router>
    );
  }
}

export default App;
