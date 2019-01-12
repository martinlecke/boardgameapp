import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import myResults from "../_temp";
import "./BoardGame.scss";

class BoardGame extends Component {
  state = {
    game: null
  };

  componentDidMount() {
    this.setState({
      game: myResults.filter(
        each => String(each._id) === this.props.match.params.id
      )[0]
    });
  }

  render() {
    const game = this.state.game;
    return <Col>
        <Row>
          <Col className="main_box_ui boardgame px-0">
            <div className="d-flex p-4">
              <div className="mr-4">
                <img src={game && game.picture} alt={game && game.title} className="boardgame_cover_img" />
              </div>
              <div className="flex-grow-1 d-flex flex-column">
                <Row>
                  <Col md="10">
                    <h1>
                      {game && game.title} <small>
                        ({game && game.year})
                      </small>
                    </h1>
                  </Col>
                  <Col tag="h3" md="2" className="text-right" title="Boardgamegeek.com Rating">
                    <span>{game && game.bggRating}</span> <br />
                    <small>Rating</small>
                  </Col>
                </Row>
                <Row className="mt-auto">
                  <Col className="boardgame_detail">
                    <div> { game && game.age} </div>
                    <div> { game && game.players } players</div>
                    <div> { game && game.playingtime } </div>
                    <div> { game && game.complexity } </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div />
          </Col>
        </Row>
        <Row>
          <Col className="main_box_ui mt-3 py-3 px-4">
            <div>{game && game.description}</div>
          </Col>
        </Row>
      </Col>;
  }
}

export default BoardGame;
