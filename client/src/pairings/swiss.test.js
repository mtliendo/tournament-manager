import { pairSwiss, addGamesToPlayers, groupByScore } from './swiss';
import { 
  tournament1,
  tournament2,
  tournament3,
  tournament4
} from './testTournaments';

describe('Swiss pairing method', () => {
  describe('addGamesToPlayer method', () => {
    it.skip('runs errorless 1', () => {
      console.log(addGamesToPlayers(tournament1.players, tournament1.games))
    });

    it.skip('runs errorless 2', () => {
      console.log(addGamesToPlayers(tournament2.players, tournament2.games))
    });

    it.skip('runs errorless 3', () => {
      console.log(addGamesToPlayers(tournament3.players, tournament3.games))
    });
  })
  
  describe('group by score method', () => {
    it.skip('runs errorless 1', () => {
      console.log(groupByScore(addGamesToPlayers(tournament1.players, tournament1.games)))
    });

    it.skip('runs errorless 2', () => {
      //console.log(groupByScore(addGamesToPlayers(tournament2.players, tournament2.games)))
    });

    it.skip('runs errorless 3', () => {
      console.log(groupByScore(addGamesToPlayers(tournament3.players, tournament3.games)))
    });
  });

  describe('swissPair method', () => {
    it('runs errorless 1', () => {
      console.log(pairSwiss(tournament4))
    });
  });
});