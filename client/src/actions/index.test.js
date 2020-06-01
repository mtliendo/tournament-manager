import {
  signIn,
  signOut,
  createTournament,
  manageTournament,
  fetchTournament,
  fetchTournaments,
  deleteTournament,
  addPlayer,
  editPlayer,
  deletePlayer,
  pairTournament,
  enterResults
} from './index.js';
import { SIGN_IN, SIGN_OUT } from './types.js';
import tournaments from '../apis/tournaments';
import history from '../history';
import Chance from 'chance';
const chance = new Chance();

jest.mock('../apis/tournaments');
jest.mock('../history');


describe('action creators', () => {
  describe('when the signIn action creator is invoked', () => {
    it('should returns proper action', () => {
      // arrange
      let id = chance.integer();

      // act
      const signInAction = signIn(id);

      // assert
      expect(signInAction).toEqual({ type: SIGN_IN, payload: id });
    });
  });

  describe('signOut action', () => {
    it('returns proper action', () => {
      expect(signOut()).toEqual({ type: SIGN_OUT });
    })
  })

  describe.skip('when the createTournament actions is invoked HAND ROLLED', () => {
    it('should dispatch an action with the formValues', () => {
      // arrange
      let isDispatchCalled = false;
      let actionVal;
      const fakeDispatch = function (action) {
        actionVal = action;
      };

      // act
      const aysncFunc = createTournament();
      aysncFunc(fakeDispatch);


      // assert
      expect(actionVal).toEqual({ type: 'CREATE_TOURNAMENT' })

      // check that dispatch got the correct action to send to the store
    })
  })

  describe('when the createTournament actions is invoked', () => {
    it('should dispatch an action with the formValues', async () => {
      // arrange
      const formValues = { [chance.string()]: chance.string() };
      const givenUserId = chance.string();
      const randomData = chance.guid();
      const givenPostResponse = { data: randomData };
      const givenState = { auth: { userId: givenUserId } };

      const fakeDispatch = jest.fn();
      const fakeGetState = jest.fn(() => givenState)
      // const fakeGetState = function () {
      //   return givenState
      // };
      tournaments.post.mockResolvedValue(givenPostResponse);

      // act
      const aysncFunc = createTournament(formValues);
      await aysncFunc(fakeDispatch, fakeGetState);


      // assert
      expect(tournaments.post).toHaveBeenCalled();
      expect(tournaments.post).toHaveBeenCalledWith('/tournaments', { ...formValues, userId: givenUserId });

      expect(fakeDispatch).toHaveBeenCalled();
      expect(fakeDispatch).toHaveBeenCalledWith({ type: 'CREATE_TOURNAMENT', payload: randomData });

      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith('/');
    })
  })

  describe('when the manageTournament action creator is invoked', () => {
    it('should sent a patch to the DB and dispatch an action with the response data', async () => {
      // arrange
      const formValues = { tournamentId: chance.string() };
      const id = { id: chance.integer() };
      const randomData = chance.guid();
      const patchResponse = { data: randomData };

      const fakeDispatch = jest.fn();
      tournaments.patch.mockResolvedValue(patchResponse);

      // act
      const aysncFunc = manageTournament(id, formValues);
      await aysncFunc(fakeDispatch);

      // assert
      expect(tournaments.patch).toHaveBeenCalled();
      expect(tournaments.patch).toHaveBeenCalledWith(`/tournaments/${id}`, { ...formValues });

      expect(fakeDispatch).toHaveBeenCalled();
      expect(fakeDispatch).toHaveBeenCalledWith({ type: 'MANAGE_TOURNAMENT', payload: patchResponse.data });

      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith(`/tournaments/show/${id}`);
    })
  })

  describe('when the fetchTournament action creator is invoked', () => {
    it('should sent a get to the DB and dispatch an action with the response data', async () => {
      // arrange
      const id = { id: chance.integer() };
      const randomData = chance.guid();
      const getResponse = { data: randomData };

      const fakeDispatch = jest.fn();
      tournaments.get.mockResolvedValue(getResponse);

      // act
      const aysncFunc = fetchTournament(id);
      await aysncFunc(fakeDispatch);

      // assert
      expect(tournaments.get).toHaveBeenCalled();
      expect(tournaments.get).toHaveBeenCalledWith(`/tournaments/${id}`);

      expect(fakeDispatch).toHaveBeenCalled();
      expect(fakeDispatch).toHaveBeenCalledWith({ type: 'FETCH_TOURNAMENT', payload: randomData });
    })
  })

  describe('when the fetchTournaments action creator is invoked', () => {
    it('should sent a get to the DB and dispatch an action with the response data', async () => {
      // arrange
      const randomData = chance.guid();
      const getResponse = { data: randomData };

      const fakeDispatch = jest.fn();
      tournaments.get.mockResolvedValue(getResponse);

      // act
      const aysncFunc = fetchTournaments();
      await aysncFunc(fakeDispatch);

      // assert
      expect(tournaments.get).toHaveBeenCalled();
      expect(tournaments.get).toHaveBeenCalledWith(`/tournaments`);

      expect(fakeDispatch).toHaveBeenCalled();
      expect(fakeDispatch).toHaveBeenCalledWith({ type: 'FETCH_TOURNAMENTS', payload: randomData });
    })
  })


  describe('when the deleteTournament action creator is invoked', () => {
    it('should sent a delete to the DB and dispatch an action', async () => {
     // arrange
     const id = { id: chance.integer() };

     const fakeDispatch = jest.fn();

     // act
     const aysncFunc = deleteTournament(id);
     await aysncFunc(fakeDispatch);

     // assert
     expect(tournaments.delete).toHaveBeenCalled();
     expect(tournaments.delete).toHaveBeenCalledWith(`/tournaments/${id}`);

     expect(fakeDispatch).toHaveBeenCalled();
     expect(fakeDispatch).toHaveBeenCalledWith({ type: 'DELETE_TOURNAMENT', payload: id });

     expect(history.push).toHaveBeenCalled();
     expect(history.push).toHaveBeenCalledWith(`/`);
    })
  })

  describe('when the addPlayer action creator is invoked', () => {
    it('should sent a patch to the DB and dispatch an action', async () => {
      // arrange
      const id = { id: chance.integer() };
      const currentPlayers = { name1: chance.string() };
      const numRounds = chance.integer();
      const responseData = { data: chance.string() };

      const fakeDispatch = jest.fn();
      tournaments.patch.mockResolvedValue(responseData);


      // act
      const aysncFunc = addPlayer(id, currentPlayers, numRounds);
      await aysncFunc(fakeDispatch);

      // assert
      expect(tournaments.patch).toHaveBeenCalled();
      expect(tournaments.patch).toHaveBeenCalledWith(`/tournaments/${id}`, { players: currentPlayers, numRounds });

      expect(fakeDispatch).toHaveBeenCalled();
      expect(fakeDispatch).toHaveBeenCalledWith({ type: 'ADD_PLAYER', payload: responseData.data });

      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith(`/players/manage/${id}`);
    })
  })

  describe('when the editPlayer action creator is invoked', () => {
    it('should sent a patch to the DB and dispatch an action', async () => {
      // arrange
      const id = { id: chance.integer() };
      const currentPlayers = { name1: chance.string() };
      const responseData = { data: chance.string() };

      const fakeDispatch = jest.fn();
      tournaments.patch.mockResolvedValue(responseData);


      // act
      const aysncFunc = editPlayer(id, currentPlayers);
      await aysncFunc(fakeDispatch);

      // assert
      expect(tournaments.patch).toHaveBeenCalled();
      expect(tournaments.patch).toHaveBeenCalledWith(`/tournaments/${id}`, { players: currentPlayers });

      expect(fakeDispatch).toHaveBeenCalled();
      expect(fakeDispatch).toHaveBeenCalledWith({ type: 'EDIT_PLAYER', payload: responseData.data });

      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith(`/players/manage/${id}`);
    })
  })

  // add deletePlayer test

  describe('when the pairTournament action creator is invoked', () => {
    it('should sent a patch to the DB and dispatch an action', async () => {
      // arrange
      const id = { id: chance.integer() };
      const games = { game1: chance.string() };
      const responseData = { data: chance.string() };

      const fakeDispatch = jest.fn();
      tournaments.patch.mockResolvedValue(responseData);


      // act
      const aysncFunc = pairTournament(id, games);
      await aysncFunc(fakeDispatch);

      // assert
      expect(tournaments.patch).toHaveBeenCalled();
      expect(tournaments.patch).toHaveBeenCalledWith(`/tournaments/${id}`, { games });

      expect(fakeDispatch).toHaveBeenCalled();
      expect(fakeDispatch).toHaveBeenCalledWith({ type: 'PAIR_TOURNAMENT', payload: responseData.data });

      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith(`/tournaments/wallchart/${id}`);
    })
  })

  describe('when the enterResults action creator is invoked', () => {
    it('should sent a patch to the DB and dispatch an action', async () => {
      // arrange
      const id = { id: chance.integer() };
      const games = { game1: chance.string() };
      const players = { player1: chance.string() }
      const responseData = { data: chance.string() };

      const fakeDispatch = jest.fn();
      tournaments.patch.mockResolvedValue(responseData);


      // act
      const aysncFunc = enterResults(id, games, players);
      await aysncFunc(fakeDispatch);

      // assert
      expect(tournaments.patch).toHaveBeenCalled();
      expect(tournaments.patch).toHaveBeenCalledWith(`/tournaments/${id}`, { games, players });

      expect(fakeDispatch).toHaveBeenCalled();
      expect(fakeDispatch).toHaveBeenCalledWith({ type: 'ENTER_RESULTS', payload: responseData.data });

      expect(history.push).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith(`/tournaments/wallchart/${id}`);
    })
  })
});