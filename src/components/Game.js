import { connect } from 'react-redux';
import React from 'react';
import '../index.css';
import Board from './Board';
import action from '../action/action';

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

  render() {
    // chi dung de view nen ko can clone ra ban nhap
    const { history, status } = this.props;
    const current = history[status.stepNumber];
    const { squares } = current;
    const winner = action.calculateWinner(squares, status.idX, status.idY);
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
