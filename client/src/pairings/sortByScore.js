export const sortByScore = (players) => players.sort(compareByScore);

const compareByScore = (playerA, playerB) => {
  if (playerA.score > playerB.score) {
    return -1;
  }
  if (playerB.score > playerA.score) {
    return 1;
  }

  if (playerA.uscfRating > playerB.uscfRating) {
    return -1;
  }

  return 1;
};
