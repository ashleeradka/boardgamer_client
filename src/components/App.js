import React, { Component } from "react";
import Navbar from "./Navbar";
import "../App.css";
import GamesList from "./GamesList";
import CreateGame from "./Creategame";
import GameShowPage from "./GameShowPage.js";
import Login from "./Login.js";
import Loading from "./Loading.js";
// import { authorizer } from "./Apilogin.js";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import CreateUser from "./CreateUser";
import UserProfile from "./Userprofile";
import OtherProfile from "./Otherprofile";

const url = "http://localhost:3001/api/v1";
const postUrl = "http://localhost:3001/api/v1/users/1/createboardgame";
const createUserUrl = "http://localhost:3001/api/v1/users/create";
const getUserUrl = "http://localhost:3001/api/v1/users/:id";

class App extends Component {
  constructor() {
    super();

    this.state = {
      games: [],
      searchTerm: "",
      authorization: {
        loggedIn: false,
        user: {}
      },
      error: ""
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
      .then(json => {
        this.setState({ games: json });
      });
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
    let userId = this.state.authorization.user.user_info.id;
    let body = { form };
    fetch(`${url}/users/${userId}/createboardgame`, {
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
            authorization: { isLoggedIn: true, user: user },
            error: ""
          });
          localStorage.setItem("jwt", user.jwt);
          this.findCurrentUser();
          this.props.history.push(`/`);
        } else {
          this.setState({ error: user.error });
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
  // ASHLEE NEW CODE
  onCreateUser = form => {
    let body = { form: form };
    fetch(createUserUrl, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(json => this.handleUserRedirect(json));
  };

  handleUserRedirect = json => {
    if (!json.error) {
      this.props.history.push(`/login`);
    }
  };

  // userCollection = userId => {
  //   fetch(`${url}/users/${userId}`)
  //     .then(res => res.json())
  //     .then(json => this.handleCollection(json));
  // };
  //
  // handleCollection = json => {
  //   this.setState(
  //     {
  //       user_games: json
  //     },
  //     json => this.getUserCollection()
  //   );
  // };
  //
  // getUserCollection = () => {
  //   return this.state.user_games;
  // };
  // END

  getUserGames = () => {
    let games = [];
    if (this.state.authorization.isLoggedIn) {
      this.state.authorization.user.user_games.map(user_game => {
        let gameInfo = this.state.games.filter(
          currentGame =>
            currentGame.game.id === user_game.game.id &&
            (user_game.info.owned || user_game.info)
        );
        games.push(gameInfo[0]);
      });
    }
    return games;
  };

  handleAddToCollection(e) {
    if (this.state.authorization.isLoggedIn) {
      const userId = this.state.authorization.user.user_info.id;
      const game = e.game;
      let postUrl = `http://localhost:3001/api/v1/addtocollection`;

      fetch(postUrl, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ game: game, user_id: userId })
      }).then(resp => this.checkResp(resp));
    } else {
      this.props.history.push(`/login`);
    }
  }

  handleRemoveFromCollection(e) {
    if (this.state.authorization.isLoggedIn) {
      const userId = this.state.authorization.user.user_info.id;
      const game = e.game;
      let postUrl = `http://localhost:3001/api/v1/removefromcollection`;

      fetch(postUrl, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ game: game, user_id: userId })
      }).then(resp => this.checkResp(resp));
    }
  }

  checkResp(resp) {
    console.log(resp);
    this.fetchGames();
    this.findCurrentUser();
  }

  render() {
    return (
      <div className="App">
        <Navbar
          handleSearch={this.handleSearch}
          userInfo={this.state.authorization}
          handleLogout={this.handleLogout.bind(this)}
        />
        {!!this.state.error ? (
          <div className="ui error message"> {this.state.error} </div>
        ) : null}
        <Route
          exact
          path="/"
          render={() => (
            <GamesList
              games={this.getGames()}
              user={this.state.authorization.user}
              onAddGame={this.handleAddToCollection.bind(this)}
              onRemoveGame={this.handleRemoveFromCollection.bind(this)}
            />
          )}
        />
        <Route
          path="/createGame"
          render={() => (
            <CreateGame
              user={this.state.authorization.user}
              onCreateGame={this.onCreateGame.bind(this)}
            />
          )}
        />
        <Route
          path="/user/:id"
          render={props => {
            return (
              <OtherProfile
                userId={props.match.params.id}
                user={this.state.authorization.user}
                onAddGame={this.handleAddToCollection.bind(this)}
                onRemoveGame={this.handleRemoveFromCollection.bind(this)}
              />
            );
          }}
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
        <Route
          path="/user/new"
          render={() => <CreateUser onCreateUser={this.onCreateUser} />}
        />
        <Route path="/loading" render={() => <Loading />} />
        <Route
          path="/mygames"
          render={() => (
            <GamesList
              games={this.getUserGames()}
              user={this.state.authorization.user}
              onAddGame={this.handleAddToCollection.bind(this)}
              onRemoveGame={this.handleRemoveFromCollection.bind(this)}
            />
          )}
        />
        <Route
          path="/myprofile"
          render={() => (
            <UserProfile
              user={this.state.authorization.user}
              games={this.getUserGames()}
              onAddGame={this.handleAddToCollection.bind(this)}
              onRemoveGame={this.handleRemoveFromCollection.bind(this)}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);

// DEAD CODE USE IF NECESSARY
// <Route
//   path="/mygames"
//   render={() => (
//     <UserCollection
//       user={this.state.authorization.user}
//       userCollection={() => this.userCollection.bind(this)}
//       games={this.getUserCollection()}
//     />
//   )}
// />
