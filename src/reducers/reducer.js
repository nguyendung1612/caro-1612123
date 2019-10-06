import { combineReducers } from 'react-redux';
import history from './history';
import isStateReducer from './isState';

const reducer = combineReducers({
  history,
  stepNumber: isStateReducer,
  idX: isStateReducer,
  idY: isStateReducer,
  isNext: isStateReducer,
  isReverse: isStateReducer
});

export default reducer;
