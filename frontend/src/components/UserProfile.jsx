import React from "react";
// import { Link } from 'react-router-dom'
import circle from "../assets/me.jpg"; // use import instead of require

function UserProfile() {
  return (
    <div className="h-screen flex flex-col gap-2 items-center">
      <img
        src={circle} // use curly braces correctly
        alt="Rounded Image"
        className="rounded-full w-32 h-32 border-4 border-blue-500" // use className instead of class
      />
      <div className="text-white">Muhammad Ali</div>
    </div>
  );
}

export default UserProfile;
