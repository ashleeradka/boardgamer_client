import React, { Component } from "react";
import Navbar from "./Navbar";
import "../App.css";
import GamesList from "./GamesList";
import CreateGame from "./Creategame";
import GameShowPage from "./GameShowPage.js";
import Login from "./Login.js";
// import { authorizer } from "./Apilogin.js";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

const url = "http://localhost:3001/api/v1";
const postUrl = "http://localhost:3001/api/v1/users/1/createboardgame";
class App extends Component {
  constructor() {
    super();

    this.state = {
      games: [],
      searchTerm: "",
      authorization: {
        loggedIn: false,
        user: {}
      }
    };
  }

  componentDidMount = () => {
    this.fetchGames();
    if (localStorage.getItem("jwt")) {
      this.findCurrentUser();
    }
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

  // THIS IS NEW CODE
  onLogin = form => {
    fetch(`${url}/auth`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: localStorage.getItem("jwt")
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(user => {
        if (!user.error) {
          this.setState({
            authorization: { isLoggedIn: true, user: user }
          });
          localStorage.setItem("jwt", user.jwt);
          console.log(this.state);
          this.findCurrentUser();
          this.props.history.push(`/`);
        } else {
          alert("User name / password combination not found!");
        }
      });
  };

  findCurrentUser = () => {
    return fetch(`${url}/current_user`, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: this.parseJwt(localStorage.getItem("jwt")).user_id
      }
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ authorization: { user: json, isLoggedIn: true } })
      );
  };

  parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.setState({ authorization: { user: {}, isLoggedIn: false } });
    this.props.history.push(`/login`);
  }

  // END OF NEW CODE

  render() {
    return (
      <div className="App">
        <Navbar
          handleSearch={this.handleSearch}
          userInfo={this.state.authorization}
          handleLogout={this.handleLogout.bind(this)}
        />
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
        <Route path="/login" render={() => <Login onLogin={this.onLogin} />} />
      </div>
    );
  }
}

export default withRouter(App);
