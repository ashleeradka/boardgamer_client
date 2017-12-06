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
import UsersList from "./UsersList.js";
import withAuth from "./WithAuth.js";

const url = "https://api-boardgamer.herokuapp.com/api/v1";
const postUrl =
  "https://api-boardgamer.herokuapp.com/api/v1/users/1/createboardgame";
const createUserUrl =
  "https://api-boardgamer.herokuapp.com/api/v1/users/create";
const getUserUrl = "https://api-boardgamer.herokuapp.com/api/v1/users/:id";
const updateUserUrl =
  "https://api-boardgamer.herokuapp.com/api/v1/users/update";

class App extends Component {
  constructor() {
    super();

    this.state = {
      games: [],
      searchTerm: "",
      authorization: {
        isloggedIn: false,
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
        json.sort(function(a, b) {
          if (a.game.name.toLowerCase() < b.game.name.toLowerCase()) return -1;
          if (a.game.name.toLowerCase() > b.game.name.toLowerCase()) return 1;
          return 0;
        });
        this.setState({ games: json });
      });
  };

  getGames = () => {
    let games = this.state.games.filter(game =>
      game.game.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    return games.sort(function(a, b) {
      if (a.game.name.toLowerCase() < b.game.name.toLowerCase()) return -1;
      if (a.game.name.toLowerCase() > b.game.name.toLowerCase()) return 1;
      return 0;
    });
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

  onUpdateUser = (user, newPic) => {
    let body = { user: user, newPic: newPic };
    fetch(updateUserUrl, {
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
    return games.filter(game =>
      game.game.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  };

  handleAddToCollection(e) {
    if (this.state.authorization.isLoggedIn) {
      const userId = this.state.authorization.user.user_info.id;
      const game = e.game;
      let postUrl = `https://api-boardgamer.herokuapp.com/api/v1/addtocollection`;

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
      let postUrl = `https://api-boardgamer.herokuapp.com/api/v1/removefromcollection`;

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

  attributePost(body) {
    fetch("https://api-boardgamer.herokuapp.com/api/v1/updateattribute", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(body)
    }).then(resp => this.checkResp(resp));
  }

  checkResp(resp) {
    this.findCurrentUser();
    this.fetchGames();
    this.getUserGames();
    this.getGames();
  }

  addFriend = (user, friendBool) => {
    fetch("https://api-boardgamer.herokuapp.com/api/v1/addOrRemoveFriend", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        friend_id: user.user.id,
        user_id: this.state.authorization.user.user_info.id,
        removing: friendBool
      })
    }).then(resp => this.checkResp(resp));
  };

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
            <div id="profileGreyed">
              <GamesList
                games={this.getGames()}
                user={this.state.authorization.user}
                onAddGame={this.handleAddToCollection.bind(this)}
                onRemoveGame={this.handleRemoveFromCollection.bind(this)}
                attributePost={this.attributePost.bind(this)}
              />
            </div>
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
          exact
          path="/new"
          render={() => <CreateUser onCreateUser={this.onCreateUser} />}
        />
        <Route
          exact
          path="/user/:id"
          render={props => {
            return (
              <OtherProfile
                userId={props.match.params.id}
                user={this.state.authorization.user}
                onAddGame={this.handleAddToCollection.bind(this)}
                onRemoveGame={this.handleRemoveFromCollection.bind(this)}
                onAddFriend={this.addFriend.bind(this)}
                attributePost={this.attributePost.bind(this)}
                searchTerm={this.state.searchTerm}
                loggedIn={this.state.authorization.isLoggedIn}
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

        <Route path="/loading" render={() => <Loading />} />
        <Route
          path="/mygames"
          render={() => (
            <GamesList
              games={this.getUserGames()}
              user={this.state.authorization.user}
              onAddGame={this.handleAddToCollection.bind(this)}
              onRemoveGame={this.handleRemoveFromCollection.bind(this)}
              attributePost={this.attributePost.bind(this)}
            />
          )}
        />
        <Route
          path="/myprofile"
          render={() => (
            <UserProfile
              onUpdateUser={this.onUpdateUser}
              user={this.state.authorization.user}
              games={this.getUserGames()}
              onAddGame={this.handleAddToCollection.bind(this)}
              onRemoveGame={this.handleRemoveFromCollection.bind(this)}
              attributePost={this.attributePost.bind(this)}
              searchTerm={this.state.search}
              loggedIn={this.state.authorization.isLoggedIn}
            />
          )}
        />
        <Route
          path="/users"
          render={() => <UsersList user={this.state.authorization.user} />}
        />
      </div>
    );
  }
}

export default withRouter(App);
