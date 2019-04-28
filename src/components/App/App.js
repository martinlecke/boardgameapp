import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import { isLoggedIn } from '../../store/actions/authActions';

import Main from '../Main/Main';
import Header from '../Header/Header';
import './App.scss';

class App extends Component {
  state = {
    failLogin: ''
  };

  componentDidMount() {
    this.props.isLoggedIn();
  }

  handleLogout = () => {
    axios
      .get('http://localhost:8080/user/logout', { withCredentials: true })
      .then(response => {
        this.setState({ loggedIn: false });
      });
  };

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Header
          handleLogout={this.handleLogout}
          failLogin={this.state.failLogin}
        />
        <Main />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isLoggedIn: _ => dispatch(isLoggedIn())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
