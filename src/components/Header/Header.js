import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, register } from '../../store/actions/authActions';
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
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import './Header.scss';
import GuestRoute from '../../HOC/GuestRoute';
import PrivateRoute from '../../HOC/PrivateRoute';

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

  handleLogin = e => {
    e.preventDefault();
    this.setState({ failLogin: '' });
    const credentials = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    };
    this.props.login(credentials);
  };

  handleRegister = e => {
    e.preventDefault();
    this.setState({ failLogin: '' });
    const credentials = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    }
    this.props.register(credentials);
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
              {/* <NavItem>
                <InputGroup className="pt-4 pt-md-0">
                  <Input />
                  <InputGroupAddon addonType="append">
                    <Button>Search</Button>
                  </InputGroupAddon>
                </InputGroup>
              </NavItem> */}
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
                <GuestRoute loggedIn={this.props.auth.isLoggedIn}>
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
                            className={this.state.login ? 'active' : ''}
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
                        <Form onSubmit={this.handleLogin} action="POST">
                          <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" placeholder="" />
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
                            <Button className="w-100" type="submit">
                              Login
                            </Button>
                          </FormGroup>
                          {this.props.failLogin && (
                            <p className="error">{this.props.failLogin}</p>
                          )}
                        </Form>
                      )}
                      {this.state.register && (
                        <Form onSubmit={this.handleRegister} action="POST">
                          <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" placeholder="" />
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
                            <Button className="w-100" type="submit">
                              Register
                            </Button>
                          </FormGroup>
                        </Form>
                      )}
                    </div>
                  </DropdownMenu>
                </GuestRoute>
                <PrivateRoute loggedIn={this.props.auth.isLoggedIn}>
                  <DropdownToggle nav caret>
                    My Page
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Options</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.handleLogout}>
                      Log out
                    </DropdownItem>
                  </DropdownMenu>
                </PrivateRoute>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials)),
  register: credentials => dispatch(register(credentials))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
