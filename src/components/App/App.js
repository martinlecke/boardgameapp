import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";

import Main from "../Main/Main";
import Header from "../Header/Header";
import "./App.scss";

class App extends Component {
  handleRegister = e => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    // axios.post('http://localhost:8080/user/register', {
    //   email,
    //   password
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

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
    })
      .then((response) => {
        console.log(response)
      });
  };

  render() {
    return (
      <div className="App">
        <Header handleRegister={this.handleRegister} />
        <Main />
      </div>
    );
  }
}

export default withRouter(App);
