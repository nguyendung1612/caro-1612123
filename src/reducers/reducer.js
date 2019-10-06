import { combineReducers } from 'redux';
import history from './history';
import status from './isState';

const reducer = combineReducers({
  history,
  status
});

export default reducer;
