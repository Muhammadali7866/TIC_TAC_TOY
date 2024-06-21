import React, { useContext, useEffect, useState } from "react";

function UserProfile({ playerB }) {
  return (
    <div className="h-screen flex flex-col gap-2 items-center">
      <img
        src={playerB.profilePicture} // use curly braces correctly
        alt="Rounded Image"
        className="rounded-full w-32 h-32 border-4 border-blue-500" // use className instead of class
      />
      <div className="text-white">{playerB.name}</div>
      <div>Your Turn Now</div>
    </div>
  );
}

export default UserProfile;
