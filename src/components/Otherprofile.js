import React from "react";
import GamesList from "./GamesList.js";

const url = "https://api-boardgamer.herokuapp.com/api/v1";

class OtherProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isFriend: false
    };
  }

  componentDidMount() {
    fetch(`${url}/users/${this.props.userId}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ user: json });
      })
      .then(() => this.isAFriend());
  }

  componentWillRecieveProps() {
    this.isAFriend();
  }

  isAFriend() {
    if (this.userFriendIds().includes(this.state.user.user.id)) {
      this.setState({ isFriend: true });
    }
  }

  userFriendIds() {
    if (this.props.user.friends != undefined) {
      return this.props.user.friends.map(friend => friend.id);
    }
    return [];
  }

  sharedGames() {
    let profileGameIds = this.state.user.boardgames.map(
      gameInfo => gameInfo.game.id
    );
    if (this.props.user.user_games !== undefined) {
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

  handleAddFriend() {
    this.setState({ isFriend: !this.state.isFriend });
    this.props.onAddFriend(this.state.user, this.state.isFriend);
  }

  render() {
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
        <div>
          {this.state.isFriend ? (
            <div>
              <button
                className="ui active button"
                onClick={this.handleAddFriend.bind(this)}
              >
                <i className="user icon" />
                Remove Friend
              </button>
            </div>
          ) : (
            <div>
              {" "}
              <button
                className="ui active button"
                onClick={this.handleAddFriend.bind(this)}
              >
                <i className="user icon" />
                Add friend
              </button>
            </div>
          )}
        </div>
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
