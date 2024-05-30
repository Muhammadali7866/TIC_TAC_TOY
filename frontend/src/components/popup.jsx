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

  const {setRoomSize} = useContext(UserContext);

  // Function to handle room creation
  const handleStartGame = () => {
    console.log("hello");
    socket.emit("createRoom"); // Emit createRoom event to the server
  };

  // Function to handle enter code button click
  const handleEnterCode = () => {
    socket.emit("inputCode", inputCode);
    localStorage.setItem("key","value")
    
    
  };

 // Effect to listen for roomCreated event from server
useEffect(() => {
  socket.on("roomCreated", (roomCode) => {
    setRoomCode(roomCode); // Update roomCode state with received roomCode
    navigate("/contact", { state: { roomCode } }); // Navigate to contact page with the room code
  });

  // Listen for successful room join
  socket.on("roomJoinedSuccessfully", (size) => {
    console.log("i am here recently you upda");
    setRoomSize(size)
    localStorage.setItem("roomSize",size)
    navigate("/contact", { state: { roomSize: size} }); // Navigate to contact page with the entered code
  });

  // Cleanup function to remove event listeners when component unmounts
  return () => {
    socket.off("roomCreated");
    socket.off("roomJoinedSuccessfully");
  };
}, [navigate, inputCode]); // Include navigate and inputCode in dependency array


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
