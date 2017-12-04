import React, { Component } from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  const userInfo = props.userInfo;
  return (
    <div className="ui secondary  menu">
      <Link to="/" className="item">
        Home
      </Link>
      <Link to="/" className="item">
        Games
      </Link>
      {userInfo.isLoggedIn ? (
        <Link to="/mygames" className="item">
          My Games
        </Link>
      ) : null}

      {userInfo.isLoggedIn ? (
        <Link to="/friends" className="item">
          Friends
        </Link>
      ) : null}

      {userInfo.isLoggedIn ? (
        <Link to="/createGame" className="item">
          Add new game
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
              Logout
            </div>
          </a>
        ) : (
          <Link to="/login" className="item">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
