import React from "react";

const url = "http://localhost:3001/api/v1";

class OtherProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    fetch(`${url}/users/${this.props.user}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ user: json });
        console.log(json);
      });
  }

  render() {
    if (this.state.user.user === undefined) {
      return <div>Loading</div>;
    }
    return <div> {this.state.user.user.username} </div>;
  }
}

export default OtherProfile;
