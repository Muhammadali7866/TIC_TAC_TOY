import React, { useState, useEffect } from "react";
import { MessageCircle, Copy, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

// const socket = io("http://localhost:3001"); // Socket.io connection

function Startgame() {
  // const [roomCode, setRoomCode] = useState(""); // State to hold room code
  const navigate = useNavigate(); // React Router navigation hook

  // Function to handle redirection
  const redirectToMain = () => {
    navigate("/about");
  };
  const location = useLocation();
  const roomCode = location.state?.roomCode || ""; // Retrieve the room code from location state
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="mt-6 flex flex-col gap-5 text-white w-[300px] h-[300px]">
        <button className="place-self-end text-white">
          <X onClick={redirectToMain} size={30} />
        </button>
        <div className="bg-blue-800 rounded-lg px-20 py-10 flex flex-col gap-3 items-center">
          <div className="font-medium text-lg">`Your code is {roomCode}`</div>
          <div className="font-medium text-lg">OR</div>
          <button className="font-medium text-lg">Start Game</button>
          <div className="flex flex-row gap-3">
            <button className="font-medium text-lg">
              <MessageCircle />
            </button>
            <button
              className="font-medium text-lg"
              onClick={() => {
                navigator.clipboard.writeText(roomCode)
                  .then(() => {
                    alert("Room code copied to clipboard!");
                  })
                  .catch((err) => {
                    console.error("Failed to copy room code: ", err);
                  });
              }}
            >
              <Copy />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Startgame;
