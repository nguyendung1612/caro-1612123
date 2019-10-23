import { combineReducers } from 'redux';
import history from './history';
import status from './isState';
import user from './user';

const reducer = combineReducers({
  history,
  status,
  user
});

export default reducer;
