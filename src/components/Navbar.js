import React, { Component } from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <div className="ui secondary  menu">
      <Link to="/" className="item">
        Home
      </Link>
      <Link to="/" className="item">
        Games
      </Link>
      <Link to="/friends" className="item">
        Friends
      </Link>
      <Link to="/createGame" className="item">
        Add new game
      </Link>
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
        <Link to="/login" className="item">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
