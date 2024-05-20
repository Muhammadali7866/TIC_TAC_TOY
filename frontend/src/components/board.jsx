import React, { useEffect, useState } from "react";
import circleIcon from "../assets/circle.png";
import crossIcon from "../assets/cross.png";

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Board() {
  const [boardState, setBoardState] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);
  const [winner,setWinner] = useState(null)

  const handleBoxClick = (index) => {
    if (boardState[index] === null) {
      const newBoardState = [...boardState];
      newBoardState[index] = isNext ? "X" : "O";
      setBoardState(newBoardState); // Update the board state
      setIsNext(!isNext); // Toggle the next player
      const winner = checkWin();
      if(winner){
        setWinner(winner)
      }

    }
  };

  const renderIcon = (value) => {
    if (value === "X") {
      return <img src={crossIcon} alt="cross" />;
    } else if (value === "O") {
      return <img src={circleIcon} alt="circle" />;
    }
    return null; // Return null if value is null
  };

  const checkWin = () => {
    for (let i = 0; i < winningCombination.length; i++) {
      const [a, b, c] = winningCombination[i];
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return boardState[a];
      }
    }
    return null;
  };

  useEffect(() => {}, []);

  return (
    <div className="board">
      <div className="row1 mt-5">
        <div className="boxex" onClick={() => handleBoxClick(0)}>
          {renderIcon(boardState[0])}
        </div>
        <div className="boxex" onClick={() => handleBoxClick(1)}>
          {renderIcon(boardState[1])}
        </div>
        <div className="boxex" onClick={() => handleBoxClick(2)}>
          {renderIcon(boardState[2])}
        </div>
      </div>
      <div className="row2">
        <div className="boxex" onClick={() => handleBoxClick(3)}>
          {renderIcon(boardState[3])}
        </div>
        <div className="boxex" onClick={() => handleBoxClick(4)}>
          {renderIcon(boardState[4])}
        </div>
        <div className="boxex" onClick={() => handleBoxClick(5)}>
          {renderIcon(boardState[5])}
        </div>
      </div>
      <div className="row3">
        <div className="boxex" onClick={() => handleBoxClick(6)}>
          {renderIcon(boardState[6])}
        </div>
        <div className="boxex" onClick={() => handleBoxClick(7)}>
          {renderIcon(boardState[7])}
        </div>
        <div className="boxex" onClick={() => handleBoxClick(8)}>
          {renderIcon(boardState[8])}
        </div>
      </div>
      <div>{winner}</div>
    </div>
  );
}

export default Board;