import React from 'react';
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
          onClick={() => props.onClick(props.rowIdx, idx)}
          key={k}
        />
      );
    });

    return <div className="board-row">{squareRow}</div>;
  }
}
export default SquareRow;
