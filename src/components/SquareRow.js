/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import { connect } from 'react-redux';
import React from 'react';
import action from '../action/action';
import '../index.css';
// import Square from './Square';

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
      ) : rs.value === 'X' ? (
        <button type="button" className="square red" onClick={rs.onClick}>
          {rs.value}
        </button>
      ) : (
        <button type="button" className="square blue" onClick={rs.onClick}>
          {rs.value}
        </button>
      )}
    </div>
  );
};

// Quan ly tung o trong 1 hang
class SquareRow extends React.PureComponent {
  // componentDidUpdate() {
  //   const { history, status } = this.props;
  //   const hisNow = history.slice(0, status.stepNumber + 1);
  //   // Lấy history của lần gần nhất
  //   const current = hisNow[hisNow.length - 1];
  //   console.log('dam dep zai');
  //   if (!current.isWin && !status.isNext) {
  //     this.makeAIMove();
  //   }
  // }

  handleClick = (i, j) => {
    const { history, status, clickHis, clickIsState, sendMove } = this.props;
    // Chúng ta cần clone history ra bản phụ tránh làm ảnh hưởng bản chính
    const hisNow = history.slice(0, status.stepNumber + 1);
    // Lấy history của lần gần nhất
    const current = hisNow[hisNow.length - 1];
    const squaresNow = current.squares.slice();

    // clone moi dong
    current.squares.map((row, idx) => {
      squaresNow[idx] = current.squares[idx].slice();
      return true;
    });

    if (current.isWin || squaresNow[i][j] || !status.isNext) {
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

    const data = {
      X: i,
      Y: j
      // data: squaresNow[i][j]
    };

    sendMove(data);

    clickHis(stepNumber, item);
    clickIsState(i, j);
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
          key={k}
          onClick={() => this.handleClick(props.rowIdx, idx)}
        />
      );
    });

    return <div className="board-row">{squareRow}</div>;
  }
}

const mapStateToProps = state => {
  return {
    history: state.history,
    status: state.status
  };
};

const mapDispatchToProps = {
  clickHis: action.clickHis,
  clickIsState: action.clickIsState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SquareRow);
