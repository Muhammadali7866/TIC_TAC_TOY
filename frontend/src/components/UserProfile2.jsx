import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"; // Import the desired icon

// function UserProfile({ playerB }) {
//   return (
//     <div className="h-screen flex flex-col gap-2 items-center">
//       <img
//         src={playerB.profilePicture} // use curly braces correctly
//         alt="Rounded Image"
//         className="rounded-full w-32 h-32 border-4 border-blue-500" // use className instead of class
//       />
//       <div className="text-white">{playerB.name}</div>
//       <div>Your Turn Now</div>
//     </div>
//   );
// }

// export default UserProfile;

function UserProfile({ playerB, friendShipToggle, friendShipStatus }) {
  const [sendRequest, setSendRequest] = useState(false);
  useEffect(() => {
    const playerBPresence = localStorage.getItem("playerB");
    console.log({ friendShipToggle, friendShipStatus, playerBPresence });
    if (friendShipToggle && playerBPresence) {
      console.log(friendShipStatus);
      if (friendShipStatus === "pending") {
        console.log("now in the toggle");
        if (playerBPresence) {
          console.log("player B presence");
          console.log({playerBPresence});
          setSendRequest(true);
        }
      }
    }
  }, [friendShipStatus, friendShipToggle]);

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
            // onClick={sendFriendRequest}
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
