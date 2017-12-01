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

  redirectToShow = () => {
    this.props.history.push(`/boardgame/${this.props.game.game.slug}`);
  };

  render() {
    return (
      <div className="card">
        <div className="content">
          <div className="right floated meta">Own</div>
          {this.props.game.game.name}
        </div>
        <div className="blurring dimmable image">
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <div className="ui inverted button">Add friend</div>
              </div>
            </div>
          </div>
          <img
            src={this.props.game.game.image_url}
            onClick={this.redirectToShow}
          />
        </div>
        <div className="content">
          <span className="right floated">
            <i className="heart outline like icon" />
            {this.props.game.likes}
          </span>
        </div>
        <div className="extra content">
          {this.state.clicked ? (
            <div onClick={this.handleClick.bind(this)} className="description">
              {this.props.game.game.description}
            </div>
          ) : (
            <div onClick={this.handleClick.bind(this)} className="description">
              Click for more info...
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(GamesCard);
