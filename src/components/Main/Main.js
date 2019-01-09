import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button
} from "reactstrap";
import SearchResult from './SearchResult/SearchResult';
import './Main.scss';

const Home = () => (
  <Col className="d-flex justify-content-center flex-column align-items-center search-main">
    <InputGroup size="lg">
      <Input />
      <InputGroupAddon addonType="append">
        <Button>Search</Button>
      </InputGroupAddon>
    </InputGroup>
  </Col>
);

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
