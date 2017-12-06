import React from "react";
import { Redirect } from "react-router-dom";

const withAuth = WrappedComponent => {
  return class extends React.Component {
    render() {
      return this.props.loggedIn ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect to="/login" />
      );
    }
  };
};

export default withAuth;
