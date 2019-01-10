import React, { Component } from "react";
import { Col } from 'reactstrap';
import myResults from '../_temp';

class BoardGame extends Component {

  state = {
    game: null
  }

  componentDidMount() {
    this.setState({ game: myResults.filter(each => String(each._id) === this.props.match.params.id)[0] })
  }

  render() {
    const game = this.state.game;
    return (
      <Col>
        BoardGame clicked on {this.props.match.params.id}
        <p>{ game && game.title } {game && game.year}</p>
        <p>
          <img src={game && game.picture} alt={game && game.title} />
        </p>
      </Col>
    );
  }
}

export default BoardGame;
