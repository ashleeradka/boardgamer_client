import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

class FriendButton extends React.Component {
  constructor() {
    super();
  }

  handleRedirect() {
    if (this.props.user.user_info.id === this.props.friend.id) {
      this.props.history.push(`/myprofile`);
    } else {
      this.props.history.push(`/user/${this.props.friend.id}`);
    }
  }

  render() {
    return (
      <button className="ui button" onClick={this.handleRedirect.bind(this)}>
        <div className="item">
          <img
            className="ui avatar image"
            src={this.props.friend.profile_image_url}
          />
          {this.props.friend.username}
        </div>
      </button>
    );
  }
}

export default withRouter(FriendButton);
