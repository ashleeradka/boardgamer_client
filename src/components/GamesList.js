import React, { Component } from "react";
import GamesCard from "./GamesCard";

const GamesList = props => {
  const gamesListCards = props.games.map(game => {
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
