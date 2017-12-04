import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

class GamesCard extends Component {
  constructor() {
    super();

    this.state = {
      clicked: false
    };
  }

  handleClick = e => {
    const newState = !this.state.clicked;
    this.setState({
      clicked: newState
    });
  };

  handleAddToCollection = e => {
    this.props.onAddGame(this.props.game);
  };

  handleLike = e => {
    console.log(this.props.game.likes);
    // post to game for likes and user likes if user exists
  };

  handleWish = e => {
    console.log(this.props.game);
    // if user exists post to add game to collection as wish
  };

  redirectToShow = () => {
    this.props.history.push(`/boardgame/${this.props.game.game.slug}`);
  };

  render() {
    return (
      <div id="card">
        <div className="ui card">
          {this.state.clicked ? (
            <div className="content fluid">
              <div className="header">
                <a onClick={this.redirectToShow}>{this.props.game.game.name}</a>
              </div>
              <i
                className="right floated like icon"
                onClick={this.handleLike.bind(this)}
              />
              <i
                className="right floated star icon"
                onClick={this.handleWish.bind(this)}
              />
              <div className="left floated meta">
                <a onClick={this.redirectToShow} className="meta">
                  Click for more info...
                </a>
              </div>

              <div
                className="extra content"
                onClick={this.handleClick.bind(this)}
              >
                <div className=" centered description">
                  {" "}
                  <br />
                  <br />
                  <p>{this.props.game.game.description.slice(0, 400)}...</p>
                  <p />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="centered content fluid image"
              onClick={this.handleClick.bind(this)}
            >
              <img src={this.props.game.game.image_url} />
            </div>
          )}
          <div className="extra content">
            <div
              onClick={this.handleAddToCollection}
              className="ui bottom attached button"
            >
              <i className="add icon" />
              Add to collection
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(GamesCard);
