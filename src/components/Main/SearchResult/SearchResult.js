import React, { Component } from "react";
import { Col } from "reactstrap";
import SingleResult from './SingleResult/SingleResult';
import queryString from "query-string";
import "./SearchResult.scss";

let myResults = [{
  title: "Pandemic",
  year: 2008,
  picture:
    "https://target.scene7.com/is/image/Target/GUEST_0313f621-d762-4e1d-9855-e32163314488?wid=488&hei=488&fmt=pjpeg",
  bggRating: 7.49,
  _id: 456546345345953458
}, {
    title: "Pandemic Expansion",
    year: 2008,
    picture:
      "https://target.scene7.com/is/image/Target/GUEST_0313f621-d762-4e1d-9855-e32163314488?wid=488&hei=488&fmt=pjpeg",
    bggRating: 7.49,
    _id: 235324554
  }, {
    title: "Pandemic: Seasons 2",
    year: 2011,
    picture:
      "https://target.scene7.com/is/image/Target/GUEST_0313f621-d762-4e1d-9855-e32163314488?wid=488&hei=488&fmt=pjpeg",
    bggRating: 4.49,
    _id: 653556
  }
];

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
