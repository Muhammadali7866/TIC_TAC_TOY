import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import UserContext from "../context/userContext";
import { useContext } from "react";

const socket = io("http://localhost:3001");

const Popup = ({ onClose }) => {
  const [roomCode, setRoomCode] = useState(""); // State to hold room code
  const [inputCode, setInputCode] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  const { setRoomSize } = useContext(UserContext);

  // Function to handle room creation
  const handleStartGame = () => {
    console.log("hello");
    socket.emit("createRoom"); // Emit createRoom event to the server
    socket.on("roomCreated", (roomCode) => {
      navigate("/contact", { state: { roomCode } }); // Navigate to contact page with the room code
    });
  };

  // Function to handle enter code button click
  const handleEnterCode = () => {
    console.log("in function");
    socket.emit("inputCode", inputCode);
    socket.on("roomJoinedSuccessfully", (size) => {
      console.log("from join room func",size);
      localStorage.setItem("roomSize",size)
      if (size === 2) {
        navigate("/contact", { state: { roomSize: size} });
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="mt-6 flex flex-col gap-5 text-white">
        <button className="place-self-end text-white">
          <X onClick={onClose} size={30} />
        </button>
        <div className="bg-blue-800 rounded-lg px-20 py-10 flex flex-col gap-3 items-center">
          <div className="font-medium text-lg">
            <button onClick={handleStartGame}>Start Game </button>
          </div>
          <div className="font-medium text-lg">OR</div>
          <input
            className="w-full px-1 py-1 text-black rounded-xl"
            placeholder="Enter your code"
            type="text"
            value={inputCode}
            onChange={(event) => setInputCode(event.target.value)}
          />
          <button className="font-medium text-lg" onClick={handleEnterCode}>
            Enter code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
