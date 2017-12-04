import React, { Component } from "react";
import GamesCard from "./GamesCard";

const GamesList = props => {
  const gamesListCards = props.games.map(game => {
    console.log(game.game.id, game.game.name);
    return (
      <GamesCard
        user={props.user}
        userCollection={props.userCollection}
        game={game}
        key={game.game.id}
      />
    );
  });
  return <div className="ui cards">{gamesListCards}</div>;
};

export default GamesList;
