import React, { Component } from "react";
import GamesCard from "./GamesCard";

const GamesList = props => {
  const gamesListCards = props.games.map(game => {
    return <GamesCard game={game} key={game.game.id} />;
  });
  return <div className="ui cards">{gamesListCards}</div>;
};

export default GamesList;
