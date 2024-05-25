import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <header className="flex flex-row justify-between px-20 h-[70px] header  nav">
        <div className="flex flex-row justify-evenly w-[600px] h-[70px] mt-3">
          <p className="text-4xl font-medium text-purple-900 dark:text-purple font-serif">
            TIKX
          </p>
          <div className="flex flex-row mt-2 h-[50px] justify-between w-[330px]">
            <Link
              className="text-lg font-medium text-purple-600 dark:text-purple font-serif"
              to="/"
            >
              Profile
            </Link>
            <Link
              className="text-lg font-medium text-purple-600 dark:text-purple font-serif"
              to="/history"
            >
              History
            </Link>
            <Link
              className="text-lg font-medium text-purple-600 dark:text-purple font-serif"
              to="/about"
            >
              Friends
            </Link>
            <Link
              className="text-lg font-medium text-purple-600 dark:text-purple font-serif"
              to="/contact"
            >
              Online
            </Link>
          </div>
        </div>
        <a
          className="bg-purple-700 h-9 w-[100px] rounded-full flex items-center justify-center text-lg text-black font-serif mt-4"
          href="http://localhost:3001/auth/login"
        >
          Login
        </a>
      </header>
    </>
  );
}

export default Navbar;
