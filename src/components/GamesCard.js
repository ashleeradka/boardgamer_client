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
      <fragment>
        <div className="ui card">
          {this.state.clicked ? (
            <div className="content fluid">
              <div className="header">{this.props.game.game.name}</div>
              <i className="right floated like icon" />
              <i className="right floated star icon" />
              <div className="left floated meta">
                <span onClick={this.redirectToShow} className="meta">
                  Click for more info...
                </span>
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
            <div className="ui bottom attached button">
              <i className="add icon" />
              Add to collection
            </div>
          </div>
        </div>
      </fragment>
    );
  }
}

export default withRouter(GamesCard);
