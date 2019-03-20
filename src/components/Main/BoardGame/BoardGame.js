import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import "./BoardGame.scss";
import axios from "axios";

class BoardGame extends Component {
  state = {
    game: null
  };

  componentDidMount() {
    axios.get(`http://localhost:8080/api/boardgame/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({game: response.data})
        console.log(response.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  render() {
    const game = this.state.game;

    if (game) {
      game.bggRating = game.bggRating === '0.00' ? '-.-' : game.bggRating;
    }
    return <Col>
        <Row>
          <Col className="main_box_ui boardgame px-0">
            <div className="d-flex p-4">
              <div className="mr-4">
                <img src={game && game.image} alt={game && game.title} className="boardgame_cover_img" />
              </div>
              <div className="flex-grow-1 d-flex flex-column">
                <Row>
                  <Col md="10">
                    <h1>
                      {game && game.title} <small>
                        ({game && game.yearPublished})
                      </small>
                    </h1>
                  </Col>
                  <Col tag="h3" md="2" className="text-right" title="Boardgamegeek.com Rating">
                    <span>
                      { game && game.bggRating }
                    </span> <br />
                    <small>Rating</small>
                  </Col>
                </Row>
                <Row className="mt-auto">
                  <Col className="boardgame_detail">
                    <div> age {game && game.age}+ </div>
                    <div>
                      {game && game.minPlayers} - {game && game.maxPlayers} players
                    </div>
                    <div> {game && game.playingTime} min</div>
                    <div> {game && game.complexity} </div>
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
