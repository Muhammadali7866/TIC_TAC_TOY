import React, { useContext, useEffect, useState } from "react";
import circleIcon from "../assets/circle.png";
import crossIcon from "../assets/cross.png";
import Startgame from "./startgame";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import UserProfile2 from "./UserProfile2";
import axios from "axios";
import { getGamePlayer } from "../services/service";

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
  // const [roomId, setRoomId] = useState("72d14f89-5b34-4b44-b0b3-684bf7f04027");
  const [roomId, setRoomId] = useState("");
  const [playerA, setPlayerA] = useState({});
  const [playerB, setPlayerB] = useState({});
  const [playerAShow, setPlayerAShow] = useState(false);
  const [playerBShow, setPlayerBShow] = useState(false);
  const [dummyState, setDummyState] = useState(false);

  const location = useLocation();

  useEffect(() => {
    console.log("i am here");
    console.log("Component mounted or location state changed");

    socket.on("playerTurnSucc", async () => {
      const roomsCode = localStorage.getItem("roomCode");
      console.log({ roomsCode });
      const user = await getGamePlayer(roomCode);
      // setRoomId(roomsCode);
      setPlayerB(user.playerB);
      setPlayerBShow(true);
    });

    const roomSize = location.state?.roomSize || 0;
    const roomCode = location.state?.roomCode;
    console.log({ roomCode });
    if (roomCode) {
      localStorage.setItem("roomCode", roomCode);
      setRoomId(roomCode);
    }
    console.log({ roomSize });
    if (roomSize === 2) {
      console.log({ roomSize });
      setStartGamePopup(false);
      setYourTurn(true);
      console.log("now i turn your true");
    }
    const roomCode2 = location.state?.roomCode2;
    if (roomCode2) {
      console.log({ roomCode2 });
      setRoomId(roomCode2);
    }

    if (location.state.ok) {
      console.log("finally here");
      setStartGamePopup(false);
    }
  }, [location.state]);

  useEffect(() => {
    console.log("now fetcg game player");
    console.log({ roomId });
    const fetchData = async () => {
      try {
        let config = {
          method: "get",
          url: `http://localhost:8000/api/v1/users/gamePlayer/${roomId}`,
        };

        await axios
          .request(config)
          .then((response) => {
            console.log({ dataAPI: response.data });
            if (response.data) {
              if (response.data.playerA) {
                setPlayerA(response.data.playerA);
                setPlayerAShow(true);
              }
              if (response.data.playerB) {
                setPlayerB(response.data.playerB);
                setPlayerBShow(true);
                socket.emit("playerTurn");
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [roomId]); // useEffect will re-run whenever userId changes

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
    const winners = checkWin();

    if (winners) {
      setWinner(winner);
      setYourTurn(false);
    }
    const draw = checkDraw();
    if (draw) {
      console.log(`set winner for draw ${draw}`);
      setWinner(draw);
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
    return false;
  };
  const checkDraw = () => {
    const isDraw = boardState.every((cell) => cell !== null);
    console.log(`in draw function ${isDraw}`);
    if (isDraw) {
      return "draw";
    }
  };

  const onClose = () => {
    console.log("in close function");
    let roomSize = localStorage.getItem("roomSize");
    console.log({ roomSize });
    if (roomSize === "2") {
      setStartGamePopup(false);
    }
  };

  // on win send to server
  useEffect(() => {
    if (winner === null) {
      return;
    }
    const result = winner;
    console.log(`logs winner of result in effect ${result} , ${winner}`);

    console.log("check winner ");
    socket.emit("winner", { playerA, playerB, result, roomId });
  }, [winner]);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4 grid-custom">
        <div className="col-span-1  p-4 text-center">
          {" "}
          <div className="">
            {playerAShow && <UserProfile playerA={playerA} />}
          </div>
          <div className="">{playerA.name}</div>
        </div>
        <div className="col-span-1  p-4 text-center">
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
            {playerBShow && <UserProfile2 playerB={playerB} />}
          </div>
        </div>
      </div>

      {startGamePopup && <Startgame onClose={onClose} />}
    </>
  );
}

export default Board;
