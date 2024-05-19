import React from "react";
// import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <>
      <header className="flex flex-row justify-between px-20 mt-7 h-[70px] header border-b-2 ">
        <div className="flex flex-row justify-evenly w-[600px] h-[70px]">
          <p className="text-4xl font-medium text-purple-900 dark:text-purple font-serif">
            TIKX
          </p>
          <div className="flex flex-row mt-2 h-[50px] justify-between w-[330px]">
            <a
              className="text-lg font-medium text-purple-600 dark:text-purple font-serif"
              href="/"
            >
              Profile
            </a>
            <p className="text-lg font-medium text-purple-600 dark:text-purple font-serif">
              History
            </p>
            <p className="text-lg font-medium text-purple-600 dark:text-purple font-serif">
              Friends
            </p>
            <p className="text-lg font-medium text-purple-600 dark:text-purple font-serif">
              Online
            </p>
          </div>
        </div>
        <a
          className="bg-purple-700 h-9 w-[100px] rounded-full flex items-center justify-center text-lg text-black font-serif"
          href="http://localhost:3001/auth/login"
        >
          Login
        </a>
      </header>
    </>
  );
}

export default Navbar;
