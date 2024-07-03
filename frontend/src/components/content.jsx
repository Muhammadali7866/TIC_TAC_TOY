import React, { useState } from "react";
import Popup from "./popup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

function Content() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-center gap-[200px] pt-20 bg-custom-dark h-screen">
        <div className="flex flex-col">
          <div className="ml-7">
            <FontAwesomeIcon
              icon={faUser}
              style={{ height: "150px", width: "150px", color: "white" }}
            />

          </div>
          <button
            className="mx-4  text-white text-2xl mt-6"
            onClick={() => setShowPopup(true)}
          >
            Play with Friend
          </button>
        </div>
        <div>
          <div>
          <FontAwesomeIcon
            icon={faRobot}
            style={{ height: "170px", width: "160px", color: "white" }}
          />{" "}
          </div>
          <a
            className=" text-white text-2xl"
            href="/"
          >
            Play as a Guest
          </a>
         
          {showPopup && <Popup onClose={() => setShowPopup(false)} />}
        </div>
      </div>
    </>
  );
}

export default Content;
