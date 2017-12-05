import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

class FriendButton extends React.Component {
  constructor() {
    super();
  }

  handleRedirect() {
    this.props.history.push(`/user/${this.props.friend.id}`);
  }

  render() {
    return (
      <div onClick={this.handleRedirect.bind(this)}>
        <div className="item">
          <img
            className="ui avatar image"
            src={this.props.friend.profile_image_url}
          />
          <div className="content">
            <div className="header">{this.props.friend.username}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FriendButton);
