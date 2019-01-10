import React, { Component } from 'react';
import {
  Col,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Form
} from 'reactstrap';
import './Home.scss';

class Home extends Component {
  state = {
    searchInput: ''
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/search?query=${this.state.searchInput}`);
    this.setState({ searchInput: '' });
  }

  changeSearchInput = (e) => {
    this.setState({searchInput: e.target.value});
  }

  render() {
    return (
      <Col>
        <Form onSubmit={this.onFormSubmit} className="search-main d-flex justify-content-center flex-column align-items-center">
          <InputGroup size="lg">
            <Input type="text" value={this.state.searchInput} onChange={this.changeSearchInput} />
            <InputGroupAddon addonType="append">
              <Button type="submit">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </Col>
    );
  }
}



export default Home;