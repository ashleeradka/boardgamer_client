import React, { Component } from "react";
import GamesCard from "./GamesCard";

const GamesList = props => {
  console.log(props);
  const gamesListCards = props.games.map(game => {
    return <GamesCard game={game} user={props.user} key={game.game.id} />;
  });
  return <div className="ui cards">{gamesListCards}</div>;
};

export default GamesList;
