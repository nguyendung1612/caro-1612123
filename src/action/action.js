import { isNull } from 'util';
import Types from '../constants/ActionTypes';
import apiCaller from '../utils/apiCaller';

const nSquareToWin = 5;

function calculateWinner(squares, m, n) {
  if (m === -1 && n === -1) return null;
  let win;
  let tmpRowTop = m;
  let tmpRowBot = m;
  let tmpColTop = n;
  let tmpColBot = n;
  // xet cac vi tri xung quanh diem danh
  let temp = 1;
  while (tmpRowTop > 0 && temp !== 5) {
    tmpRowTop -= 1;
    temp += 1;
  }

  temp = 1;
  while (tmpColTop > 0 && temp !== 5) {
    tmpColTop -= 1;
    temp += 1;
  }

  temp = 1;
  while (tmpRowBot < 19 && temp !== 5) {
    tmpRowBot += 1;
    temp += 1;
  }

  temp = 1;
  while (tmpColBot < 19 && temp !== 5) {
    tmpColBot += 1;
    temp += 1;
  }

  for (let i = tmpRowTop; i <= tmpRowBot; i += 1) {
    for (let j = tmpColTop; j <= tmpColBot; j += 1) {
      // Kiểm trang NSquareToWin ô liên tiếp từ ô xuất phát sang phải, xuống góc phải dưới, xuống góc trái dưới
      // Nếu có NSquareToWin - 1 cặp liên tiếp giống nhau thì thắng
      // Direction: ToRight, ToRightDown, ToDown, ToLeftDown
      // eslint-disable-next-line no-continue
      if (!squares[i][j]) continue;

      // TH1: chan 2 dau ngang
      win = true;
      // TH vuot qua ban co va bi chan 2 dau
      if (
        j - 1 >= 0 &&
        j + nSquareToWin < 20 &&
        squares[i][j - 1] &&
        squares[i][j + 5] &&
        squares[i][j] !== squares[i][j - 1] &&
        squares[i][j] !== squares[i][j + 5]
      )
        win = false;
      for (let k = 0; k < nSquareToWin - 1 && win; k += 1) {
        if (j + k === 19 || squares[i][j + k] !== squares[i][j + k + 1]) {
          win = false;
          break;
        }
      }
      if (win) return { val: squares[i][j], x: j, y: i, direction: 'Ngang' };

      // TH1: chan 2 dau doc
      win = true;
      if (
        i - 1 >= 0 &&
        i + nSquareToWin < 20 &&
        squares[i - 1][j] &&
        squares[i + 5][j] &&
        squares[i][j] !== squares[i - 1][j] &&
        squares[i][j] !== squares[i + 5][j]
      )
        win = false;
      for (let k = 0; k < nSquareToWin - 1 && win; k += 1) {
        if (i + k === 19 || squares[i + k][j] !== squares[i + k + 1][j]) {
          win = false;
          break;
        }
      }
      if (win) return { val: squares[i][j], x: j, y: i, direction: 'Doc' };

      // TH1: chan 2 dau cheo phai
      win = true;
      if (
        j - 1 >= 0 &&
        j + nSquareToWin < 20 &&
        i - 1 >= 0 &&
        i + nSquareToWin < 20 &&
        squares[i - 1][j - 1] &&
        squares[i + 5][j + 5] &&
        squares[i][j] !== squares[i - 1][j - 1] &&
        squares[i][j] !== squares[i + 5][j + 5]
      )
        win = false;
      for (let k = 0; k < nSquareToWin - 1 && win; k += 1) {
        if (
          i + k === 19 ||
          j + k === 19 ||
          squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]
        ) {
          win = false;
          break;
        }
      }
      if (win) return { val: squares[i][j], x: j, y: i, direction: 'CheoPhai' };

      // TH1: chan 2 dau cheo trai
      win = true;
      if (
        i - 1 >= 0 &&
        i + nSquareToWin < 20 &&
        j - nSquareToWin >= 0 &&
        squares[i - 1][j + 1] &&
        squares[i + 5][j - 5] &&
        squares[i][j] !== squares[i - 1][j + 1] &&
        squares[i][j] !== squares[i + 5][j - 5]
      )
        win = false;
      for (let k = 0; k < nSquareToWin - 1 && win; k += 1) {
        if (
          i + k === 19 ||
          j - k === 0 ||
          squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]
        ) {
          win = false;
          break;
        }
      }
      if (win) return { val: squares[i][j], x: j, y: i, direction: 'CheoTrai' };
    }
  }
  return null;
}

function reverse() {
  return { type: 'REVERSE' };
}

function jumpTo(move) {
  return { type: 'JUMP_TO', move };
}

function resetState() {
  return { type: 'RESET_IS_STATE' };
}

function clickIsState(X, Y) {
  return { type: 'CLICK_SQUARE_STATE', X, Y };
}

function clickHis(stepNumber, item) {
  return { type: 'CLICK_SQUARE_HIS', stepNumber, item };
}

const signOut = () => async dispatch => {
  const rs = await apiCaller.signOut();
  if (!isNull(rs)) {
    dispatch({ type: Types.SIGN_OUT });
  }
};

function resetHis() {
  return { type: 'RESET_HIS' };
}

function emitLogin() {
  return { type: Types.SIGN_IN, payload: true };
}

const signIn = (username, password) => async dispatch => {
  const rs = await apiCaller.signIn(username, password);
  if (!isNull(rs)) {
    const { token } = rs;
    window.localStorage.setItem('token', token);
    dispatch(emitLogin());
  }
};

function emitSignUp() {
  return { type: Types.SIGN_UP, payload: false };
}

const signUp = (name, username, password) => async dispatch => {
  const rs = await apiCaller.signUp(name, username, password);
  if (!isNull(rs)) {
    dispatch(emitSignUp());
  }
};

const getUser = () => async dispatch => {
  const rs = await apiCaller.getUser();
  if (!isNull(rs)) {
    dispatch({ type: Types.GET_USER });
  }
  console.log(rs);
  return rs;
};

const checkLogin = () => async dispatch => {
  const rs = await apiCaller.checkLogin();
  if (!isNull(rs)) {
    dispatch({ type: Types.GET_USER });
  }
  return rs;
};

const action = {
  calculateWinner,
  reverse,
  jumpTo,
  resetState,
  clickIsState,
  clickHis,
  resetHis,
  signIn,
  signOut,
  signUp,
  getUser,
  checkLogin
};

export default action;
