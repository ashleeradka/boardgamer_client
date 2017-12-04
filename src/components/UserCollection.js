import React, { Component } from "react";
import UserGamesCard from "./UserGamesCard";

const UserCollection = props => {
  const userGames = props.user.user_games;
  const userInfo = props.user.user_info;
  let gamesListCards;
  if (userGames.length > 1) {
    gamesListCards = userGames.map(game => {
      return (
        <UserGamesCard info={game.info} game={game.game} key={game.game.id} />
      );
    });
  } else {
    gamesListCards = "Loading";
  }

  return <div className="ui cards">{gamesListCards}</div>;
};

export default UserCollection;
