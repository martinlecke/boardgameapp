import React, { Component, Fragment } from "react";

class GuestRoute extends Component {
  render() {
    if (!this.props.loggedIn) {
      return <Fragment>{this.props.children}</Fragment>
    } else {
      return null
    }
  }
}

export default GuestRoute;
