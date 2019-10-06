import { connect } from 'react-redux';
import React from 'react';
import '../index.css';
import Board from './Board';

const nSquareToWin = 5;

// tim vi tri dau tien trong chuoi 5 ky tu win
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

// Quan ly game
class Game extends React.Component {
  handleReverse = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'REVERSE' });
  };

  jumpTo = move => {
    const { dispatch } = this.props;
    dispatch({ type: 'JUMP_TO', move });
  };

  handleReset = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'RESET_HIS' });
    dispatch({ type: 'RESET_IS_STATE' });
  };

  handleClick = (i, j) => {
    // Chúng ta cần clone history ra bản phụ tránh làm ảnh hưởng bản chính
    const { history, status } = this.props;
    const hisNow = history.slice(0, status.stepNumber + 1);
    // Lấy history của lần gần nhất
    const current = hisNow[hisNow.length - 1];
    const squaresNow = current.squares.slice();

    // clone moi dong
    current.squares.map((row, idx) => {
      squaresNow[idx] = current.squares[idx].slice();
      return true;
    });

    if (current.isWin || squaresNow[i][j]) {
      return; // neu da co gia tri thi ko thay doi
    }
    squaresNow[i][j] = status.isNext ? 'X' : 'O';
    let tmp = false;
    if (calculateWinner(squaresNow, i, j)) {
      tmp = true;
    }

    const item = {
      squares: squaresNow,
      location: `${i},${j}`,
      isWin: tmp,
      id: status.stepNumber + 1
    };

    const { stepNumber } = status;

    const { dispatch } = this.props;
    dispatch({ type: 'CLICK_SQUARE_HIS', stepNumber, item });
    dispatch({ type: 'CLICK_SQUARE_STATE', X: i, Y: j });
  };

  render() {
    // chi dung de view nen ko can clone ra ban nhap
    const { history, status } = this.props;
    const current = history[status.stepNumber];
    const { squares } = current;
    const winner = calculateWinner(squares, status.idX, status.idY);
    let isWin;

    if (winner) {
      isWin = `Winner is: ${winner.val}`; // Nếu winner có giá trị thì sẽ hiển thị người thắng cuộc
    } else if (status.stepNumber === 20 * 20) {
      // Nếu sau 9 lần chưa có ai win thì hòa
      isWin = 'No one win';
    } else {
      isWin = `Next player is: ${status.isNext ? 'X' : 'O'}`;
    }

    const moves = history.map(step => {
      const { id } = step;
      if (id !== 0) {
        const descr = `Move ${id}: (${step.location})`;
        return status.stepNumber === id ? (
          <li key={id}>
            <button type="button" onClick={() => this.jumpTo(id)}>
              <b>{descr}</b>
            </button>
          </li>
        ) : (
          <li key={id}>
            <button type="button" onClick={() => this.jumpTo(id)}>
              {descr}
            </button>
          </li>
        );
      }
      return null;
    });

    const arrow = status.isReverse ? '↓' : '↑';

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winner={winner}
            squares={squares}
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>
        <div className="game-info">
          <div>
            <b>INFORMATION</b>
          </div>
          <p>{isWin}</p>
          <button
            type="button"
            className="btn"
            onClick={() => this.handleReverse()}
          >
            Sort {arrow}
          </button>
          <ul>{status.isReverse ? moves.reverse() : moves}</ul>
          <button
            type="button"
            className="btn"
            onClick={() => this.handleReset()}
          >
            Reset
          </button>
        </div>
      </div>
      // gui du lieu squares cho Board
    );
  }
}

export default connect(state => {
  return {
    history: state.history,
    status: state.status
  };
})(Game);
