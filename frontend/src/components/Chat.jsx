import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faRobot, faUser, faBars } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon

function Chat() {
  return (
    <>
      <div className="bg-custom-dark h-screen">
        <div className="flex items-center justify-center">
          <div className=" w-[669px] h-[500px] rounded-lg mt-5 flex flex-row">
            <div className="left flex w-[200px] h-[500px] rounded-l-lg bg-[#1f2d46] border-r-1 border-[#2e3b55]">
              <div className="flex flex-row w-[199px] h-[33px] mt-2 ml-1">
                <div className="w-[23px] h-[23px]">
                  <FontAwesomeIcon
                    icon={faBars}
                    style={{ height: "17px", width: "17px", color: "white" }}
                    className="opacity-20"
                  />
                </div>
                <div className="w-[157px] h-[22px]">
                  <input
                    className=" text-black rounded-2xl w-[170px] bg-[#1f2d46] border border-[#2e3b55] pl-2 text-white"
                    placeholder="Search"
                  />{" "}
                </div>
              </div>
            </div>
            <div className="right w-[369px] h-[500px] bg-[#101f36] rounded-r-lg">
              <div className="flex flex-col justify-center">
                <div className="w-[369px] h-[34px] bg-[#212e45] rounded-tr-lg"></div>
                <div className="w-[369px] h-[34px] bg-[#212e45] rounded-tr-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
