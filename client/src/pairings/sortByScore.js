export const sortByScore = (players) => {
  return players.sort(compareByScore);
}

const compareByScore = (playerA, playerB) => {
  if (playerA.score > playerB.score) {
    return -1;
  }
  else if (playerB.score > playerA.score) {
    return 1;
  }
  else {
    if (playerA.uscfRating > playerB.uscfRating) {
      return -1;
    }
    else {
      return 1;
    }
  }
}
