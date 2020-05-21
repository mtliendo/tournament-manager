export const pairRoundRobin = (players) => {
  var numPlayers = players.length;
  const playerHelper = [];
  var byeNeeded = false;

  if (numPlayers % 2 === 1) {
    numPlayers = numPlayers + 1;  
    byeNeeded = true;
  }

  for (let i = 0; i < players.length; i++) {
    playerHelper.push({uscfId: players[i].uscfId, currentPosition: i, initialPosition: i});
  }

  if (byeNeeded) {
    playerHelper.push({uscfId: 0, currentPosition: numPlayers - 1})
  }

  return(createPairings(playerHelper));
}

const createPairings = (playerArr) => {
  var pairings = [];
  const numRounds = playerArr.length - 1;

  for (var i = 0; i < numRounds; i++) {
    pairings.push(pairCurrent(playerArr));
    playerArr = nextPosition(playerArr);
  }

  return pairings;
}

const pairCurrent = (playerList) => {
  const numGames = playerList.length / 2;
  var pairings = []; 

  for (var i = 0; i < numGames; i++) {
    var j = (playerList.length - 1) - i
    var playerA = playerList.filter((player) => {return player.currentPosition === i});
    var playerB = playerList.filter((player) => {return player.currentPosition === j});

    if (((playerA[0].initialPosition + playerB[0].initialPosition) % 2) === 0) {
      if (playerA[0].initialPosition > playerB[0].initialPosition) {
        pairings.push({white: playerA[0].uscfId, black: playerB[0].uscfId, played: false, score: -1});
      }      
      else {
        pairings.push({white: playerB[0].uscfId, black: playerA[0].uscfId, played: false, score: -1});
      }      
    }    
    else {
      if (playerA[0].initialPosition > playerB[0].initialPosition) {
        pairings.push({white: playerB[0].uscfId, black: playerA[0].uscfId, played: false, score: -1});
      }
      else {
        pairings.push({white: playerA[0].uscfId, black: playerB[0].uscfId, played: false, score: -1});
      } 
    }
  }

  return pairings;
}

const nextPosition = (playerList) => {
  const constantPosition = playerList.length - 1;
  var increment = playerList.length / 2;
  var decrement = increment - 1;

  for (var i = 0; i < playerList.length; i++) {
    if (playerList[i].currentPosition === constantPosition) {
    }
    else if (playerList[i].currentPosition + increment >= constantPosition) {
      playerList[i].currentPosition = playerList[i].currentPosition - decrement;
    }
    else {
      playerList[i].currentPosition = playerList[i].currentPosition + increment;
    }
  }

  return playerList;
}