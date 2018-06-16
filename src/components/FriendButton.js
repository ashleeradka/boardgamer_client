import React from "react";
import { withRouter } from "react-router-dom";
import { Popup, Button, Image, Card, Label } from "semantic-ui-react";

class FriendButton extends React.Component {
  handleRedirect() {
    if (this.props.user.user_info.id === this.props.friend.id) {
      this.props.history.push(`/myprofile`);
    } else {
      this.props.history.push(`/user/${this.props.friend.id}`);
    }
  }

  render() {
    return (
      <Label as="a" image onClick={this.handleRedirect.bind(this)}>
        <img
          src={
            this.props.friend.profile_image_url
              ? this.props.friend.profile_image_url
              : "https://www.menon.no/wp-content/uploads/person-placeholder.jpg"
          }
          key={this.props.friend.id}
        />
        {this.props.friend.username}
      </Label>
    );
  }
}

export default withRouter(FriendButton);
