import React, { Component } from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  const userInfo = props.userInfo;
  return (
    <div className="ui secondary teal menu" id="navbar">
      {""}
      <div className="item">
        <i className="inverted large puzzle icon" />
      </div>
      <Link to="/" className="item">
        <nav>Home</nav>
      </Link>
      {userInfo.isLoggedIn ? (
        <Link to="/myprofile" className="item">
          <nav>My Profile</nav>
        </Link>
      ) : null}
      {userInfo.isLoggedIn ? (
        <Link to="/mygames" className="item">
          <nav>My Games</nav>
        </Link>
      ) : null}

      {userInfo.isLoggedIn ? (
        <Link to="/users" className="item">
          <nav>Users</nav>
        </Link>
      ) : null}

      {userInfo.isLoggedIn ? (
        <Link to="/createGame" className="item">
          <nav>Add new game</nav>
        </Link>
      ) : null}
      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Search..."
              onChange={props.handleSearch}
            />
            <i className="search link icon" />
          </div>
        </div>
        {userInfo.isLoggedIn ? (
          <a className="item">
            <div
              onClick={() => {
                props.handleLogout();
              }}
            >
              <nav>Logout</nav>
            </div>
          </a>
        ) : (
          <Link to="/login" className="item">
            <nav>Login</nav>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
