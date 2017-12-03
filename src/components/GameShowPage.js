import React from "react";

class GameShowPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    if (!this.props.game) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <div>
          <h1 className="ui center aligned header">
            {this.props.game.game.name}
            <span className="sub header center aligned">
              {this.props.game.likes} Likes
            </span>
          </h1>
        </div>{" "}
        <br />
        <img
          className="ui centered medium image"
          src={this.props.game.game.image_url}
        />{" "}
        <br />
        <div id="gameInfo" className="ui segments">
          <div className="ui secondary segment">
            <h4 className="ui header">Description</h4>
            <div className="ui segment">
              <p>{this.props.game.game.description}</p>
            </div>
            <span className="right floated">
              <i className="heart outline like icon" />
              {this.props.game.likes} likes
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default GameShowPage;
