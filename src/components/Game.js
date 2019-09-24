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
    var temp = 1;
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

    for (let i = tmpRowTop; i <= tmpRowBot; i++) {
        for (let j = tmpColTop; j <= tmpColBot; j++) {
            //Kiểm trang NSquareToWin ô liên tiếp từ ô xuất phát sang phải, xuống góc phải dưới, xuống góc trái dưới
            //Nếu có NSquareToWin - 1 cặp liên tiếp giống nhau thì thắng
            //Direction: ToRight, ToRightDown, ToDown, ToLeftDown
            if (!squares[i][j]) continue;

            //TH1: chan 2 dau ngang 
            win = true;
            // TH vuot qua ban co va bi chan 2 dau
            if (j - 1 >= 0 && j + nSquareToWin < 20 && squares[i][j - 1] && squares[i][j + 5] && squares[i][j] !== squares[i][j - 1] && squares[i][j] !== squares[i][j + 5]) win = false;
            for (let k = 0; k < nSquareToWin - 1 && win; k++) {
                if (j + k === 19 ||squares[i][j + k] !== squares[i][j + k + 1]) {
                    win = false;
                    break;
                }
            }
            if (win) return { val: squares[i][j], x: j, y: i, direction: 'ToRight' };

            //TH1: chan 2 dau doc
            win = true;
            if (i - 1 >= 0 && i + nSquareToWin < 20 && squares[i - 1][j] && squares[i + 5][j] && squares[i][j] !== squares[i - 1][j] && squares[i][j] !== squares[i + 5][j]) win = false;
            for (let k = 0; k < nSquareToWin - 1 && win; k++) {
                if (i + k === 19 || squares[i + k][j] !== squares[i + k + 1][j]) {
                    win = false;
                    break;
                }
            }
            if (win) return { val: squares[i][j], x: j, y: i, direction: 'ToDown' };

            //TH1: chan 2 dau cheo phai
            win = true;
            if (j - 1 >= 0 && j + nSquareToWin < 20 && i - 1 >= 0 && i + nSquareToWin < 20 && squares[i - 1][j - 1] && squares[i + 5][j + 5] && squares[i][j] !== squares[i - 1][j - 1] && squares[i][j] !== squares[i + 5][j + 5]) win = false;
            for (let k = 0; k < nSquareToWin - 1 && win; k++) {
                if (i + k === 19 || j + k === 19 || squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
                    win = false;
                    break;
                }
            }
            if (win) return { val: squares[i][j], x: j, y: i, direction: 'ToRightDown' };

            //TH1: chan 2 dau cheo trai 
            win = true;
            if (i - 1 >= 0 && i + nSquareToWin < 20 && j - nSquareToWin >= 0 && squares[i - 1][j + 1] && squares[i + 5][j - 5] && squares[i][j] !== squares[i - 1][j + 1] && squares[i][j] !== squares[i + 5][j - 5]) win = false;
            for (let k = 0; k < nSquareToWin - 1 && win; k++) {
                if (i + k === 19 || j - k === 0 || squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
                    win = false;
                    break;
                }
            }
            if (win) return { val: squares[i][j], x: j, y: i, direction: 'ToLeftDown' };

        }
    }
    return null;
}

//Quan ly game
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(20).fill(null).map(() => Array(20).fill(null)),
                location: '',
                isWin: null,
            }],
            isNext: true,
            stepNumber: 0,
            isReverse: false,
            idX: -1,
            idY: -1,
        }; // khoi tao state la matrix voi kich thuoc 20*20
    }

    handleReverse = () => {
        this.setState({
            isReverse: !this.state.isReverse
        });
    }

    jumpTo = (move) => {
        this.setState({
            stepNumber: move,
            isNext: (move % 2) === 0,
        })
    }

    handleClick = (i, j) => {
        // Chúng ta cần clone history ra bản phụ tránh làm ảnh hưởng bản chính
        const history = this.state.history.slice(0, this.state.stepNumber + 1); 
        // Lấy history của lần gần nhất
        const current = history[history.length - 1]; 
        let squares = current.squares.slice();

        //clone moi dong
        current.squares.map((row, idx) => {
            squares[idx] = current.squares[idx].slice();
            return true;
        })

        if (current.isWin || squares[i][j]) {
            return; //neu da co gia tri thi ko thay doi
        }
        squares[i][j] = this.state.isNext ? 'X' : 'O';
        var tmp = false;
        if (calculateWinner(squares, i, j)) {
            tmp = true;
        }

        this.setState({
            history: history.concat([{
                squares: squares,
                location: i + ',' + j,
                isWin: tmp
            }]),
            isNext: !this.state.isNext,
            stepNumber: history.length,
            idX: i,
            idY: j
        });
    }

    handleReset = () => {
        this.setState({
            history: [{
                squares: Array(20).fill(null).map(() => Array(20).fill(null)),
                location: '',
                isWin: false,
            }],
            isNext: true,
            stepNumber: 0,
            idX: -1,
            idY: -1,
        });
    }

    render() {
        //chi dung de view nen ko can clone ra ban nhap
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares;
        const winner = calculateWinner(squares, this.state.idX, this.state.idY);
        let status;

        if (winner) {
            status = "Winner is: " + winner.val; // Nếu winner có giá trị thì sẽ hiển thị người thắng cuộc
        } else if (this.state.stepNumber === 20 * 20) { // Nếu sau 9 lần chưa có ai win thì hòa
            status = "No one win";
        } else {
            status = "Next player is: " + (this.state.isNext ? 'X' : 'O');
        }

        const moves = history.map((step, move)=>{
            if(move !== 0){
                const descr = `Move ${move}: (${step.location})`;
                return (this.state.stepNumber === move) ? (
                    <li key={move}>
                      <button onClick={() => this.jumpTo(move)}><b>{descr}</b></button>
                    </li>
                  ) : (
                    <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{descr}</button>
                  </li>
                  );
            }
            return null;
        });

        let arrow = this.state.isReverse ? '↓' : '↑';

        return (
            <div className="game">
                <div className="game-board">
                    <Board winner={winner} squares={squares} onClick={(i, j) => this.handleClick(i, j)} />
                </div>
                <div className="game-info">
                    <div><b>INFORMATION</b></div>
                    <p>{status}</p>
                    <button className="btn" onClick={() => this.handleReverse()}>Sort {arrow}</button>
                    <ul>{this.state.isReverse ? moves.reverse() : moves}</ul>
                    <button className="btn" onClick={() => this.handleReset()}>
                        Reset
                    </button>
                </div>
            </div>
            //gui du lieu squares cho Board
        );
    }
}



export default Game;

