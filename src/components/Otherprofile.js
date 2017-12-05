import React from "react";
import GamesList from "./GamesList.js";

const url = "http://localhost:3001/api/v1";

class OtherProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    fetch(`${url}/users/${this.props.userId}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ user: json });
        console.log(this.state);
      });
  }

  sharedGames() {
    let profileGameIds = this.state.user.boardgames.map(
      gameInfo => gameInfo.game.id
    );
    if (this.props.user.user_games != undefined) {
      return this.props.user.user_games.filter(game => {
        return profileGameIds.includes(game.game.id);
      });
    }
    return [];
  }

  nonSharedGames() {
    if (this.props.user.user_games != undefined) {
      let profileGameIds = this.props.user.user_games.map(
        gameInfo => gameInfo.game.id
      );
      return this.state.user.boardgames.filter(game => {
        return !profileGameIds.includes(game.game.id);
      });
    }
    return [];
  }

  render() {
    console.log(this.props);
    console.log(this.state.user);
    if (this.state.user.user === undefined) {
      return <div>Loading</div>;
    }
    return (
      <div>
        {" "}
        <div>
          <h1 className="ui center aligned header">
            {this.state.user.user.username}{" "}
          </h1>
        </div>{" "}
        <br />
        <img
          className="ui centered medium image"
          src={this.state.user.user.profile_image_url}
        />{" "}
        <br />
        <div className="ui segment">
          <h4 className="ui center aligned header">Shared Games</h4>
          <GamesList
            onAddGame={this.props.onAddGame}
            onRemoveGame={this.props.onRemoveGame}
            games={this.sharedGames()}
            user={this.props.user}
          />
        </div>
        <div className="ui segment">
          <h4 className="ui center aligned header">Unique Games</h4>
          <GamesList
            onAddGame={this.props.onAddGame}
            onRemoveGame={this.props.onRemoveGame}
            games={this.nonSharedGames()}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}

// <GamesList
//   games={this.getGames("owned")}
//   user={this.state.user.user}
//   onAddGame={this.props.onAddGame}
// />

export default OtherProfile;
