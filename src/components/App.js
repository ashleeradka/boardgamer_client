import React, { Component } from "react";
import Navbar from "./Navbar";
import "../App.css";
import GamesList from "./GamesList";
import CreateGame from "./Creategame";
import GameShowPage from "./GameShowPage.js";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

const url = "http://localhost:3001/api/v1";
const postUrl = "http://localhost:3001/api/v1/users/1/createboardgame";
class App extends Component {
  constructor() {
    super();

    this.state = {
      games: [],
      searchTerm: ""
    };
  }

  componentDidMount = () => {
    this.fetchGames();
  };

  fetchGames = () => {
    fetch(`${url}/boardgames`)
      .then(res => res.json())
      .then(json => this.setState({ games: json }));
  };

  getGames = () => {
    return this.state.games.filter(game =>
      game.game.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };

  handleSearch = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  onCreateGame = form => {
    let body = { form };
    fetch(postUrl, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(json => this.handleRedirect(json));
  };

  handleRedirect = json => {
    this.fetchGames();
    if (json.error) {
    } else {
      this.props.history.push(`/boardgame/${json.info.slug}`);
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar handleSearch={this.handleSearch} />
        <Route
          exact
          path="/"
          render={() => <GamesList games={this.getGames()} />}
        />
        <Route
          path="/createGame"
          render={() => <CreateGame onCreateGame={this.onCreateGame} />}
        />
        <Route
          path="/boardgame/:slug"
          render={props => {
            const game = this.state.games.find(
              game => game.game.slug === props.match.params.slug
            );
            return <GameShowPage game={game} />;
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);
