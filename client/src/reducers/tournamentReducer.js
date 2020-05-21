import _ from 'lodash';
import {
  CREATE_TOURNAMENT,
  MANAGE_TOURNAMENT,
  FETCH_TOURNAMENT,
  FETCH_TOURNAMENTS,
  DELETE_TOURNAMENT,
  ADD_PLAYER,
  EDIT_PLAYER,
  DELETE_PLAYER,
  PAIR_TOURNAMENT,
  ENTER_RESULTS,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_TOURNAMENT:
      return { ...state, [action.payload.id]: action.payload };
    case MANAGE_TOURNAMENT:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_TOURNAMENT:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_TOURNAMENTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case DELETE_TOURNAMENT:
      return _.omit(state, action.payload);
    case ADD_PLAYER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_PLAYER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PLAYER:
      return { ...state, [action.payload.id]: action.payload };
    case PAIR_TOURNAMENT:
      return { ...state, [action.payload.id]: action.payload };
    case ENTER_RESULTS:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
