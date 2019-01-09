import React, { Component } from "react";
import { withRouter } from "react-router";

import Main from '../Main/Main';
import Header from '../Header/Header';
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default withRouter(App);
