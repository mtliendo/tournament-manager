import tournaments from '../apis/tournaments';
import history from '../history';

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_TOURNAMENT,
  MANAGE_TOURNAMENT,
  FETCH_TOURNAMENT,
  FETCH_TOURNAMENTS,
  DELETE_TOURNAMENT,
  ADD_PLAYER,
  EDIT_PLAYER,
  DELETE_PLAYER,
  PAIR_TOURNAMENT,
  ENTER_RESULTS
} from './types';

export const signIn = (id) => {
   return {
    type: SIGN_IN,
    payload: id
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createTournament = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await tournaments.post('/tournaments', {...formValues, userId})
  
  dispatch({ type: CREATE_TOURNAMENT, payload: response.data });
  history.push('/');
};

export const manageTournament = (id, formValues) => async (dispatch, getState) => {
  const response = await tournaments.patch(`/tournaments/${id}`, {...formValues})

  dispatch({type: MANAGE_TOURNAMENT, payload: response.data});
  history.push(`/tournaments/show/${id}`);
}

export const fetchTournament = id => async dispatch => {
  const response = await tournaments.get(`/tournaments/${id}`);
  
  dispatch({type: FETCH_TOURNAMENT, payload: response.data});
}

export const fetchTournaments = () => async dispatch => {
  const response = await tournaments.get('/tournaments');

  dispatch({type: FETCH_TOURNAMENTS, payload: response.data});
}

export const deleteTournament = id => async dispatch => {
  const response = await tournaments.delete(`/tournaments/${id}`);

  dispatch({type: DELETE_TOURNAMENT, payload: id});
  history.push('/');
}

export const addPlayer = (id, currentPlayers, numRounds) => async dispatch => {
  const response = await tournaments.patch(`/tournaments/${id}`, {players: currentPlayers, numRounds});

  dispatch({type: ADD_PLAYER, payload: response.data});
  history.push(`/players/manage/${id}`);
}

export const editPlayer = (id, currentPlayers) => async dispatch => {
  const response = await tournaments.patch(`/tournaments/${id}`, {players: currentPlayers});

  dispatch({type: EDIT_PLAYER, payload: response.data});
  history.push(`/players/manage/${id}`);
}

export const deletePlayer = (id, playerId, currentPlayers, numRounds, pairingMethod) => async dispatch => {
  currentPlayers.splice(playerId, 1);
  if (pairingMethod === 'roundRobin') {
    if (currentPlayers.length === 0) {
      numRounds = 0;
    }
    else if (currentPlayers.length % 2 === 0) {
      numRounds = currentPlayers.length - 1;
    }
    else {
      numRounds = currentPlayers.length;
    }
  }

  const response = await tournaments.patch(`/tournaments/${id}`, {players: currentPlayers, numRounds});

  dispatch({type: DELETE_PLAYER, payload: id});
  history.push(`/players/manage/${id}`);
}

export const pairTournament = (id, games) => async dispatch => {
  const response = await tournaments.patch(`/tournaments/${id}`, {games: games});

  dispatch({type: PAIR_TOURNAMENT, payload: response.data});
  history.push(`/tournaments/wallchart/${id}`);
}

export const enterResults = (id, games, players) => async dispatch => {
  const response = await tournaments.patch(`/tournaments/${id}`, {games: games, players: players});

  dispatch({type: ENTER_RESULTS, payload: response.data});
  history.push(`/tournaments/wallchart/${id}`);
}