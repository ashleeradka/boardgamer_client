import React from "react";
import FriendButton from "./FriendButton.js";

class UsersList extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:3001/api/v1/users")
      .then(resp => resp.json())
      .then(json => {
        json.sort(function(a, b) {
          if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
          if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
          return 0;
        });
        this.setState({ users: json });
      });
  }
  render() {
    return (
      <div className="ui segment">
        <h4 className="ui center aligned header">Users</h4>
        <div className="ui middle aligned selection list">
          {this.state.users.map(friend => (
            <FriendButton
              friend={friend}
              user={this.props.user}
              key={friend.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default UsersList;
