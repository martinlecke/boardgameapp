import React from "react";
import { Link } from "react-router-dom";
import noCoverImg from '../../../img/nopicture.gif'


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
    <Link to={`/boardgame/${props.game.gameId}`} payload={props.game} className="d-flex single-result">
      <div>
        <img src={ props.game.image || noCoverImg } alt={ props.game.title } />
      </div>
      <h3 className="ml-4 align-self-center">
        { props.game.title } <small>({ props.game.yearPublished })</small>
      </h3>
      <div className="ml-auto align-self-center bgg-rating">
        { props.game.bggRating && props.game.bggRating }
      </div>
    </Link>
  );
};

export default singleResult;
