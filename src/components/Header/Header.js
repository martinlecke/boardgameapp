import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
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
  // DropdownItem,
  // FormText,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "./Header.scss";

class Header extends Component {
  state = {
    isOpen: false,
    login: true,
    register: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleLoginRegister = e => {
    this.setState(prevState => {
      return { login: !prevState.login, register: !prevState.register };
    });
  };

  render() {
    return (
      <header>
        <Navbar color="dark" dark expand="md">
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
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Login
                </DropdownToggle>
                <DropdownMenu right>
                  {/* Logged in */}
                  <div className="p-3 navbar_login_dropdown">
                    <Nav tabs className="mb-2">
                      <NavItem>
                        <NavLink
                          href="#"
                          title="Login"
                          onClick={this.handleLoginRegister}
                          className={this.state.login ? 'active': ''}
                        >
                          Login
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          title="Register"
                          href="#"
                          onClick={this.handleLoginRegister}
                          className={this.state.register ? 'active' : ''}
                        >
                          Register
                        </NavLink>
                      </NavItem>
                    </Nav>
                    {this.state.login && (
                      <Form onSubmit={this.props.handleLogin} action="POST">
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder=""
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder=""
                          />
                        </FormGroup>
                        <FormGroup>
                          <Button className="w-100" type="submit">Login</Button>
                        </FormGroup>
                      </Form>
                    )}
                    {this.state.register && (
                      <Form onSubmit={this.props.handleRegister} action="POST">
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder=""
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder=""
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="repeatpassword">Repeat password</Label>
                          <Input
                            type="password"
                            name="repeatpassword"
                            placeholder=""
                          />
                        </FormGroup>
                        <FormGroup>
                          <Button className="w-100" type="submit">Register</Button>
                        </FormGroup>
                      </Form>
                    )}
                  </div>
                  {/* Not logged in */}
                  {/* <DropdownItem>My games</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Log out</DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Header);
