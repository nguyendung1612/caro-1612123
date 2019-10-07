import { connect } from 'react-redux';
import React from 'react';
import action from '../action/action';
import '../index.css';

const nSquareToWin = 5;

const Square = props => {
  const rs = props;
  return (
    <div>
      {rs.win ? (
        <button
          type="button"
          className="square square-highlight"
          onClick={rs.onClick}
        >
          {rs.value}
        </button>
      ) : (
        <button type="button" className="square" onClick={rs.onClick}>
          {rs.value}
        </button>
      )}
    </div>
  );
};

// Quan ly tung o trong 1 hang
class SquareRow extends React.PureComponent {
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
    if (action.calculateWinner(squaresNow, i, j)) {
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
    dispatch(action.clickHis(stepNumber, item));
    dispatch(action.clickIsState(i, j));
  };

  render() {
    const { props } = this;
    const squareRow = props.row.map((square, idx) => {
      const k = `s${idx}`;
      let win = false;
      const { winner } = props;
      const { rowIdx } = props;
      if (winner) {
        // TH win hang ngang
        if (
          winner.direction === 'Ngang' &&
          idx >= winner.x &&
          idx <= winner.x + nSquareToWin - 1 &&
          rowIdx === winner.y
        ) {
          win = true;
        }
        // TH win hang doc
        if (
          winner.direction === 'Doc' &&
          rowIdx >= winner.y &&
          rowIdx <= winner.y + nSquareToWin - 1 &&
          idx === winner.x
        ) {
          win = true;
        }
        // TH win cheo phai
        if (
          winner.direction === 'CheoPhai' &&
          idx >= winner.x &&
          idx <= winner.x + nSquareToWin - 1 &&
          idx - winner.x === rowIdx - winner.y
        ) {
          win = true;
        }
        // TH win cheo trai
        if (
          winner.direction === 'CheoTrai' &&
          idx <= winner.x &&
          idx >= winner.x - nSquareToWin + 1 &&
          winner.x - idx === rowIdx - winner.y
        ) {
          win = true;
        }
      }
      return (
        <Square
          win={win}
          value={square}
          onClick={() => this.handleClick(props.rowIdx, idx)}
          key={k}
        />
      );
    });

    return <div className="board-row">{squareRow}</div>;
  }
}

export default connect(state => {
  return {
    history: state.history,
    status: state.status
  };
})(SquareRow);
