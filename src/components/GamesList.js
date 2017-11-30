import React, { Component } from "react";
import GamesCard from "./GamesCard";

const GamesList = props => {
  const gamesListCards = props.games.map(game => {
    return <GamesCard game={game} />;
  });
  return <div className="cards">{gamesListCards}</div>;
};

export default GamesList;
