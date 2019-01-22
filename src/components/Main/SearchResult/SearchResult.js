import React, { Component } from "react";
import { Col } from "reactstrap";
import SingleResult from './SingleResult/SingleResult';
import queryString from "query-string";
import myResults from '../_temp' // Temp
import axios from 'axios';
import "./SearchResult.scss";

class SearchResult extends Component {
  componentDidMount() {
    const values = this.props.location.search.substr(1);
    console.log(values);
    axios.get(`http://localhost:8080/api/search?${values}`)
      .then(response => {
        console.log(response.data)
      });
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
