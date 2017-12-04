import React from "react";

class CreateUser extends React.Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      profile_image_url: "",
      redirect: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleToggle = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onCreateUser(this.state);
  };

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Profile Image Url</label>
            <input
              type="text"
              name="profile_image_url"
              value={this.state.profile_image_url}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateUser;
