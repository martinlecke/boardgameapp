import React, {Component} from 'react';
import { Col } from 'reactstrap';
import './SearchResult.scss';

let myResult = {
      title: "Pandemic",
      year: 2008,
      picture: "https://target.scene7.com/is/image/Target/GUEST_0313f621-d762-4e1d-9855-e32163314488?wid=488&hei=488&fmt=pjpeg",
      bggRating: 7.49
};


class SearchResult extends Component {


  render() {
    return <Col className="main_box_ui p-3">
        <ul className="list-unstyled">
          <li>
            <ul className="d-flex single-result list-unstyled">
              <li><img src={myResult.picture} alt={myResult.title} /></li>
              <li>{myResult.title}</li>
              <li>{myResult.year}</li>
              <li>{myResult.bggRating}</li>
            </ul>
          </li>
        </ul>
      </Col>;
  }
}

export default SearchResult;