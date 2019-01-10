import React, { Component } from "react";
import { Col } from 'reactstrap';

class BoardGame extends Component {
  render() {
    return <Col>BoardGame clicked on {this.props.match.params.id}</Col>;
  }
}

export default BoardGame;
