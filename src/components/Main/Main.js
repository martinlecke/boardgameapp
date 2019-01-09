import React, {Component} from 'react';
import { Route } from "react-router-dom";
import { withRouter } from "react-router";

const Home = () => <div>Home</div>;
const Search = () => <div>Search</div>;

class Main extends Component {

  render() {
    return (
      <main>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
      </main>
    );
  }
}

export default withRouter(Main);