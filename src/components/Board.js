import React from 'react';
import SquareRow from './Square';
import '../index.css';

// Quan ly tung hang ban co
class Board extends React.PureComponent {
  // Phương thức này trả về class Square kèm giá trị đi theo là value ( Giá trị `value` trong ReactJS được gọi là props. Tìm hiểu thêm tại đây: https://facebook.github.io/react/docs/components-and-props.html)
  render() {
    // row: array tung hang - idx: stt hang
    const { props } = this;
    const board = props.squares.map((row, idx) => {
      const k = `r${idx}`;
      return (
        <SquareRow
          winner={props.winner}
          rowIdx={idx}
          row={row}
          onClick={props.onClick}
          key={k}
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
