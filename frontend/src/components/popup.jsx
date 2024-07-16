import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const socket = io("http://localhost:8000");

const Popup = ({ onClose }) => {
  const [roomCode, setRoomCode] = useState(""); // State to hold room code
  const [inputCode, setInputCode] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  const { user } = useContext(UserContext);

  // Function to handle room creation
  const handleStartGame = () => {
    console.log("hello");
    socket.emit("createRoom", user.googleId); // Emit createRoom event to the server
    // console.log();
    socket.on("roomCreated", (roomCode) => {
      console.log("room created from server to client first");
      navigate("/contact", { state: { roomCode } }); // Navigate to contact page with the room code
      localStorage.setItem("playerA", true);
    });
  };

  // Function to handle enter code button click
  const handleEnterCode = () => {
    console.log("in function");
    socket.emit("inputCode", inputCode, user.googleId);
    socket.on("roomJoinedSuccessfully", (size) => {
      console.log("from join room func", size);
      localStorage.setItem("roomSize", { size, inputCode });
      localStorage.setItem("playerB", true);
      if (size === 2) {
        navigate("/contact", {
          state: { roomSize: size, roomCode2: inputCode },
        });
      }
    });
  };
  useEffect(() => {
    console.log({ user });
  }, []);

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-md flex justify-center items-center">
      <div className="mt-6 flex flex-col gap-2 text-white">
        <button className="place-self-end text-white">
          <X onClick={onClose} size={40} style={{ color: "#1f3540" }} />
        </button>
        <div className="bg-purple-900 rounded-lg px-20 py-14 flex flex-col gap-3 items-center">
          <div className="font-medium text-lg">
            <button
              onClick={handleStartGame}
              className="text-white font-serif text-xl"
            >
              Start Game{" "}
            </button>
          </div>
          <div className="font-medium text-lg font-serif">OR</div>
          <input
            className="w-full px-1 py-1 text-black rounded-md"
            placeholder="Enter your code"
            type="text"
            value={inputCode}
            onChange={(event) => setInputCode(event.target.value)}
          />
          <button
            className="font-medium text-lg font-serif"
            onClick={handleEnterCode}
          >
            Enter code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
