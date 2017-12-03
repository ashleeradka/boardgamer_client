import React, { Component } from "react";
// import { authorizer } from "./Apilogin.js";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: "",
        password: ""
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onLogin(this.state);
  };

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.fields.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.fields.password}
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

export default Login;
