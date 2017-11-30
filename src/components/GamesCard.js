import React, { Component } from "react";

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

  render() {
    return (
      <div className="ui card">
        <div className="content">
          <div className="right floated meta">Own</div>
          {this.props.game.name}
        </div>
        <div className="image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTCFgQQLWFEHh4FYeU-ZfpVOxZ_i1_KXhqg-e1TeOvLIxIpoJ9" />
        </div>
        <div className="content">
          <span className="right floated">
            <i className="heart outline like icon" />
            17 likes
          </span>
        </div>
        <div className="extra content">
          {this.state.clicked ? (
            <div onClick={this.handleClick.bind(this)} className="description">
              AWESOME GAME DESCRIPTION
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

export default GamesCard;
