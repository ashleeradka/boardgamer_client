import React, { Component } from "react";
import Navbar from "./Navbar";
import "../App.css";
import GamesList from "./GamesList";
import CreateGame from "./Creategame";
import GameShowPage from "./GameShowPage.js";
import { Route, Switch } from "react-router-dom";

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
      .then(json => console.log(json));
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

export default App;

// <Route
//             path="/paintings/:slug"
//             render={props => {
//               const painting = this.state.paintings.find(
//                 pntg => pntg.slug === props.match.params.slug
//               );
//               console.log('painting', painting);
//
//               return painting ? (
//                 <PaintingShow painting={painting} />
//               ) : (
//                 <h1>Loading...</h1>
//               );
//             }}
//           />
