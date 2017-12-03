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
          <br />
        </div>
        <div className="ui ">
          <img
            className="ui centered medium image"
            src={this.props.game.game.image_url}
          />
        </div>
      </div>
    );
  }
}

export default GameShowPage;
