import React from "react";
import FriendButton from "./FriendButton.js";
import withAuth from "./WithAuth.js";
import {
  Segment,
  Button,
  Image,
  Label,
  Header,
  Container
} from "semantic-ui-react";

class UsersList extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    fetch("https://api-boardgamer.herokuapp.com/api/v1/users")
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
      <Container textAlign="center">
        <Segment>
          <Header>Users</Header>{" "}
        </Segment>{" "}
        <Segment>
          <Label.Group size="huge">
            {this.state.users.map(friend => (
              <FriendButton
                friend={friend}
                user={this.props.user}
                key={friend.id}
              />
            ))}
          </Label.Group>{" "}
        </Segment>
      </Container>
    );
  }
}

export default withAuth(UsersList);
