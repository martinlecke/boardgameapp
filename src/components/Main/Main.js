import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import {
  Container,
  Row
} from "reactstrap";
import SearchResult from './SearchResult/SearchResult';
import Home from './Home/Home';
import BoardGame from './BoardGame/BoardGame';
import './Main.scss';

class Main extends Component {
  render() {
    return (
      <main>
        <Container className="py-4">
          <Row>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={SearchResult} />
            <Route path="/boardgame/:id" component={BoardGame} />
          </Row>
        </Container>
      </main>
    );
  }
}

export default withRouter(Main);
