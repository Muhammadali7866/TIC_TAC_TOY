import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faRobot,
  faUser,
  faBars,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

function Chat() {
  return (
    <>
      <div className="bg-custom-dark flex justify-center items-center min-h-screen">
        <div className="w-[900px] h-[600px]  flex justify-around items-center rounded-lg border-20 bg-[#142534]">
          <div className="rounded-lg w-[250px] h-[585px] bg-[#172a3a]">
            <div className="w-[180px] h-[37px] rounded-md mt-2 ml-3 px-1 py-1">
              <input className="bg-[#172a3a]" type="text" placeholder="search"/>
            </div>
          </div>
          <div className="rounded-lg w-[600px] h-[585px] flex flex-col justify-between">
            <div className="w-[600px] h-[55px] rounded-lg bg-[#172a3a]"> 
              <div></div>
              <div>User Name</div>
            </div>
            <div className="w-[550px] h-[55px] rounded-lg bg-[#172a3a]"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
