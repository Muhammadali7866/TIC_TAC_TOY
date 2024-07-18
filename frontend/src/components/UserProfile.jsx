import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"; // Import the desired icon

import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

function UserProfile({ playerA, friendShipToggle, friendShipStatus, playerB }) {
  const [sendRequestToggle, setSendRequestToggle] = useState(false);
  useEffect(() => {
    const playerBPresence = localStorage.getItem("playerB");
    console.log({ playerBPresence, friendShipStatus, friendShipToggle });
    if (friendShipToggle && playerBPresence) {
      if (friendShipStatus === "pending") {
        setSendRequestToggle(true);
      }
    }
  }, [playerA, friendShipToggle, friendShipStatus]);

 

  const sendRequestB = () => {
    const request = "userA"
    socket.emit("sendRequest",{playerA,playerB,request})
   
  };

  return (
    <div className="h-screen flex flex-col gap-2 items-center">
      <div className="relative">
        <img
          src={playerA.profilePicture}
          alt="Rounded Image"
          className="rounded-full w-32 h-32 border-4 border-blue-500"
        />
        {sendRequestToggle ? (
          <button
            onClick={sendRequestB}
            className="absolute inset-0  text-blue-800 mb-20 ml-[120px] "
          >
            <FontAwesomeIcon icon={faUserPlus} className="text-2xl" />{" "}
          </button>
        ) : (
          "none"
        )}
      </div>
      <div className="text-white">{playerA.name}</div>
      <div>Your Turn Now</div>
    </div>
  );
}

export default UserProfile;
