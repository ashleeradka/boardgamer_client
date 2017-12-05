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
    fetch(`${url}/users/${this.props.user}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ user: json });
        console.log(this.state);
      });
  }

  getGameIds() {
    return this.state.user.boardgames.map(gameInfo => gameInfo.game.id);
  }

  sharedGames() {
    let profileGameIds = this.getGameIds();
    let sharedGames = this.state.user.boardgames.filter(game => {
      profileGameIds.includes(game.info.id);
    });

    debugger;
    return sharedGames;
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
          <h4 className="ui center aligned header">Owned Games</h4>
          <GamesList games={this.sharedGames} user={this.props.user} />
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
