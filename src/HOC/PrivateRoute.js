import React, { Component, Fragment } from "react";

class PrivateRoute extends Component {
  render() {
    if (this.props.loggedIn) {
      return <Fragment>{this.props.children}</Fragment>
    } else {
      return null
    }
  }
}

export default PrivateRoute;
