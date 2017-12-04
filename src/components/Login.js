import React, { Component } from "react";
// import { authorizer } from "./Apilogin.js";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

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

  redirectToCreateUser = () => {
    this.props.history.push(`/user/new`);
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
          <a onClick={this.redirectToCreateUser.bind(this)}>
            New user? Create an account.
          </a>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
