import Types from '../constants/ActionTypes';

const STATE_LOGIN = {
  isLogin: false,
  username: ''
};

const userReducer = (state = STATE_LOGIN, action) => {
  switch (action.type) {
    case Types.SIGN_IN:
      return { ...state, isLogin: true, username: action.payload };
    case Types.SIGN_OUT:
      return { ...state, isLogin: false, username: '' };
    case Types.SIGN_UP:
      return { ...state };
    case Types.GET_USER:
      return { ...state, isLogin: true, username: action.payload };
    default:
      return { ...state };
  }
};

export default userReducer;
