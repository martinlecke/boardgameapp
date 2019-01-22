import React, { Component } from "react";
import { Col } from "reactstrap";
import SingleResult from "./SingleResult/SingleResult";
import axios from "axios";
import "./SearchResult.scss";

class SearchResult extends Component {
  state = {
    games: []
  };
  componentDidMount() {
    const searchQuery = this.props.location.search;
    axios
      .get(`http://localhost:8080/api/search${searchQuery}`)
      .then(response => {this.setState({games: response.data})});
  }
  render() {
    const header = {
      title: "Title",
      year: "Year",
      bggRating: "Rating"
    };
    return (
      <Col className="main_box_ui py-3 px-4">
        <SingleResult header={header} />
        <div className="d-flex flex-column">
          {this.state.games && this.state.games.map(game => (
            <SingleResult key={game.gameId} game={game} />
          ))}
        </div>
      </Col>
    );
  }
}

export default SearchResult;
