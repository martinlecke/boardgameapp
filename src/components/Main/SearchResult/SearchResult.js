import React, { Component } from "react";
import { Col } from "reactstrap";
import SingleResult from './SingleResult/SingleResult';
import queryString from "query-string";
import myResults from '../_temp' // Temp
import "./SearchResult.scss";

class SearchResult extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    console.log(values);
  }
  render() {
    const header = {
      title: 'Title',
      year: 'Year',
      bggRating: 'Rating'
    }
    return <Col className="main_box_ui py-3 px-4">
        <SingleResult header={header} />
        <div className="d-flex flex-column">
          {myResults.map(game => (
            <SingleResult key={game._id} game={game} />
          ))}
        </div>
      </Col>;
  }
}

export default SearchResult;
