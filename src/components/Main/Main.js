import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import {
  Container,
  Row
} from "reactstrap";
import SearchResult from './SearchResult/SearchResult';
import Home from './Home/Home';
import './Main.scss';

class Main extends Component {
  render() {
    return (
      <main>
        <Container className="py-4">
          <Row>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={SearchResult} />
          </Row>
        </Container>
      </main>
    );
  }
}

export default withRouter(Main);
