import React from 'react';
import SquareRow from './SquareRow';
import '../index.css';

// Quan ly tung hang ban co
class Board extends React.PureComponent {
  render() {
    // row: array tung hang - idx: stt hang
    const { squares, winner, sendMove } = this.props;
    const board = squares.map((row, idx) => {
      const k = `r${idx}`;
      return (
        <SquareRow
          winner={winner}
          rowIdx={idx}
          row={row}
          key={k}
          sendMove={pos => sendMove(pos)}
        />
      );
    });

    return (
      <div>
        <div>{board}</div>
      </div>
    );
  }
}

export default Board;
