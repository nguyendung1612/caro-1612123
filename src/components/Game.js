/* eslint-disable consistent-return */
import { connect } from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import React from 'react';
import Board from './Board';
import action from '../action/action';
import Nav from './Nav';
import Chat from './Chat/Chat';
import '../index.css';
import socket from '../socket.io/socket.io';

// Quan ly game
class Game extends React.Component {
  constructor(props) {
    super(props);
    // Khởi tạo state,
    this.state = {
      host: false
    };
  }

  componentWillMount() {
    const { player } = this.props;
    console.log(`on ${player.isOnline}`);

    const { username } = this.props;

    socket.emit('send-username', username);
    socket.on('host', res => {
      console.log(res);
      this.setState({ host: res });
    }); // lắng nghe event có tên 'id'
    socket.on('sv-send-pos', data => {
      this.makePlayerMove(data);
    });
  }

  componentDidUpdate() {
    const { history, status, player } = this.props;
    if (player.isOnline) {
      socket.on('host', res => this.setState({ host: res })); // lắng nghe event có tên 'id'
    }

    const hisNow = history.slice(0, status.stepNumber + 1);
    // Lấy history của lần gần nhất
    const current = hisNow[hisNow.length - 1];
    const squaresNow = current.squares.slice();
    current.squares.map((row, idx) => {
      squaresNow[idx] = current.squares[idx].slice();
      return true;
    });
    if (!current.isWin && !status.isNext && player.isComputer) {
      this.makeRandomMove();
    }
    // console.log(host, status.isNext);
    // if (player.isOnline && status.idX !== -1) {
    //   if (host && !status.isNext) {
    //     socket.emit('host-send-pos', {
    //       X: status.idX,
    //       Y: status.idY,
    //       data: 'X'
    //     });
    //   } else if (!host && status.isNext) {
    //     socket.emit('guest-send-pos', {
    //       X: status.idX,
    //       Y: status.idY,
    //       data: 'O'
    //     });
    //   }
    // }
  }

  sendMove = pos => {
    const { host } = this.state;
    const { status, player } = this.props;
    console.log(host, status.isNext);
    if (player.isOnline && status.idX !== -1) {
      if (host) {
        socket.emit('host-send-pos', {
          X: pos.X,
          Y: pos.Y,
          data: 'X'
        });
      } else if (!host) {
        socket.emit('guest-send-pos', {
          X: pos.X,
          Y: pos.Y,
          data: 'O'
        });
      }
    }
  };

  makePlayerMove = data => {
    if (data.X === -1 && data.Y === -1) return;
    const { history, status, clickHis, clickIsState } = this.props;
    const hisNow = history.slice(0, status.stepNumber + 1);
    const current = hisNow[hisNow.length - 1];
    const squaresNow = current.squares.slice();
    current.squares.map((row, idx) => {
      squaresNow[idx] = current.squares[idx].slice();
      return true;
    });

    if (current.isWin) {
      return;
    }

    squaresNow[data.X][data.Y] = data.data;
    let tmp = false;
    if (action.calculateWinner(squaresNow, data.X, data.Y)) {
      tmp = true;
    }

    const item = {
      squares: squaresNow,
      location: `${data.X},${data.Y}`,
      isWin: tmp,
      id: status.stepNumber + 1
    };

    const { stepNumber } = status;

    clickHis(stepNumber, item);
    clickIsState(data.X, data.Y);
  };

  makeRandomMove = () => {
    const { history, status, clickHis, clickIsState } = this.props;
    const hisNow = history.slice(0, status.stepNumber + 1);
    const current = hisNow[hisNow.length - 1];
    const squaresNow = current.squares.slice();
    current.squares.map((row, idx) => {
      squaresNow[idx] = current.squares[idx].slice();
      return true;
    });

    if (current.isWin) {
      return;
    }

    let X;
    let Y;
    do {
      X = Math.floor(Math.random() * 20);
      Y = Math.floor(Math.random() * 20);
    } while (squaresNow[X][Y] !== null);

    squaresNow[X][Y] = 'O';
    let tmp = false;
    if (action.calculateWinner(squaresNow, X, Y)) {
      tmp = true;
    }

    const item = {
      squares: squaresNow,
      location: `${X},${Y}`,
      isWin: tmp,
      id: status.stepNumber + 1
    };

    const { stepNumber } = status;

    clickHis(stepNumber, item);
    clickIsState(X, Y);
  };

  handleReverse = () => {
    const { reverse } = this.props;
    reverse();
  };

  jumpTo = move => {
    const { jumpTo } = this.props;
    jumpTo(move);
  };

  handleReset = () => {
    const { resetHis, resetState } = this.props;
    resetHis();
    resetState();
  };

  playComputer = () => {
    const { playComputer } = this.props;
    playComputer();
  };

  playOnline = () => {
    const { playOnline } = this.props;
    playOnline();
  };

  handleExit = () => {
    const { exit } = this.props;
    exit();
  };

  render() {
    // chi dung de view nen ko can clone ra ban nhap
    const { history, status, player } = this.props;
    const current = history[status.stepNumber];
    const { squares } = current;

    const winner = action.calculateWinner(squares, status.idX, status.idY);
    let isWin;
    if (winner) {
      isWin = `Winner is: ${winner.val}`;
    } else if (status.stepNumber === 20 * 20) {
      isWin = '<Alert variant="info"><b>No ONE WIN</b></Alert>';
    } else {
      isWin = `Next player is: ${status.isNext ? 'X' : 'O'}`;
    }

    const moves = history.map(step => {
      const { id } = step;
      if (id !== 0) {
        const descr = `Move ${id}: (${step.location})`;
        return status.stepNumber === id ? (
          <li key={id}>
            <Button
              variant="outline-danger"
              block
              size="sm"
              onClick={() => this.jumpTo(id)}
            >
              <b>{descr}</b>
            </Button>
          </li>
        ) : (
          <li key={id}>
            <Button
              variant="outline-danger"
              block
              size="sm"
              onClick={() => this.jumpTo(id)}
            >
              {descr}
            </Button>
          </li>
        );
      }
      return null;
    });

    const arrow = status.isReverse ? '↓' : '↑';

    return (
      <div className="App container">
        <Nav />
        <div className="flex-container game">
          <div className={player.isComputer ? 'highlight' : ''}>
            <Button
              variant="outline-warning"
              size="lg"
              onClick={() => this.playComputer()}
            >
              Computer
            </Button>
          </div>
          <div className={player.isOnline ? 'highlight' : ''}>
            <Button
              variant="outline-warning"
              size="lg"
              onClick={() => this.playOnline()}
            >
              Online
            </Button>
          </div>
          <div>
            <Button
              variant="outline-warning"
              size="lg"
              onClick={() => this.handleExit()}
            >
              Exit
            </Button>
          </div>
        </div>
        {player.isComputer || player.isOnline ? (
          <div>
            <div className="game">
              <div className="game-board">
                <Board
                  winner={winner}
                  squares={squares}
                  sendMove={pos => this.sendMove(pos)}
                />
              </div>
              <div className="game-info">
                <div>
                  <Alert variant="info">
                    <b>{isWin}</b>
                  </Alert>
                </div>
                <Button
                  variant="info"
                  block
                  onClick={() => this.handleReverse()}
                >
                  Sort {arrow}
                </Button>
                <ul className="move">
                  {status.isReverse ? moves.reverse() : moves}
                </ul>
                <Button variant="info" block onClick={() => this.handleReset()}>
                  Reset
                </Button>
                {player.isOnline ? <Chat /> : <div />}
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
      // gui du lieu squares cho Board
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.history,
    status: state.status,
    player: state.player
  };
};

const mapDispatchToProps = {
  reverse: action.reverse,
  jumpTo: action.jumpTo,
  resetHis: action.resetHis,
  resetState: action.resetState,
  clickHis: action.clickHis,
  clickIsState: action.clickIsState,
  playComputer: action.playComputer,
  playOnline: action.playOnline,
  exit: action.exit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
