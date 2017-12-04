import React from "react";

class UserProfile extends React.Component {
  constructor() {
    super();
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
        <div id="gameInfo" className="ui segments">
          <div className="ui secondary segment">
            <h4 className="ui header">Description</h4>
            <div className="ui segment">A word</div>
            <span className="right floated">
              <i className="heart outline like icon" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
