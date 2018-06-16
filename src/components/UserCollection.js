import React from 'react'
import UserGamesCard from './UserGamesCard'

const UserCollection = props => {
  const userGames = props.user.user_games

  let gamesListCards
  if (userGames.length > 1) {
    gamesListCards = userGames.map(game => {
      return (
        <UserGamesCard info={game.info} game={game.game} key={game.game.id} />
      )
    })
  } else {
    gamesListCards = 'Loading'
  }

  return <div className='ui container'><div className='ui cards'>{gamesListCards}</div></div>
}

export default UserCollection
