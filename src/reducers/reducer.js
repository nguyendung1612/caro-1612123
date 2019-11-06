import { combineReducers } from 'redux';
import history from './history';
import status from './isState';
import user from './user';
import player from './player';

const reducer = combineReducers({
  history,
  status,
  user,
  player
});

export default reducer;
