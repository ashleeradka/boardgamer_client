import React, { Component } from "react";
import Navbar from "./Navbar";
import "../App.css";
import GamesList from "./GamesList";
import { Route, Switch } from "react-router-dom";

const url = "http://localhost:3001/api/v1";

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
      game.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };

  handleSearch = e => {
    this.setState({
      searchTerm: e.target.value
    });
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
      </div>
    );
  }
}

export default App;
