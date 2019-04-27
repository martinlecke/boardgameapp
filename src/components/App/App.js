import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";

import Main from "../Main/Main";
import Header from "../Header/Header";
import "./App.scss";

class App extends Component {
  state = {
    loggedIn: false,
    failLogin: ''
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:8080/user/login",
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
      .then(response => {
        this.setState({ loggedIn: response.data.loggedIn });
      })
  }

  handleRegister = e => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    axios({
      method: "post",
      url: "http://localhost:8080/user/register",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email,
        password
      },
      withCredentials: true
    }).then(response => {
      this.setState({ loggedIn: response.data.loggedIn });
    });
  };

  handleLogin = e => {
    e.preventDefault();
    this.setState({ failLogin: '' })
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    axios({
      method: "post",
      url: "http://localhost:8080/user/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email,
        password
      },
      withCredentials: true
    })
    .then(response => {
      this.setState({ loggedIn: true });
    })
    .catch(e => {
      this.setState({failLogin: 'Wrong username or password.'})
    });
  };

  handleLogout = () => {
    axios.get("http://localhost:8080/user/logout", {withCredentials: true}).then(response => {
      this.setState({ loggedIn: false });
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          handleRegister={this.handleRegister}
          handleLogin={this.handleLogin}
          loggedIn={this.state.loggedIn}
          handleLogout={this.handleLogout}
          failLogin={this.state.failLogin}
        />
        <Main />
      </div>
    );
  }
}

export default withRouter(App);
