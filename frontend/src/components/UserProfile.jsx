// import React, { useContext, useEffect, useState } from "react";
// function UserProfile({ playerA }) {
//   return (
//     <div className="h-screen flex flex-col gap-2 items-center">
//       <img
//         src={playerA.profilePicture} // use curly braces correctly
//         alt="Rounded Image"
//         className="rounded-full w-32 h-32 border-4 border-blue-500" // use className instead of class
//       />
//       <div className="text-white">{playerA.name}</div>
//       <div>Your Turn Now</div>
//       <div>{/* <button onClick=""}>friendSHip</button> */}</div>
//     </div>
//   );
// }

// export default UserProfile;
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"; // Import the desired icon

function UserProfile({ playerA, friendShipToggle, friendShipStatus ,playerB}) {
  const [sendRequestToggle, setSendRequestToggle] = useState(false);
  useEffect(() => {
    const playerBPresence = localStorage.getItem("playerB");
    console.log({ playerBPresence, friendShipStatus, friendShipToggle });
    if (friendShipToggle && playerBPresence) {
      if (friendShipStatus === "pending") {
        setSendRequestToggle(true);
      }
    }
  }, [playerA,friendShipToggle,friendShipStatus]);

  const sendRequestB = (playerA,playerB)=>{

  }

  return (
    <div className="h-screen flex flex-col gap-2 items-center">
      <div className="relative">
        <img
          src={playerA.profilePicture}
          alt="Rounded Image"
          className="rounded-full w-32 h-32 border-4 border-blue-500"
        />
        {sendRequestToggle ? (
          <button onClick={sendRequestB} className="absolute inset-0  text-blue-800 mb-20 ml-[120px] ">
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
