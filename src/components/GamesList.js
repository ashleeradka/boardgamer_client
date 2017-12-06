import React, { Component } from "react";
import GamesCard from "./GamesCard";

const GamesList = props => {
  const gamesListCards = props.games
    .sort(function(a, b) {
      if (a.game.name.toLowerCase() < b.game.name.toLowerCase()) return -1;
      if (a.game.name.toLowerCase() > b.game.name.toLowerCase()) return 1;
      return 0;
    })
    .map(game => {
      return (
        <GamesCard
          game={game}
          user={props.user}
          onAddGame={props.onAddGame}
          onRemoveGame={props.onRemoveGame}
          key={game.game.id}
          attributePost={props.attributePost}
        />
      );
    });
  return <div className="ui cards">{gamesListCards}</div>;
};

export default GamesList;
