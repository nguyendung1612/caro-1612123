import Types from '../constants/ActionTypes';

const STATE_LOGIN = {
  isLogin: false
};

const userReducer = (state = STATE_LOGIN, action) => {
  switch (action.type) {
    case Types.SIGN_IN:
      return { ...state, isLogin: action.payload };
    case Types.SIGN_OUT:
      return { ...state, isLogin: false };
    case Types.SIGN_UP:
      return { ...state, isLogin: action.payload };
    case Types.GET_USER:
      return { ...state, isLogin: true };
    default:
      return { ...state };
  }
};

export default userReducer;
