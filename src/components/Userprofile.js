import React from "react";
import GamesList from "./GamesList.js";
import FriendButton from "./FriendButton.js";
import GamesCard from "./GamesCard.js";
import { withRouter } from "react-router-dom";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      owned: [],
      wishlist: []
    };
  }

  getUserGameIds() {
    return this.props.games.map(game => game.game.id);
  }
  getGames(category) {
    return this.props.user.user_games.filter(
      game =>
        game.info[category] === true &&
        this.getUserGameIds().includes(game.game.id)
    );
  }

  render() {
    if (!this.props.user.user_info) {
      this.props.history.push(`/login`);
      return <div>loading...</div>;
    }
    return (
      <div>
        <div>
          <h1 className="ui center aligned header ">
            {this.props.user.user_info.first_name}
            {this.props.user.user_info.last_name}
          </h1>
        </div>
        <br />

        <img
          className="ui centered segment medium image"
          src={
            this.props.user.user_info.profile_image_url
              ? this.props.user.user_info.profile_image_url
              : "https://www.menon.no/wp-content/uploads/person-placeholder.jpg"
          }
        />

        <br />
        <div className="ui segment" id="profileGreyed">
          <h4 className="ui center aligned header">Friends</h4>
          {this.props.user.friends.map(friend => (
            <FriendButton
              key={friend.id}
              friend={friend}
              user={this.props.user}
            />
          ))}
        </div>
        <div className="ui segment" id="profileGreyed">
          <div className="profileGreyed">
            <h4 className="ui center aligned header">Owned</h4>

            <GamesList
              onAddGame={this.props.onAddGame}
              onRemoveGame={this.props.onRemoveGame}
              games={this.getGames("owned")}
              user={this.props.user}
              attributePost={this.props.attributePost}
            />
          </div>
        </div>
        <div className="ui segment" id="profileGrey">
          <h4 className="ui center aligned header">Wish List</h4>
          <GamesList
            onAddGame={this.props.onAddGame}
            onRemoveGame={this.props.onRemoveGame}
            games={this.getGames("wishlist")}
            user={this.props.user}
            attributePost={this.props.attributePost}
          />
        </div>
        <div className="ui segment" id="profileGrey">
          <h4 className="ui center aligned header">Favorited</h4>
          <GamesList
            onAddGame={this.props.onAddGame}
            onRemoveGame={this.props.onRemoveGame}
            games={this.getGames("favorite")}
            user={this.props.user}
            attributePost={this.props.attributePost}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
