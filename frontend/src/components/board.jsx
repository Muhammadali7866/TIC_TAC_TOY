import React, { useContext, useEffect, useState } from "react";
import circleIcon from "../assets/circle.png";
import crossIcon from "../assets/cross.png";
import Startgame from "./startgame";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import UserProfile from "./UserProfile";
import { Youtube } from "lucide-react";

const socket = io("http://localhost:8000");

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
  const [startGamePopup, setStartGamePopup] = useState(true);

  const location = useLocation();
  useEffect(() => {
    console.log("i am here");
    const roomSize = location.state?.roomSize || 0;
    console.log({ roomSize });
    if (roomSize === 2) {
      console.log({ roomSize });
      setStartGamePopup(false);
      setYourTurn(true);
      console.log("now i turn your true");
    }
    if (location.state.ok) {
      console.log("finally here");
      setStartGamePopup(false);
    }
  }, [location.state]);

  const [boardState, setBoardState] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);
  const [yourTurn, setYourTurn] = useState(false);

  const [winner, setWinner] = useState(null);

  const handleBoxClick = (index) => {
    if (boardState[index] === null && yourTurn) {
      const newBoardState = [...boardState];
      newBoardState[index] = isNext ? "X" : "O";
      const variable = isNext ? "X" : "O";
      socket.emit("userMove", { index, variable });
      setBoardState(newBoardState); // Update the board state
      setIsNext(!isNext); // Toggle the next player
      setYourTurn(false);
      
    }
  };
  useEffect(() => {
    const handleUpdateMove = ({ index, variable }) => {
      console.log({ index, variable });
      if (boardState[index] === null) {
        const newBoardState = [...boardState];
        newBoardState[index] = variable;
        setBoardState(newBoardState); // Update the board state
        setIsNext(!isNext); // Toggle the next player
        setYourTurn(true);
      }
    };

    socket.on("updateMove", handleUpdateMove);
    const winner = checkWin();
      if (winner) {
        setWinner(winner);
        setYourTurn(false)
      }

    return () => {
      socket.off("updateMove", handleUpdateMove);
    };
  }, [boardState, isNext]);

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

  const onClose = () => {
    console.log("in close function");
    let roomSize = localStorage.getItem("roomSize");
    console.log({ roomSize });
    if (roomSize === "2") {
      setStartGamePopup(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4 grid-custom">
        <div className="col-span-1  p-4 text-center">
          {" "}
          <div className="">
            <UserProfile />
          </div>
        </div>
        <div class="col-span-1  p-4 text-center">
          <div className="h-screen bg-custom-dark">
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
          </div>
        </div>
        <div className="col-span-1 p-4 text-center">
          {" "}
          <div className="">
            <UserProfile />
          </div>
        </div>
      </div>

      {startGamePopup && <Startgame onClose={onClose} />}
    </>
  );
}

export default Board;
