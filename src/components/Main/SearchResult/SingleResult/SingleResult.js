import React from "react";
import { Link } from "react-router-dom";


const singleResult = props => {
  if (props.header) {
    return (
      <div className="d-flex single-result_header">
        <div />
        <h2 className="ml-4 align-self-center">
          { props.header.title } <small>({ props.header.year })</small>
        </h2>
        <div className="ml-auto align-self-center bgg-rating">
          { props.header.bggRating }
        </div>
      </div>
    );
  }
  return (
    <Link to={`/boardgame/${props.game._id}`} payload={props.game} className="d-flex single-result">
      <div>
        <img src={ props.game.picture } alt={ props.game.title } />
      </div>
      <h3 className="ml-4 align-self-center">
        { props.game.title } <small>({ props.game.year })</small>
      </h3>
      <div className="ml-auto align-self-center bgg-rating">
        { props.game.bggRating }
      </div>
    </Link>
  );
};

export default singleResult;
