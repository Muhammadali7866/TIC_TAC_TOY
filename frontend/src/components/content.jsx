import React, { useState } from "react";
import Popup from "./popup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

function Content() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-center gap-[200px] pt-20 bg-custom-dark h-screen">
        <div className="flex flex-col ">
          <div className="ml-7 mt-1">
            <FontAwesomeIcon
              icon={faUser}
              style={{ height: "100px", width: "100px", color: "white" }}
            />
          </div>
          <button
            className="mx-4  text-white text-xl mt-6"
            onClick={() => setShowPopup(true)}
          >
            Play with Friend
          </button>
        </div>
        <div className="flex flex-col">
          <div className="mt-1 ml-3">
            <FontAwesomeIcon
              icon={faRobot}
              style={{ height: "100px", width: "100px", color: "white" }}
            />{" "}
          </div>
          <a className=" text-white text-xl mt-5" href="/">
            Play as a Guest
          </a>

          {showPopup && <Popup onClose={() => setShowPopup(false)} />}
        </div>
      </div>
    </>
  );
}

export default Content;
