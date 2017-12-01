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
        <h1 className="ui center aligned header">
          {this.props.game.game.name}
        </h1>
        <div className="ui segment">
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
