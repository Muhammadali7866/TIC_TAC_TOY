import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"; // Import the desired icon

import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

function UserProfile({ playerB, friendShipToggle, friendShipStatus, playerA,friendShipStatusToggle }) {
  const [sendRequest, setSendRequest] = useState(false);
  useEffect(() => {
    const playerAPresence = localStorage.getItem("playerA");
    console.log({ friendShipToggle, friendShipStatus, playerAPresence });
    if (friendShipToggle && playerAPresence) {
      console.log(friendShipStatus);
      if (friendShipStatus === "pending") {
        console.log("now in the toggle");
        if (playerAPresence) {
          console.log("player B presence");
          console.log({ playerAPresence });
          setSendRequest(true);
        }
      }else{
        setSendRequest(false);
      }
    }
  }, [playerB, friendShipToggle, friendShipStatus,friendShipStatusToggle]);

  const sendRequestA = () => {
    const request = "userB";

    socket.emit("sendRequest", { playerB, playerA, request });
  };

  return (
    <div className="h-screen flex flex-col gap-2 items-center">
      <div className="relative">
        <img
          src={playerB.profilePicture} // use curly braces correctly
          alt="Rounded Image"
          className="rounded-full w-32 h-32 border-4 border-blue-500" // use className instead of class
        />
        {sendRequest ? (
          <button
            onClick={sendRequestA}
            className="absolute inset-0  text-blue-800 mb-20 ml-[120px] "
          >
            <FontAwesomeIcon icon={faUserPlus} className="text-2xl" />{" "}
            {/* Icon added here */}
          </button>
        ) : (
          "Friendsssss"
        )}
      </div>
      <div className="text-white">{playerB.name}</div>
      <div>Your Turn Now</div>
    </div>
  );
}

export default UserProfile;
