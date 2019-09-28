import React from 'react';
import '../index.css';

const nSquareToWin = 5;

function Square(props) {
    return (props.win) ? (
        <button className="square square-highlight" onClick={props.onClick}>
            {props.value}
        </button>
    ) : (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
}

// Quan ly tung o trong 1 hang
class SquareRow extends React.Component {
    render() {
        let squareRow = this.props.row.map((square, idx) => {
            let k = "s" + idx;
            let win = false;
            let winner = this.props.winner;
            let rowIdx = this.props.rowIdx;
            if (winner) {
                // TH win hang ngang
                if (winner.direction === "Ngang" &&
                    idx >= winner.x && idx <= winner.x + nSquareToWin - 1 && rowIdx === winner.y) {
                    win = true;
                }
                // TH win hang doc
                if (winner.direction === "Doc" &&
                    rowIdx >= winner.y && rowIdx <= winner.y + nSquareToWin - 1 && idx === winner.x) {
                    win = true;
                }
                // TH win cheo phai
                if (winner.direction === "CheoPhai" &&
                    idx >= winner.x && idx <= winner.x + nSquareToWin - 1 && idx - winner.x === rowIdx - winner.y) {
                    win = true;
                }
                // TH win cheo trai
                if (winner.direction === "CheoTrai" &&
                    idx <= winner.x && idx >= winner.x - nSquareToWin + 1 && winner.x - idx === rowIdx - winner.y) {
                    win = true;
                }
            }
            return (
                <Square win={win} value={square} onClick={() => this.props.onClick(this.props.rowIdx, idx)} key={k} />
            )
        })
        return (
            <div className="board-row">
                {squareRow}
            </div>
        )
    }
}
export default SquareRow;