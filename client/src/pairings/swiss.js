import { sortByScore } from './sortByScore';

export const pairSwiss = (tournament) => {
  let {
    players, numRounds, games, currentRound,
  } = tournament;
  players = sortByScore(players);
  if (currentRound === 1) {
    return pairRoundOne(players);
  }

  players = addGamesToPlayers(players, games);
  const groups = groupByScore(players);

  return pairGroups(groups);
};

export const addGamesToPlayers = (players, games) => {
  for (let i = 0; i < players.length; i++) {
    const opponents = [];
    let dueColor = '';
    let colorCount = 0;
    for (let j = 0; j < games.length; j++) {
      for (let k = 0; k < games[j].length; k++) {
        if (games[j][k].white === players[i].uscfId && games[j][k].black !== 0) {
          colorCount += 1;
          dueColor = 'B';
          opponents.push(games[j][k].black);
        } else if (games[j][k].black === players[i].uscfId) {
          colorCount -= 1;
          dueColor = 'W';
          opponents.push(games[j][k].white);
        }
      }
    }
    players[i] = {
      ...players[i], colorCount, dueColor, opponents,
    };
  }
  return players;
};

export const groupByScore = (players) => {
  const groups = [];
  let currentGroup = [];
  let groupScore = players[0].score;
  for (let i = 0; i < players.length; i++) {
    if (players[i].score === groupScore) {
      currentGroup.push(players[i]);
    } else {
      groupScore = players[i].score;
      groups.push(currentGroup);
      currentGroup = [players[i]];
    }
  }
  groups.push(currentGroup);

  return groups;
};

const pairGroups = (groups) => {
  const games = [];
  for (let i = 0; i < groups.length; i++) {
    const result = pairGroup(i, groups);
    const newGames = result.games;
    groups = result.groups;
    for (let j = 0; j < newGames.length; j++) {
      games.push(newGames[j]);
    }
  }
  console.log(groups);
  return games;
};

const pairGroup = (groupNum, groups) => {
  const groupSize = groups[groupNum].length;
  const currentGroup = groups[groupNum];
  let oddPlayer;
  let nextGroup = [];

  // eliminate odd player and set it to a seperate variable, very crude
  // create a separate function for this
  // currently just taking lowest player regardless of colors
  if (groupSize % 2 === 1) {
    oddPlayer = currentGroup[groupSize - 1];
    currentGroup.splice((groupSize - 1), 1);
  }

  // pair the current groups games, gives higher player their due color
  // and then just takes the bottom half as is
  const numGames = currentGroup.length / 2;
  const topHalf = [];
  const bottomHalf = [];
  for (let i = 0; i < numGames; i++) {
    topHalf.push(currentGroup[i]);
    bottomHalf.push(currentGroup[i + numGames]);
  }

  const games = [];
  let game = {};

  for (let i = 0; i < numGames; i++) {
    if (topHalf[i].dueColor === 'W') {
      game = {
        white: topHalf[i].uscfId,
        black: bottomHalf[i].uscfId,
        score: -1,
        played: false,
      };
    } else {
      game = {
        white: bottomHalf[i].uscfId,
        black: topHalf[i].uscfId,
        score: -1,
        played: false,
      };
    }
    games.push(game);
  }

  // modifies groups if we had an odd player so they will be included
  // in the next group, adds a bye if there is no next group and an
  // odd player
  if (!oddPlayer) {
    console.log('no odd player');
    groups[groupNum] = currentGroup;
  } else if (groupNum < groups.length - 1) {
    console.log('extra group');
    nextGroup = groups[groupNum + 1];
    nextGroup.splice(0, 0, oddPlayer);
    groups[groupNum] = currentGroup;
  } else {
    console.log('no extra group');
    groups[groupNum] = currentGroup;
    game = {
      white: oddPlayer.uscfId,
      black: 0,
      score: -1,
      played: false,
    };
    games.push(game);
  }

  return { games, groups };
};

const pairRoundOne = (players) => {
  const numPlayers = players.length;
  let oddPlayer;
  const games = [];
  let game = {};

  if (players.length % 2 === 1) {
    oddPlayer = players[numPlayers - 1];
    players.splice(numPlayers - 1, 1);
  }
  const numGames = players.length / 2;

  let nextPlayerColor = Math.floor((Math.random() * 2)) ? 'W' : 'B';
  for (let i = 0; i < numGames; i++) {
    if (nextPlayerColor === 'W') {
      nextPlayerColor = 'B';
      game = {
        white: players[i].uscfId,
        black: players[i + numGames].uscfId,
        score: -1,
        played: false,
      };
    } else {
      nextPlayerColor = 'W';
      game = {
        white: players[i + numGames].uscfId,
        black: players[i].uscfId,
        score: -1,
        played: false,
      };
    }
    games.push(game);
  }

  if (oddPlayer) {
    game = {
      white: oddPlayer.uscfId,
      black: 0,
      score: -1,
      played: false,
    };
    games.push(game);
  }

  return games;
};
