import { combineReducers } from 'redux';
import tournamentReducer from './tournamentReducer';
import authReducer from './authReducer';

export default combineReducers({
  tournaments: tournamentReducer,
  auth: authReducer
});