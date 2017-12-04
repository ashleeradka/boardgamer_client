import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

class UserGamesCard extends Component {
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

  handleRemove = () => {
    // console.log(this.props.game.id);
    // console.log(this.props.info.user_id);
    // fetch(postUrl, {
    //   method: "POST",
    //   headers: new Headers({
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   }),
    //   body: JSON.stringify({ game_id: this.props.game.id, user_id: this.props.info.user_id })
    // }).then(resp => console.log(resp));
  };

  render() {
    console.log(this.props);
    return (
      <div id="card">
        <div className="ui card">
          {this.state.clicked ? (
            <div className="content fluid">
              <div className="header">
                <a onClick={this.redirectToShow}>{this.props.game.name}</a>
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
                  <p>{this.props.game.description.slice(0, 400)}...</p>
                  <p />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="centered content fluid image"
              onClick={this.handleClick.bind(this)}
            >
              <img src={this.props.game.image_url} />
            </div>
          )}
          <div className="extra content">
            <div className="ui red button" onClick={this.handleRemove}>
              <i className="minus icon" />
              Remove
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserGamesCard);
