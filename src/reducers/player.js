import Types from '../constants/ActionTypes';

const STATE_PLAYER = {
  isComputer: false,
  isOnline: false,
  isFinding: false
};

const player = (state = STATE_PLAYER, action) => {
  switch (action.type) {
    case Types.PLAY_COMPUTER:
      return { ...state, isComputer: true, isOnline: false };
    case Types.PLAY_ONLINE:
      return { ...state, isComputer: false, isOnline: true };
    case Types.EXIT:
      return { ...state, isComputer: false, isOnline: false };
    case Types.FINDING:
      return { ...state, isFinding: true, isOnline: true };
    default:
      return { ...state };
  }
};

export default player;
