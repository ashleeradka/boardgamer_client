import React from "react";
import GamesList from "./GamesList.js";
import FriendButton from "./FriendButton.js";
import GamesCard from "./GamesCard.js";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      owned: [],
      wishlist: []
    };
  }

  getGames(category) {
    return this.props.user.user_games.filter(
      game => game.info[category] === true
    );
  }

  render() {
    console.log(this.props);
    if (!this.props.user.user_info) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <div>
          <h1 className="ui center aligned header">
            {this.props.user.user_info.first_name}{" "}
            {this.props.user.user_info.last_name}
          </h1>
        </div>{" "}
        <br />
        <img
          className="ui centered medium image"
          src={this.props.user.user_info.profile_image_url}
        />{" "}
        <br />
        <div className="ui horizontal segments">
          <div className="ui segment">
            <h4 className="ui center aligned header">Friends</h4>
            <div className="ui middle aligned selection list">
              {this.props.user.friends.map(friend => (
                <FriendButton friend={friend} />
              ))}
            </div>
          </div>
          <div className="ui compact segment">
            <h4 className="ui center aligned header">Owned</h4>
            {this.getGames("owned").map(game => (
              <GamesCard
                user={this.props.user}
                onAddGame={this.props.onAddGame}
                onRemoveGame={this.props.onRemoveGame}
                game={game}
              />
            ))}
          </div>
          <div className="ui compact segment">
            <h4 className="ui center aligned header">Wishlist</h4>
            {this.getGames("wishlist").map(game => (
              <GamesCard
                user={this.props.user}
                onAddGame={this.props.onAddGame}
                onRemoveGame={this.props.onRemoveGame}
                game={game}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
