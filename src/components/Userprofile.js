import React from "react";
import GamesList from "./GamesList.js";

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
        <div className="horizontal segments">
          <div className="ui segment">
            <h4 className="ui center aligned header">Friends</h4>
            <div className="ui cards">
              {this.props.user.friends.map(friend => (
                <div className="card">
                  <div class="content">{friend.username}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="ui segment">
            <h4 className="ui center aligned header">Owned</h4>

            <GamesList games={this.getGames("owned")} user={this.props.user} />

            <h4 className="ui center aligned header">Wishlist</h4>
            <GamesList
              games={this.getGames("wishlist")}
              user={this.props.user}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
